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


if __name__ == '__main__':
    unittest.main()
