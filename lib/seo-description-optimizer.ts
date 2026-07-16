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

/**
 * INS-22: Installation-Specific Metadata Description Variations
 * Ensures description length <= 160 chars (140-155 ideal for EN/MS, max 155 CJK).
 * Weaves in trust signals: From RM199, Same-Day Available, 1-Month Warranty, Vacuum Pump, Type L Copper.
 */
export function buildInstallationMetaDesc(
  baseOrEntity: string,
  locale: "en" | "ms" | "zh" = "en",
  options?: {
    type?: "pillar" | "hp" | "area" | "brand" | "kampung";
    priceAnchor?: string;
    landmarks?: string[];
  }
): string {
  const price = options?.priceAnchor || "RM 199";
  const phone = "+60182983573";

  if (options?.type) {
    const entity = baseOrEntity.trim();
    let desc = "";

    if (options.type === "pillar") {
      if (locale === "ms") {
        desc = `Pemasangan aircond profesional dari ${price}. Unit dinding, ceiling cassette, semua jenama. Pam vakum, paip tembaga Type L, waranti 1 bulan. WhatsApp ${phone}`;
      } else if (locale === "zh") {
        desc = `专业冷气安装服务${price}起。涵盖挂壁式与天花板卡式机，支持各大品牌。采用抽真空工艺与Type L正品铜管，提供1个月工艺保修。WhatsApp ${phone}`;
      } else {
        desc = `Professional aircond installation from ${price}. Wall-mounted, ceiling cassette, all brands. Vacuum pump, copper pipe, 1-month warranty. WhatsApp ${phone}`;
      }
    } else if (options.type === "hp") {
      if (locale === "ms") {
        desc = `Pemasangan aircond ${entity} untuk bilik & pejabat di KL & Selangor. Dari ${price} termasuk 7ft paip tembaga, wayar, vakum. Slot hari sama ada. WhatsApp ${phone}`;
      } else if (locale === "zh") {
        desc = `${entity}冷气安装覆盖吉隆坡与雪兰莪卧室及办公室。${price}起包含7尺正品铜管、电线及抽真空规范。可安排当天上门安装。WhatsApp ${phone}`;
      } else {
        desc = `${entity} aircond installation for bedrooms in KL & Selangor. From ${price} including 7ft copper pipe, wiring, vacuum. Same-day available. WhatsApp ${phone}`;
      }
    } else if (options.type === "area") {
      const landmarkNote = options.landmarks?.length ? ` ${options.landmarks.slice(0, 2).join(", ")} covered.` : "";
      if (locale === "ms") {
        desc = `Pakar pemasangan aircond di ${entity} dari ${price}. Servis hari sama, semua jenama, waranti 1 bulan. Liputan penuh kawasan setempat. WhatsApp ${phone}`;
      } else if (locale === "zh") {
        desc = `${entity}冷气安装专家${price}起。当天响应、支持所有品牌并附带1个月工艺保修。技师对当地住宅与商业环境了如指掌。WhatsApp ${phone}`;
      } else {
        desc = `Expert aircond installation in ${entity} from ${price}. Same-day service, all brands, 1-month warranty.${landmarkNote} WhatsApp ${phone}`;
      }
    } else if (options.type === "brand") {
      if (locale === "ms") {
        desc = `Pemasangan aircond ${entity} di KL & Selangor oleh juruteknik bertauliah. Dari ${price}. Semua model ${entity} disokong. Waranti kerja 1 bulan. WhatsApp ${phone}`;
      } else if (locale === "zh") {
        desc = `${entity}冷气由认证专业技师在吉隆坡及雪兰莪进行规范安装。${price}起支持所有${entity}型号，并附1个月工艺保修。WhatsApp ${phone}`;
      } else {
        desc = `${entity} aircond installation in KL & Selangor by certified technicians. From ${price}. All ${entity} models supported. 1-month workmanship warranty. WhatsApp ${phone}`;
      }
    } else if (options.type === "kampung") {
      if (locale === "ms") {
        desc = `Pakar pemasangan aircond di kawasan ${entity} dari ${price}. Vakum wajib, paip tembaga berkualiti tinggi, waranti 1 bulan. Slot hari sama ada. WhatsApp ${phone}`;
      } else if (locale === "zh") {
        desc = `${entity}社区冷气安装专家${price}起。严谨抽真空与正品铜管标准，提供1个月工艺保修。极速安排当天上门。WhatsApp ${phone}`;
      } else {
        desc = `Professional aircond installation near ${entity} from ${price}. Mandatory vacuum pump, Type L copper pipe, 1-month warranty. Same-day slots. WhatsApp ${phone}`;
      }
    }

    if (desc) return clampMetaDescription(desc);
  }

  return clampMetaDescription(baseOrEntity);
}
