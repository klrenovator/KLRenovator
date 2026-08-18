#!/usr/bin/env python3
"""Replace leftover hardcoded /hero/ refs so no assigned photo is reused."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/home/user/KLRenovator")
LOGO = "/logo/image.png"
LOGO_ABS = "https://www.klrenovator.com/logo/image.png"

# Pages that already have a unique assignment — keep/force that photo.
UNIQUE = {
    # homepage OG (hero component already unique)
    "app/(en)/page.tsx": "/hero/york-aircond-chemical-wash-puchong-37.webp",
    "app/(ms)/ms/page.tsx": "/hero/york-aircond-chemical-wash-puchong-37.webp",
    "app/(zh)/zh/page.tsx": "/hero/york-aircond-chemical-wash-puchong-37.webp",
    "app/(en)/about/page.tsx": "/hero/generic-aircond-gas-topup-kuala-lumpur-107.webp",
    "app/(ms)/ms/about/page.tsx": "/hero/generic-aircond-gas-topup-kuala-lumpur-107.webp",
    "app/(zh)/zh/about/page.tsx": "/hero/generic-aircond-gas-topup-kuala-lumpur-107.webp",
    "app/(en)/contact/page.tsx": "/hero/aircond-pcb-board-replacement-kl.webp",
    "app/(ms)/ms/contact/page.tsx": "/hero/aircond-pcb-board-replacement-kl.webp",
    "app/(zh)/zh/contact/page.tsx": "/hero/aircond-pcb-board-replacement-kl.webp",
    "app/(en)/faq/page.tsx": "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp",
    "app/(ms)/ms/faq/page.tsx": "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp",
    "app/(zh)/zh/faq/page.tsx": "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp",
    "components/faq-page-i18n.tsx": "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp",
    "app/(en)/services/page.tsx": "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp",
    "app/(ms)/ms/services/page.tsx": "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp",
    "app/(zh)/zh/services/page.tsx": "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp",
    "app/(en)/problems/page.tsx": "/hero/midea-aircond-gas-topup-r32-puchong-39.webp",
    "app/(ms)/ms/problems/page.tsx": "/hero/midea-aircond-gas-topup-r32-puchong-39.webp",
    "app/(zh)/zh/problems/page.tsx": "/hero/midea-aircond-gas-topup-r32-puchong-39.webp",
    "app/(en)/services/maintenance-contract/page.tsx": "/hero/aux-aircond-basic-servicing-shah-alam-53.webp",
    "app/(ms)/ms/services/maintenance-contract/page.tsx": "/hero/aux-aircond-basic-servicing-shah-alam-53.webp",
    "app/(zh)/zh/services/maintenance-contract/page.tsx": "/hero/aux-aircond-basic-servicing-shah-alam-53.webp",
    "app/(en)/services/emergency/page.tsx": "/hero/acson-aircond-pcb-board-repair-klang-71.webp",
}

SKIP_FILES = {
    "components/about-page-i18n.tsx",
    "components/sections/hero.tsx",
    "components/sections/installation-spotlight.tsx",
    "components/gallery-page-i18n.tsx",
    "config/gallery-items.ts",
    "config/blog-posts.ts",
    "config/services-data.ts",
    "config/service-og-images.ts",
}

HERO_RE = re.compile(r"(https://www\.klrenovator\.com)?/hero/[A-Za-z0-9._-]+\.webp")


def rewrite_file(path: Path) -> int:
    rel = str(path.relative_to(ROOT))
    if rel in SKIP_FILES or rel.startswith("config/installation-blog") or rel.startswith("config/new-blog"):
        return 0
    if rel.startswith("config/site/"):
        return 0
    text = path.read_text()
    orig = text
    assigned = UNIQUE.get(rel)

    def repl(m: re.Match) -> str:
        full = m.group(0)
        if assigned:
            if full.startswith("http"):
                return f"https://www.klrenovator.com{assigned}"
            return assigned
        if full.startswith("http"):
            return LOGO_ABS
        return LOGO

    text = HERO_RE.sub(repl, text)
    if text != orig:
        path.write_text(text)
        return 1
    return 0


changed = 0
roots = [
    ROOT / "app",
    ROOT / "components",
    ROOT / "config/installation-page-content.ts",
    ROOT / "config/area-installation-content.ts",
    ROOT / "config/brand-installation-content.ts",
    ROOT / "config/kampung-installation-content.ts",
]
for target in roots:
    if target.is_file():
        changed += rewrite_file(target)
    else:
        for p in target.rglob("*"):
            if p.suffix in {".ts", ".tsx", ".mjs", ".js"}:
                changed += rewrite_file(p)

print(f"Rewrote {changed} files")

# Area page: don't render empty Image
area = ROOT / "app/(en)/areas/[slug]/page.tsx"
t = area.read_text()
t = t.replace(
    """        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={getAreaImage(area.heroImage)}
            alt={`Aircond service technician working on an air conditioning unit in ${area.name}, KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>""",
    """        {getAreaImage(area.heroImage) ? (
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={getAreaImage(area.heroImage)}
            alt={`Aircond service technician working on an air conditioning unit in ${area.name}, KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>
        ) : null}""",
)
area.write_text(t)
print("area page conditional image ok")

# gallery-items duplicate srcs: drop ids 24, 96, 97
g = ROOT / "config/gallery-items.ts"
gt = g.read_text()
gt = re.sub(r"\n  \{ id: 24,[\s\S]*?\},\n", "\n", gt, count=1)
gt = re.sub(r"\n  \{ id: 96,[\s\S]*?\},\n", "\n", gt, count=1)
gt = re.sub(r"\n  \{ id: 97,[\s\S]*?\},\n", "\n", gt, count=1)
g.write_text(gt)
print("gallery duplicate entries removed")
