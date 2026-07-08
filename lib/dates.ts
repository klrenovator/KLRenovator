/**
 * Returns the current month and year for SEO freshness.
 * e.g., "July 2026"
 */
export function getFreshDate() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}

/**
 * Returns localized fresh date for Malay.
 * e.g., "Julai 2026"
 */
export function getFreshDateMS() {
  const now = new Date();
  const monthNames = [
    "Januari", "Februari", "Mac", "April", "Mei", "Jun",
    "Julai", "Ogos", "September", "Oktober", "November", "Disember"
  ];
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}

/**
 * Returns localized fresh date for Chinese.
 * e.g., "2026年7月"
 */
export function getFreshDateZH() {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月`;
}
