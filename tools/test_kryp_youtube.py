import datetime as dt
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error

spec = importlib.util.spec_from_file_location('sync', Path(__file__).with_name('sync-kryp-youtube.py'))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


class PublicVideosTest(unittest.TestCase):
    def test_catalog_links_exist_and_excludes_unapproved_originals(self):
        catalog = json.loads((sync.ROOT / 'tools/kryp-youtube-catalog.json').read_text(encoding='utf-8'))
        self.assertNotIn('_Mh3rvV1wRM', catalog)
        self.assertNotIn('QOdXrbpFqgQ', catalog)
        for info in catalog.values():
            for key in info['profiles']:
                self.assertTrue((sync.ROOT / f'species/{key}.html').exists(), key)
            for key in info['norwegianProfiles']:
                self.assertIn(f'id="{key}"', (sync.ROOT / 'kryp-artsprofiler.html').read_text(encoding='utf-8'))

    def test_public_feed_rejects_future_and_wrong_channel(self):
        xml = f'''<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015"><yt:channelId>{sync.CHANNEL}</yt:channelId>
        <entry><yt:videoId>published</yt:videoId><title>Offentlig</title><published>2026-10-19T12:00:00Z</published></entry>
        <entry><yt:videoId>future</yt:videoId><title>Planlagt</title><published>2026-11-19T12:00:00Z</published></entry></feed>'''
        entries = sync.public_entries(xml, dt.datetime(2026, 10, 20, tzinfo=dt.timezone.utc))
        self.assertEqual([item['id'] for item in entries], ['published'])
        self.assertEqual(len(sync.public_entries(xml.replace(sync.CHANNEL, sync.CHANNEL[2:]), dt.datetime(2026, 10, 20, tzinfo=dt.timezone.utc))), 1)
        with self.assertRaises(ValueError):
            sync.public_entries(xml.replace(sync.CHANNEL, 'other'))

    def test_catalog_never_publishes_private_or_scheduled_videos(self):
        entries = [{'id': 'public', 'title': 'Live title', 'published': '2026-10-19T12:00:00Z'}]
        catalog = {'private': {'profiles': ['wrong']}, 'public': {'profiles': ['species']}}
        result = sync.build_items(entries, [], catalog)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['title'], 'Live title')
        self.assertEqual(result[0]['profiles'], ['species'])

    def test_removed_recent_and_inaccessible_archive_are_removed(self):
        entries = [{'id': 'live', 'title': 'Live', 'published': '2026-10-19T12:00:00Z'}]
        previous = [{'id': 'removed', 'title': 'Removed', 'published': '2026-10-20T12:00:00Z'},
                    {'id': 'old', 'title': 'Old', 'published': '2025-12-25T12:00:00Z'}]
        result = sync.build_items(entries, previous, {}, lambda _: False)
        self.assertEqual([item['id'] for item in result], ['live'])
        result = sync.build_items(entries, previous, {}, lambda _: True)
        self.assertEqual([item['id'] for item in result], ['live', 'old'])



