"""Refresh public videos only. No YouTube credentials or scheduling actions."""
import datetime as dt
import json
from pathlib import Path
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
CHANNEL = 'UC5Nn9nq93NXyq0SBKq7Ny0Q'
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015'}


def public_entries(xml, now=None):
    now = now or dt.datetime.now(dt.timezone.utc)
    root = ET.fromstring(xml)
    if root.findtext('yt:channelId', namespaces=NS) not in (CHANNEL, CHANNEL[2:]):
        raise ValueError('Unexpected YouTube channel; keeping existing data.')
    entries = []
    for entry in root.findall('a:entry', NS):
        video_id = entry.findtext('yt:videoId', namespaces=NS)
        title = entry.findtext('a:title', namespaces=NS)
        published = entry.findtext('a:published', namespaces=NS)
        date = dt.datetime.fromisoformat(published.replace('Z', '+00:00'))
        if date > now or not video_id or not title:
            continue
        entries.append({'id': video_id, 'title': title, 'published': published})
    return entries


def get(url, *, retry_not_found=False):
    request = urllib.request.Request(url, headers={'User-Agent': 'Introvertebrates-public-video-sync/1.0'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read()
        except urllib.error.HTTPError as error:
            # The channel feed intermittently returns 404 even for a valid
            # channel. An oEmbed 404 still means an archived video is unavailable.
            transient = (error.code in (408, 429) or 500 <= error.code < 600
                         or (retry_not_found and error.code == 404))
            if not transient or attempt == 3:
                raise
            reason = f'HTTP {error.code}'
            error.close()
        except (urllib.error.URLError, TimeoutError, ConnectionError) as error:
            if attempt == 3:
                raise
            reason = str(error)
        delay = 5 * (2 ** attempt)
        print(f'YouTube request failed ({reason}); retrying in {delay}s '
              f'(attempt {attempt + 2}/4).', file=sys.stderr)
        time.sleep(delay)


def accessible(video_id):
    # Old entries fall out of the 15-entry RSS feed. Keep those already seen
    # publicly only while YouTube still offers their public embedding metadata.
    try:
        get(f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json')
        return True
    except urllib.error.HTTPError as error:
        if error.code in (401, 403, 404):
            return False
        raise


def build_items(entries, previous, catalog, check_accessible=accessible):
    by_id = {item['id']: item for item in entries}
    if not entries:
        raise ValueError('Empty public feed; keeping existing data.')
    oldest = min(item['published'] for item in entries)
    for old in previous:
        if old['id'] not in by_id and old['published'] < oldest and check_accessible(old['id']):
            by_id[old['id']] = {key: old[key] for key in ('id', 'title', 'published')}
    result = []
    for entry in by_id.values():
        info = catalog.get(entry['id'], {})
        result.append({**entry, 'summary': info.get('summary', ''),
                       'profiles': info.get('profiles', []),
                       'norwegianProfiles': info.get('norwegianProfiles', []),
                       'kind': info.get('kind', 'video')})
    return sorted(result, key=lambda item: item['published'], reverse=True)


def main():
    output = ROOT / 'assets/data/kryp-youtube.json'
    catalog = json.loads((ROOT / 'tools/kryp-youtube-catalog.json').read_text(encoding='utf-8'))
    previous = json.loads(output.read_text(encoding='utf-8'))['items'] if output.exists() else []
    entries = public_entries(get(f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}',
                                retry_not_found=True))
    items = build_items(entries, previous, catalog)
    output.write_text(json.dumps({'channelId': CHANNEL, 'items': items}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Confirmed {len(items)} published videos. Scheduled videos are never added from the catalog alone.')


if __name__ == '__main__':
    main()
