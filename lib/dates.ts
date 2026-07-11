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

/**
 * Inject fresh date into a title before the last " — " separator if present,
 * otherwise append with " — ".
 * Example: "Aircond Service Kuala Lumpur — RM 99 Same Day KL" + "July 2026"
 * => "Aircond Service Kuala Lumpur July 2026 — RM 99 Same Day KL"
 */
export function injectFreshDate(baseTitle: string, freshDate: string): string {
  if (!baseTitle) return freshDate;
  if (baseTitle.includes(freshDate)) return baseTitle; // already fresh
  if (baseTitle.includes(" — ")) {
    const parts = baseTitle.split(" — ");
    // Insert date into first part
    return `${parts[0]} ${freshDate} — ${parts.slice(1).join(" — ")}`;
  }
  return `${baseTitle} — ${freshDate}`;
}

/**
 * Build a fresh title from base + date, ensuring we don't duplicate year if base already has year
 * If base contains "2026" or similar year pattern, replace it with freshDate
 */
export function buildFreshTitle(baseTitle: string, freshDate: string): string {
  if (!baseTitle) return freshDate;
  
  // If base already contains a year like 2026 or 2025, replace "2026" with freshDate year part?
  // Simpler: if base contains 4-digit year, replace that year with fresh year and add month if needed
  // For this project, we want to replace "2026" with freshDate where appropriate
  
  // Remove existing year patterns like " 2026" or "2026 —" to avoid duplication
  let cleaned = baseTitle.replace(/\s*202[0-9]\s*—?/g, " ").replace(/\s+/g, " ").trim();
  // Now inject fresh date
  return injectFreshDate(cleaned, freshDate);
}

/**
 * Get fresh date by locale
 */
export function getFreshDateByLocale(locale: "en" | "ms" | "zh"): string {
  switch (locale) {
    case "ms":
      return getFreshDateMS();
    case "zh":
      return getFreshDateZH();
    default:
      return getFreshDate();
  }
}
