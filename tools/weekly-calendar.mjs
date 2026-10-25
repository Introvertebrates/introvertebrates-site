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

/**
 * Only release after 10:00 Oslo time on Sunday.
 * A delayed Monday retry is backdated to that Sunday's issue, not Monday's.
 * This also prevents Jekyll from building an issue with a future 10:00 date.
 */
export function scheduledPublicationDate(localDate, localTime) {
  const stamp = dateStamp(localDate);
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(localTime)) throw new Error("Invalid Oslo clock time: " + localTime);
  const weekday = new Date(stamp).getUTCDay();
  if (weekday === 0) return localTime >= "10:00" ? localDate : null;
  if (weekday === 1) return new Date(stamp - 86400000).toISOString().slice(0, 10);
  return null;
}
