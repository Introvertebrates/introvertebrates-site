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


def temporary_error(error, *, retry_not_found=False):
    if isinstance(error, urllib.error.HTTPError):
        return (error.code in (408, 429) or 500 <= error.code < 600
                or (retry_not_found and error.code == 404))
    return isinstance(error, (urllib.error.URLError, TimeoutError, ConnectionError))


def get(url, *, retry_not_found=False):
    request = urllib.request.Request(url, headers={'User-Agent': 'Introvertebrates-public-video-sync/1.0'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read()
        except (urllib.error.URLError, TimeoutError, ConnectionError) as error:
            # The channel feed intermittently returns 404 even for a valid
            # channel. An oEmbed 404 still means an archived video is unavailable.
            if not temporary_error(error, retry_not_found=retry_not_found) or attempt == 3:
                raise
            if isinstance(error, urllib.error.HTTPError):
                reason = f'HTTP {error.code}'
                error.close()
            else:
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



def frontmatter_value(source, key):
    """Read a simple scalar from a site's YAML front matter."""
    if not source.startswith('---\\n'):
        return None
    header = source.split('\\n---\\n', 1)[0]
    for line in header.splitlines():
        if line.startswith(key + ':'):
            value = line.split(':', 1)[1].strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
                return value[1:-1]
            return value
    return None


def update_weekly_article_links(items, root=None):
    """Add a static YouTube link to an already-published weekly article only
    after the matching video appears in the confirmed public channel feed.
    The queued article and unpublished/private videos are never linked.
    """
    root = root or ROOT
    folder = root / '_kryp_weekly'
    if not folder.is_dir():
        return []
    updated = []
    for file in sorted(folder.glob('*.md')):
        source = file.read_text(encoding='utf-8')
        match_value = frontmatter_value(source, 'youtube_video_match')
        not_before = frontmatter_value(source, 'youtube_video_not_before')
        if not match_value or not not_before or frontmatter_value(source, 'youtube_link_url'):
            continue
        try:
            earliest = dt.datetime.fromisoformat(not_before.replace('Z', '+00:00'))
        except ValueError:
            raise ValueError(f'{file.name}: invalid youtube_video_not_before')
        if earliest.tzinfo is None:
            raise ValueError(f'{file.name}: youtube_video_not_before needs a timezone')
        terms = [term.strip().casefold() for term in match_value.split('|') if term.strip()]
        candidates = []
        for item in items:
            video_id = item.get('id', '')
            if len(video_id) != 11 or not all(c.isalnum() or c in '_-' for c in video_id):
                continue
            published = dt.datetime.fromisoformat(item['published'].replace('Z', '+00:00'))
            if published < earliest or published.tzinfo is None:
                continue
            haystack = (item['title'] + ' ' + item.get('summary', '')).casefold()
            if any(term in haystack for term in terms):
                candidates.append(item)
        if not candidates:
            continue
        chosen = max(candidates, key=lambda item: item['published'])
        link = f'https://www.youtube.com/watch?v={chosen["id"]}'
        new_source = source.replace('---\\n', f'---\\nyoutube_link_url: "{link}"\\n', 1)
        file.write_text(new_source, encoding='utf-8')
        updated.append(file.name)
    return updated


def verification_time(data, now):
    timestamp = data.get('lastVerifiedAt')
    if data.get('channelId') != CHANNEL or not data.get('items') or not isinstance(timestamp, str):
        return None
    try:
        verified = dt.datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
    except ValueError:
        return None
    return verified if verified.tzinfo is not None and verified <= now else None


def main():
    output = ROOT / 'assets/data/kryp-youtube.json'
    catalog = json.loads((ROOT / 'tools/kryp-youtube-catalog.json').read_text(encoding='utf-8'))
    data = json.loads(output.read_text(encoding='utf-8')) if output.exists() else {}
    previous = data.get('items', [])
    now = dt.datetime.now(dt.timezone.utc)
    verified = verification_time(data, now)
    try:
        entries = public_entries(get(f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}',
                                    retry_not_found=True), now)
        items = build_items(entries, previous, catalog)
    except (urllib.error.URLError, TimeoutError, ConnectionError) as error:
        if (temporary_error(error, retry_not_found=True) and verified is not None
                and now - verified < dt.timedelta(hours=24)):
            print(f'::warning::YouTube is temporarily unavailable ({error}). '
                  f'Keeping {len(previous)} public videos verified at {data["lastVerifiedAt"]}; '
                  'the next scheduled run will try again. No website data was changed.')
            return
        raise
    linked_articles = update_weekly_article_links(items)
    for article in linked_articles:
        print(f'Added confirmed public YouTube Short to {article}.')
    # Refresh the verification timestamp twice daily, or when content changes,
    # so successful checks do not create a commit and site rebuild every hour.
    if (items != previous or verified is None or now - verified >= dt.timedelta(hours=12)):
        data = {'channelId': CHANNEL, 'lastVerifiedAt': now.isoformat(), 'items': items}
        output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Confirmed {len(items)} published videos. Scheduled videos are never added from the catalog alone.')


if __name__ == '__main__':
    main()