class WeeklyArticleVideoLinkTest(unittest.TestCase):
    def test_only_link_published_article_after_matching_public_video(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            published = root / '_kryp_weekly'
            queued = root / '_kryp_weekly_queue'
            published.mkdir()
            queued.mkdir()
            article_content = ('---\n'
                               'title: "Linothele bygger et sansekart av silke"\n'
                               'youtube_video_match: "linothele|fallax|edderkoppens egen alarm"\n'
                               'youtube_video_not_before: "2026-11-02T00:00:00+01:00"\n'
                               '---\nArticle body stays unchanged.\n')
            article = published / '2026-11-01-linothele-bygger-et-sansekart.md'
            article.write_text(article_content, encoding='utf-8')
            queued_copy = queued / '010-future.md'
            queued_copy.write_text(article_content, encoding='utf-8')

            early = [{'id': '12345678901', 'title': 'Linothele teaser',
                      'published': '2026-11-01T16:00:00Z'}]
            unrelated = [{'id': '12345678902', 'title': 'Har edderkopper knokler?',
                          'published': '2026-11-02T16:00:00Z'}]
            self.assertEqual(sync.update_weekly_article_links(early, root), [])
            self.assertEqual(sync.update_weekly_article_links(unrelated, root), [])
            self.assertEqual(article.read_text(encoding='utf-8'), article_content)

            released = [{'id': '12345678903', 'title': 'Edderkoppens egen alarm! 🕷️',
                         'published': '2026-11-02T16:00:00Z'}]
            self.assertEqual(sync.update_weekly_article_links(released, root), [article.name])
            new_content = article.read_text(encoding='utf-8')
            self.assertIn('youtube_link_url: "https://www.youtube.com/watch?v=12345678903"', new_content)
            self.assertIn('Article body stays unchanged.', new_content)
            self.assertEqual(queued_copy.read_text(encoding='utf-8'), article_content)
            self.assertEqual(sync.update_weekly_article_links(released, root), [])
            self.assertEqual(article.read_text(encoding='utf-8'), new_content)

    def test_ignores_articles_without_opt_in_and_invalid_video_ids(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            folder = root / '_kryp_weekly'
            folder.mkdir()
            plain = folder / 'plain.md'
            plain.write_text('---\ntitle: "Other animal"\n---\n', encoding='utf-8')
            matched = folder / 'match.md'
            matched.write_text('---\nyoutube_video_match: "linothele"\n'
                               'youtube_video_not_before: "2026-11-02T00:00:00+01:00"\n---\n',
                               encoding='utf-8')
            candidate = [{'id': 'unsafe/id', 'title': 'Linothele',
                          'published': '2026-11-02T16:00:00Z'}]
            self.assertEqual(sync.update_weekly_article_links(candidate, root), [])
            self.assertNotIn('youtube_link_url', plain.read_text(encoding='utf-8'))
            self.assertNotIn('youtube_link_url', matched.read_text(encoding='utf-8'))


class NetworkRetryTest(unittest.TestCase):
    @patch.object(sync.time, 'sleep')
    @patch.object(sync.urllib.request, 'urlopen')
    def test_temporary_server_and_network_errors_recover(self, urlopen, sleep):
        url = 'https://www.youtube.com/feeds/videos.xml'
        failures = [urllib.error.HTTPError(url, code, 'Temporary error', {}, None)
                    for code in (408, 429, 500, 503)]
        failures += [urllib.error.URLError('Connection interrupted'),
                     TimeoutError('Timed out'), ConnectionResetError('Connection reset')]
        for failure in failures:
            with self.subTest(failure=failure):
                urlopen.reset_mock()
                sleep.reset_mock()
                urlopen.side_effect = [failure, io.BytesIO(b'public feed')]
                self.assertEqual(sync.get(url), b'public feed')
                self.assertEqual(urlopen.call_count, 2)
                sleep.assert_called_once_with(5)

    @patch.object(sync.time, 'sleep')
    @patch.object(sync.urllib.request, 'urlopen')
    def test_feed_not_found_is_retried_but_unavailable_video_is_removed(self, urlopen, sleep):
        url = 'https://www.youtube.com/feeds/videos.xml'
        urlopen.side_effect = [urllib.error.HTTPError(url, 404, 'Not Found', {}, None),
                               io.BytesIO(b'public feed')]
        self.assertEqual(sync.get(url, retry_not_found=True), b'public feed')
        sleep.assert_called_once_with(5)

        urlopen.reset_mock()
        sleep.reset_mock()
        urlopen.side_effect = urllib.error.HTTPError(url, 404, 'Not Found', {}, None)
        self.assertFalse(sync.accessible('removed-video'))
        self.assertEqual(urlopen.call_count, 1)
        sleep.assert_not_called()

    @patch.object(sync.time, 'sleep')
    @patch.object(sync.urllib.request, 'urlopen')
    def test_permanent_request_errors_fail_without_retry(self, urlopen, sleep):
        urlopen.side_effect = urllib.error.HTTPError('https://www.youtube.com', 400, 'Bad Request', {}, None)
        with self.assertRaises(urllib.error.HTTPError):
            sync.get('https://www.youtube.com')
        self.assertEqual(urlopen.call_count, 1)
        sleep.assert_not_called()

    @patch.object(sync.time, 'sleep')
    @patch.object(sync.urllib.request, 'urlopen')
    def test_exhausted_retries_fail_and_preserve_published_data(self, urlopen, sleep):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            output = root / 'assets/data/kryp-youtube.json'
            output.parent.mkdir(parents=True)
            original = b'{"channelId":"existing","items":[{"id":"keep-me"}]}\n'
            output.write_bytes(original)
            (root / 'tools').mkdir()
            (root / 'tools/kryp-youtube-catalog.json').write_text('{}', encoding='utf-8')
            failure = urllib.error.HTTPError('https://www.youtube.com', 503, 'Unavailable', {}, None)
            urlopen.side_effect = failure
            with patch.object(sync, 'ROOT', root), self.assertRaises(urllib.error.HTTPError):
                sync.main()
            self.assertEqual(output.read_bytes(), original)
            self.assertEqual(urlopen.call_count, 4)
            self.assertEqual([call.args[0] for call in sleep.call_args_list], [5, 10, 20])


class VerifiedCacheTest(unittest.TestCase):
    def setUp(self):
        directory = tempfile.TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.root = Path(directory.name)
        self.output = self.root / 'assets/data/kryp-youtube.json'
        self.output.parent.mkdir(parents=True)
        (self.root / 'tools').mkdir()
        (self.root / 'tools/kryp-youtube-catalog.json').write_text('{}', encoding='utf-8')
        self.now = dt.datetime.now(dt.timezone.utc)
        published = (self.now - dt.timedelta(days=2)).isoformat()
        self.items = [{'id': 'public', 'title': 'Public', 'published': published,
                       'summary': '', 'profiles': [], 'norwegianProfiles': [], 'kind': 'video'}]
        self.xml = (f'<feed xmlns="http://www.w3.org/2005/Atom" '
                    f'xmlns:yt="http://www.youtube.com/xml/schemas/2015">'
                    f'<yt:channelId>{sync.CHANNEL}</yt:channelId>'
                    f'<entry><yt:videoId>public</yt:videoId><title>Public</title>'
                    f'<published>{published}</published></entry></feed>').encode()
        for owner, name, value in [(sync, 'ROOT', self.root),
                                   (sync.time, 'sleep', None),
                                   (sync.urllib.request, 'urlopen', None)]:
            replacement = patch.object(owner, name, value) if name == 'ROOT' else patch.object(owner, name)
            mocked = replacement.start()
            self.addCleanup(replacement.stop)
            if name == 'urlopen':
                self.urlopen = mocked

    def write_cache(self, verified, channel=sync.CHANNEL):
        data = {'channelId': channel, 'items': self.items}
        if verified is not None:
            data['lastVerifiedAt'] = verified
        self.output.write_text(json.dumps(data), encoding='utf-8')
        return self.output.read_bytes()

    def test_short_outage_warns_and_keeps_recent_verified_cache(self):
        original = self.write_cache((self.now - dt.timedelta(hours=1)).isoformat())
        self.urlopen.side_effect = urllib.error.HTTPError('https://www.youtube.com', 500, 'Error', {}, None)
        with patch('builtins.print') as report:
            sync.main()
        self.assertEqual(self.output.read_bytes(), original)
        self.assertEqual(self.urlopen.call_count, 4)
        self.assertTrue(any(call.args[0].startswith('::warning::') for call in report.call_args_list))

    def test_stale_or_unverified_cache_still_fails(self):
        cases = [(None, sync.CHANNEL),
                 ((self.now - dt.timedelta(hours=25)).isoformat(), sync.CHANNEL),
                 ((self.now + dt.timedelta(hours=1)).isoformat(), sync.CHANNEL),
                 ('invalid timestamp', sync.CHANNEL),
                 (self.now.isoformat(), 'wrong-channel')]
        for verified, channel in cases:
            with self.subTest(verified=verified, channel=channel):
                original = self.write_cache(verified, channel)
                self.urlopen.reset_mock()
                self.urlopen.side_effect = urllib.error.HTTPError('https://www.youtube.com', 404, 'Not Found', {}, None)
                with self.assertRaises(urllib.error.HTTPError):
                    sync.main()
                self.assertEqual(self.output.read_bytes(), original)
                self.assertEqual(self.urlopen.call_count, 4)

    def test_success_refreshes_verification_when_due(self):
        self.write_cache((self.now - dt.timedelta(hours=13)).isoformat())
        self.urlopen.return_value = io.BytesIO(self.xml)
        sync.main()
        data = json.loads(self.output.read_text(encoding='utf-8'))
        self.assertEqual(data['items'], self.items)
        self.assertGreaterEqual(dt.datetime.fromisoformat(data['lastVerifiedAt']), self.now)

    def test_unchanged_recent_data_does_not_create_commit_churn(self):
        original = self.write_cache((self.now - dt.timedelta(hours=1)).isoformat())
        self.urlopen.return_value = io.BytesIO(self.xml)
        sync.main()
        self.assertEqual(self.output.read_bytes(), original)


if __name__ == '__main__':
    unittest.main()
