import datetime as dt
import importlib.util
import json
from pathlib import Path
import unittest

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


if __name__ == '__main__':
    unittest.main()
