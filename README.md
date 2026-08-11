# introvertebrates-site

## Updating public Codex data

1. In Introvertebrates Codex, open **Settings → Website → Create public website snapshot**.
2. Save or share the generated `introvertebrates-website-public-*.json` file to this computer.
3. From this repository, run:

   ```powershell
   node tools/build-public-codex-data.mjs "C:\path\to\introvertebrates-website-public.json"
   ```

4. Preview the homepage and profiles before committing or publishing.

The app snapshot and the website importer only accept public aggregate statistics and allow-listed profile metrics. They exclude collection record IDs, private notes, contacts, exact event dates, enclosure IDs, and local image paths.
