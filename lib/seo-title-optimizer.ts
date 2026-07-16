// lib/seo-title-optimizer.ts
// Round 44 / v51 — 20E.40 Meta Title Length Audit
// Purpose: Ensure meta titles stay within 50–60 characters for EN/MS pages (CJK allowed shorter but max 60).
// Used across all generateMetadata / static metadata definitions.

export const META_TITLE_MIN = 50;
export const META_TITLE_MAX = 60;
export const META_TITLE_MIN_CJK = 20;
export const META_TITLE_MAX_CJK = 60;

function isCJK(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function truncateAtWordBoundary(text: string, max: number): string {
  if (text.length <= max) return text;
  // Try to cut at common separators before max
  const separators = [" | ", " — ", " - ", " : ", " – "];
  let cutPos = -1;

  // Prefer cutting at separator that leaves >= MIN
  for (const sep of separators) {
    const idx = text.lastIndexOf(sep, max);
    if (idx > 0) {
      cutPos = idx;
      break;
    }
  }

  if (cutPos === -1) {
    // Fallback: last space before max
    cutPos = text.lastIndexOf(" ", max);
  }

  if (cutPos > 0) {
    return text.slice(0, cutPos).trim();
  }

  // Hard cut
  return text.slice(0, max).trim();
}

function padTitleForMinEN(title: string, min: number, max: number): string {
  let result = title.trim();

  // Already meets min
  if (result.length >= min) return result;

  // Candidate suffixes in order of preference — try to reach min without exceeding max
  // Includes very short suffixes for kampung pages like SS2
  const suffixes = [
    " | KL Renovator",
    " — KL Renovator",
    " | KL & Selangor",
    " — KL & Selangor",
    " — Same Day Service",
    " — Same Day KL",
    " — RM 99 Same Day",
    " | KL",
    " KL",
    " — KL",
    " | Renovator",
    " — Renovator",
  ];

  for (const suffix of suffixes) {
    if (result.includes(suffix.trim())) continue; // avoid duplicate
    if (result.length + suffix.length <= max && result.length + suffix.length >= min) {
      return (result + suffix).trim();
    }
  }

  // If none directly reaches min, iteratively add smallest that fits
  const incremental = [" | KL", " KL", " — KL", " | Renovator"];
  for (const suffix of incremental) {
    if (result.length + suffix.length <= max) {
      if (!result.includes(suffix.trim())) {
        const candidate = (result + suffix).trim();
        // If candidate reaches min, return
        if (candidate.length >= min) return candidate;
        // Otherwise keep building
        result = candidate;
        if (result.length >= min) return result;
      }
    }
  }

  // If still short but we have room, pad with " | KL Renovator" truncated?
  // Final fallback: if still < min, return as-is (better short than over max)
  // But try to at least reach min by appending " | KL" if fits
  if (result.length + 4 <= max) {
    result = (result + " | KL").trim();
  }

  return result;
}

/**
 * Clamp meta title to 50–60 chars for EN/MS and max 60 for CJK.
 * - If > max: truncate at word/separator boundary
 * - If < min (EN/MS only): pad with brand suffixes
 * - Ensures no double spaces, trimmed
 */
export function clampMetaTitle(raw: string, opts?: { min?: number; max?: number }): string {
  if (!raw) return raw;
  const title = raw.replace(/\s+/g, " ").trim();

  const cjk = isCJK(title);
  const min = opts?.min ?? (cjk ? META_TITLE_MIN_CJK : META_TITLE_MIN);
  const max = opts?.max ?? (cjk ? META_TITLE_MAX_CJK : META_TITLE_MAX);

  let result = title;

  // Truncate if too long
  if (result.length > max) {
    result = truncateAtWordBoundary(result, max);
    // After truncation, if we cut too aggressively and now < min (for EN), try to keep up to max
    if (!cjk && result.length < min) {
      // Take hard cut at max to stay within max but closer to min
      const hard = title.slice(0, max).trim();
      // Try last space
      const lastSpace = hard.lastIndexOf(" ");
      if (lastSpace > min) {
        result = hard.slice(0, lastSpace).trim();
      } else {
        result = hard;
      }
    }
  }

  // Pad if too short (EN/MS only)
  if (!cjk && result.length < min) {
    result = padTitleForMinEN(result, min, max);
  }

  // Final safety: if still > max, hard truncate
  if (result.length > max) {
    result = result.slice(0, max).trim();
  }

  return result;
}

/**
 * Build a safe title from parts, ensuring final length in range.
 * Example: buildTitle(["Pressure Chemical Wash", "KL & Selangor", "From RM 99"]) => optimized
 */
export function buildTitle(parts: string[], separator = " — "): string {
  const combined = parts.filter(Boolean).join(separator);
  return clampMetaTitle(combined);
}

// Helper for area pages that add fresh date: ensure date addition doesn't push over max
export function buildAreaMetaTitleWithDate(baseTitle: string, freshDate: string): string {
  const withDate = baseTitle.includes(" — ")
    ? (() => {
        const parts = baseTitle.split(" — ");
        return `${parts[0]} ${freshDate} — ${parts.slice(1).join(" — ")}`;
      })()
    : `${baseTitle} — ${freshDate}`;

  return clampMetaTitle(withDate);
}

// 20E.44 Monthly Title Freshness Automated Pattern - generic builder for any page type
export function buildFreshMetaTitle(baseTitle: string, locale: "en" | "ms" | "zh" = "en"): string {
  // Import dynamically to avoid circular dep - we use simple date logic here
  const now = new Date();
  let freshDate: string;
  if (locale === "ms") {
    const monthNames = ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"];
    freshDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  } else if (locale === "zh") {
    freshDate = `${now.getFullYear()}年${now.getMonth() + 1}月`;
  } else {
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    freshDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  }

  // If base already contains freshDate, return clamped base
  if (baseTitle.includes(freshDate)) {
    return clampMetaTitle(baseTitle);
  }

  // If base contains a year like 2026, replace it with freshDate to avoid duplication
  // e.g., "Installation Price Malaysia 2026 — From RM 199" → remove 2026 then inject freshDate
  let cleaned = baseTitle.replace(/\s*202[0-9]\s*/g, " ").replace(/\s+/g, " ").trim();

  // Inject fresh date
  const withDate = cleaned.includes(" — ")
    ? (() => {
        const parts = cleaned.split(" — ");
        return `${parts[0]} ${freshDate} — ${parts.slice(1).join(" — ")}`;
      })()
    : `${cleaned} — ${freshDate}`;

  return clampMetaTitle(withDate);
}

// Specific helpers for service pages, brand pages, etc. (wrappers around buildFreshMetaTitle)
export function buildBrandMetaTitleWithDate(baseTitle: string, locale: "en" | "ms" | "zh" = "en"): string {
  return buildFreshMetaTitle(baseTitle, locale);
}

export function buildServiceMetaTitleWithDate(baseTitle: string, locale: "en" | "ms" | "zh" = "en"): string {
  return buildFreshMetaTitle(baseTitle, locale);
}

/**
 * INS-22: Installation-Specific Metadata Title Optimizer
 * Ensures title length <= 60 characters with high-converting price anchor and trust signals.
 */
export function buildInstallationMetaTitle(
  baseTitleOrEntity: string,
  locale: "en" | "ms" | "zh" = "en",
  options?: {
    type?: "pillar" | "hp" | "area" | "brand" | "kampung";
    priceAnchor?: string;
  }
): string {
  const price = options?.priceAnchor || "RM 199";
  
  if (options?.type) {
    let raw = "";
    const entity = baseTitleOrEntity.trim();
    if (options.type === "pillar") {
      if (locale === "ms") raw = `Pemasangan Aircond KL & Selangor — Dari ${price} | KL Renovator`;
      else if (locale === "zh") raw = `吉隆坡与雪兰莪冷气安装 — ${price}起 | KL Renovator`;
      else raw = `Aircond Installation KL Selangor — From ${price} | KL Renovator`;
    } else if (options.type === "hp") {
      if (locale === "ms") raw = `Pemasangan Aircond ${entity} KL — Dari ${price} | KL Renovator`;
      else if (locale === "zh") raw = `${entity}冷气安装吉隆坡 — ${price}起 | KL Renovator`;
      else raw = `${entity} Aircond Installation KL — From ${price} | KL Renovator`;
    } else if (options.type === "area") {
      if (locale === "ms") raw = `Pemasangan Aircond ${entity} — Dari ${price} | KL Renovator`;
      else if (locale === "zh") raw = `${entity}冷气安装服务 — ${price}起 | KL Renovator`;
      else raw = `Aircond Installation ${entity} — ${price} | KL Renovator`;
    } else if (options.type === "brand") {
      if (locale === "ms") raw = `Pemasangan Aircond ${entity} KL — Pakar Sebenar | KL Renovator`;
      else if (locale === "zh") raw = `${entity}冷气安装吉隆坡 — 专业认证技师 | KL Renovator`;
      else raw = `${entity} Aircond Installation KL — Expert Fitting | KL Renovator`;
    } else if (options.type === "kampung") {
      if (locale === "ms") raw = `Pemasangan Aircond ${entity} — Dari ${price} | KL Renovator`;
      else if (locale === "zh") raw = `${entity}专业冷气安装 — ${price}起 | KL Renovator`;
      else raw = `Aircond Installation ${entity} — From ${price} | KL Renovator`;
    }
    if (raw) return clampMetaTitle(raw, { max: locale === "zh" ? META_TITLE_MAX_CJK : META_TITLE_MAX });
  }

  return buildFreshMetaTitle(baseTitleOrEntity, locale);
}
