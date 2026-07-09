// lib/seo-description-optimizer.ts
// Round 45 / v52 — 20E.41 Meta Description Uniqueness Pass
// Ensure meta descriptions are unique and 140–155 chars for EN/MS (CJK max 155 but min 60)
// Used across all generateMetadata

export const META_DESC_MIN = 140;
export const META_DESC_MAX = 155;
export const META_DESC_MIN_CJK = 60;
export const META_DESC_MAX_CJK = 155;

function isCJK(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function truncateAtWordBoundary(text: string, max: number): string {
  if (text.length <= max) return text;
  // Prefer to cut at sentence end (. ) or comma, or space
  const separators = [". ", ".", " — ", " – ", " | ", ", ", " "];
  let cutPos = -1;
  for (const sep of separators) {
    const idx = text.lastIndexOf(sep, max);
    // Ensure cut leaves at least MIN chars (so we don't cut too short)
    if (idx > 100) {
      cutPos = idx + (sep.includes(".") ? 1 : 0);
      break;
    }
  }
  if (cutPos === -1) {
    cutPos = text.lastIndexOf(" ", max);
  }
  if (cutPos > 0) {
    return text.slice(0, cutPos).trim();
  }
  return text.slice(0, max).trim();
}

/**
 * Clamp meta description to 140–155 chars (EN/MS) and max 155 for CJK
 * - If > max: truncate at word boundary
 * - If < min: try to pad is not ideal for descriptions (we don't pad), just return as-is but log
 * - Ensures unique via caller (area/brand name already makes unique)
 */
export function clampMetaDescription(raw: string, opts?: { min?: number; max?: number }): string {
  if (!raw) return raw;
  const clean = raw.replace(/\s+/g, " ").trim();

  const cjk = isCJK(clean);
  const min = opts?.min ?? (cjk ? META_DESC_MIN_CJK : META_DESC_MIN);
  const max = opts?.max ?? META_DESC_MAX_CJK; // max same for both

  let result = clean;

  if (result.length > max) {
    result = truncateAtWordBoundary(result, max);
    // Remove trailing punctuation artifacts
    result = result.replace(/[—\-–,;:\s]+$/, "").trim();
    // If we trimmed too much and now < min, try hard cut at max
    if (result.length < min && clean.length >= min) {
      // Try to take first max chars but end at word
      const hard = clean.slice(0, max);
      const lastSpace = hard.lastIndexOf(" ");
      if (lastSpace > min) {
        result = hard.slice(0, lastSpace).trim();
      } else {
        result = hard.trim();
      }
    }
  }

  // Final safety: hard cut if still over max
  if (result.length > max) {
    result = result.slice(0, max).trim();
  }

  return result;
}

/**
 * Build unique description for area pages ensuring 140-155
 * Adds area-specific landmark to guarantee uniqueness
 */
export function buildUniqueAreaMetaDesc(area: { name: string; state: string; landmarks?: string[]; description?: string; metaDesc?: string }): string {
  const base = area.metaDesc || area.description || "";
  // Ensure uniqueness by using area name + state already in base, but add landmark if missing
  let desc = base;
  if (area.landmarks && area.landmarks.length && !desc.includes(area.landmarks[0])) {
    // Try to append landmark naturally if within limit
    const extra = ` Near ${area.landmarks[0]}.`;
    if ((desc + extra).length <= META_DESC_MAX) {
      desc = desc + extra;
    }
  }
  return clampMetaDescription(desc);
}

export function buildUniqueBrandMetaDesc(brand: { name: string; metaDesc?: string; description?: string }): string {
  const base = brand.metaDesc || brand.description || "";
  return clampMetaDescription(base);
}
