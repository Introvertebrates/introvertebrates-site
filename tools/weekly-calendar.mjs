export function dateStamp(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error(`Invalid date: ${text}`);
  const value = Date.parse(`${text}T00:00:00Z`);
  if (!Number.isFinite(value) || new Date(value).toISOString().slice(0, 10) !== text) throw new Error(`Invalid date: ${text}`);
  return value;
}

export function weekKey(text) {
  const date = new Date(dateStamp(text));
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
}

export function publicationBlocked(candidate, publishedDates) {
  const target = dateStamp(candidate);
  return publishedDates.some((published) => weekKey(published) === weekKey(candidate) || Math.abs(target - dateStamp(published)) < 7 * 86400000);
}
