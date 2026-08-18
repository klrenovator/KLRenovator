#!/usr/bin/env python3
"""
One photograph → one website location.

Assigns every /public/hero image to at most one content location
(blogs, services, problems, areas, static pages). Gallery catalog
display is treated as the photo library, not a competing location.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path("/home/user/KLRenovator")
HERO = ROOT / "public/hero"

# ── inventory ──────────────────────────────────────────────────────────────
ALL_IMAGES = sorted(p.name for p in HERO.iterdir() if p.suffix.lower() == ".webp")
print(f"Gallery photos on disk: {len(ALL_IMAGES)}")


def cat_of(name: str) -> str:
    fl = name.lower()
    if "chemical-wash" in fl or "chemical-service" in fl or "pressure-chemical" in fl:
        return "chemical-wash"
    if "overhaul" in fl:
        return "overhaul"
    if "gas-topup" in fl or "gas-top" in fl:
        return "gas"
    if "leak" in fl:
        return "leak"
    if "pcb" in fl:
        return "pcb"
    if "cassette" in fl:
        return "cassette"
    if "dismantle" in fl or "relocation" in fl:
        return "dismantle"
    if "basic-servicing" in fl or "servicing" in fl:
        return "servicing"
    if "compressor" in fl and "install" in fl:
        return "compressor-install"
    if "compressor" in fl:
        return "compressor"
    if "install" in fl or "bracket" in fl:
        return "installation"
    if "repair" in fl or "troubleshooting" in fl or "sensor" in fl or "flaring" in fl:
        return "repair"
    return "other"


POOLS: dict[str, list[str]] = defaultdict(list)
for n in ALL_IMAGES:
    POOLS[cat_of(n)].append(n)

used: set[str] = set()
assignments: dict[str, str] = {}  # location key → filename


def path_of(name: str) -> str:
    return f"/hero/{name}"


def take(preferred: list[str], fallback: list[str] | None = None) -> str | None:
    """Pop the first unused image from preferred categories, then fallback cats, then any."""
    order = list(preferred)
    if fallback:
        order.extend(fallback)
    order.extend(list(POOLS.keys()))
    seen_cats = set()
    for cat in order:
        if cat in seen_cats:
            continue
        seen_cats.add(cat)
        for name in POOLS.get(cat, []):
            if name not in used:
                used.add(name)
                return name
    for name in ALL_IMAGES:
        if name not in used:
            used.add(name)
            return name
    return None


def assign(key: str, preferred: list[str], fallback: list[str] | None = None) -> str | None:
    name = take(preferred, fallback)
    if name:
        assignments[key] = name
    return name


# ── 1. SERVICES (must be unique + relevant) ────────────────────────────────
SERVICE_PREFS = {
    "chemical-wash": ["chemical-wash"],
    "chemical-overhaul": ["overhaul"],
    "gas-topup": ["gas"],
    "repair": ["repair"],
    "installation": ["installation"],
    "basic-servicing": ["servicing"],
    "ceiling-cassette": ["cassette"],
    "dismantling-relocation": ["dismantle"],
    "emergency": ["pcb", "repair"],
    "maintenance-contract": ["servicing", "chemical-wash"],
}
for slug, prefs in SERVICE_PREFS.items():
    n = assign(f"service:{slug}", prefs)
    print(f"  SERVICE {slug:28} → {n}")

# ── 2. BLOGS ───────────────────────────────────────────────────────────────
def blog_prefs(slug: str, title: str) -> list[str]:
    s = f"{slug} {title}".lower()
    prefs: list[str] = []
    if any(k in s for k in ("overhaul",)):
        prefs.append("overhaul")
    if any(k in s for k in ("chemical-wash", "chemical wash", "cuci", "haze", "mould", "smell", "odor", "cleaning")):
        prefs.append("chemical-wash")
    if any(k in s for k in ("gas", "r32", "r410", "r22", "refrigerant")):
        prefs.append("gas")
    if any(k in s for k in ("leak", "leaking", "dripping", "water")):
        prefs.append("leak")
    if any(k in s for k in ("pcb", "error-code", "blinking", "board")):
        prefs.append("pcb")
    if any(k in s for k in ("cassette", "commercial", "office", "shoplot")):
        prefs.append("cassette")
    if any(k in s for k in ("dismantle", "relocation", "relocat", "disposal", "moving")):
        prefs.append("dismantle")
    if any(k in s for k in ("servic", "maintenance", "how-often", "checklist", "calendar", "amc", "contract")):
        prefs.append("servicing")
    if any(k in s for k in ("install", "piping", "bracket", "hp-", "1-hp", "1hp", "bedroom", "condo", "copper", "wiring")):
        prefs.append("installation")
    if any(k in s for k in ("compressor",)):
        prefs.append("compressor")
        prefs.append("compressor-install")
    if any(k in s for k in ("repair", "troubleshoot", "not-cold", "noise", "trip", "surge", "warranty", "fault")):
        prefs.append("repair")
    if not prefs:
        prefs = ["servicing", "repair", "installation"]
    return prefs


blog_sources = (
    [ROOT / "config/blog-posts.ts"]
    + sorted((ROOT / "config").glob("installation-blog-batch*.ts"))
    + sorted((ROOT / "config").glob("new-blog-batch*.ts"))
)

blogs: list[tuple[str, str, str, Path]] = []  # slug, title, old_image, file
for path in blog_sources:
    text = path.read_text()
    for m in re.finditer(r'slug:\s*"([^"]+)"', text):
        chunk = text[m.start() : m.start() + 2500]
        img = re.search(r'image:\s*"([^"]+)"', chunk)
        title = re.search(r'title:\s*"([^"]+)"', chunk)
        if not img:
            continue
        blogs.append((m.group(1), title.group(1) if title else "", img.group(1), path))

print(f"\nBlogs to assign: {len(blogs)}")
blog_new: dict[str, str] = {}
for slug, title, old, path in blogs:
    n = assign(f"blog:{slug}", blog_prefs(slug, title), ["servicing", "repair", "installation", "other"])
    blog_new[slug] = n
    print(f"  BLOG {slug[:52]:52} → {n}")

# ── 3. STATIC PAGES / SECTIONS ─────────────────────────────────────────────
STATIC_PREFS = {
    "page:homepage": ["installation", "repair"],
    "page:about-story": ["installation"],
    "page:about-team-muhammad": ["installation"],
    "page:about-team-shahzaib": ["installation", "compressor-install"],
    "page:about-team-mudassar": ["chemical-wash"],
    "page:about-team-hamzah": ["chemical-wash", "overhaul"],
    "page:contact": ["repair", "pcb"],
    "page:faq": ["gas", "servicing"],
    "page:services-index": ["servicing"],
    "page:problems-index": ["repair"],
}
for key, prefs in STATIC_PREFS.items():
    n = assign(key, prefs)
    print(f"  STATIC {key:32} → {n}")

# ── 4. PROBLEMS ────────────────────────────────────────────────────────────
PROBLEM_PREFS = {
    "aircond-not-cold": ["repair", "gas"],
    "aircond-water-leaking": ["leak", "overhaul"],
    "aircond-making-noise": ["repair", "compressor"],
    "aircond-bad-smell": ["chemical-wash", "overhaul"],
    "aircond-freezing-up": ["gas", "overhaul"],
    "aircond-low-gas": ["gas"],
    "aircond-gas-leak": ["gas", "leak"],
    "aircond-compressor-problem": ["compressor", "compressor-install"],
    "aircond-pcb-problem": ["pcb"],
    "aircond-fan-not-working": ["repair"],
    "aircond-tripping-power": ["pcb", "repair"],
    "aircond-remote-not-working": ["repair", "pcb"],
    "aircond-indoor-unit-leaking": ["leak", "overhaul"],
    "aircond-outdoor-unit-not-running": ["compressor", "repair"],
    "aircond-high-electricity-bill": ["servicing", "chemical-wash"],
    "aircond-weak-airflow": ["chemical-wash", "servicing"],
    "aircond-not-turning-on": ["pcb", "repair"],
    "aircond-blinking-light": ["pcb", "repair"],
    "aircond-water-dripping": ["leak", "overhaul"],
    "aircond-thermostat-problems": ["repair", "pcb"],
}
print("\nProblems:")
for slug, prefs in PROBLEM_PREFS.items():
    n = assign(f"problem:{slug}", prefs)
    print(f"  PROBLEM {slug:36} → {n}")

# ── 5. AREAS (as many unique as remaining) ─────────────────────────────────
areas_text = (ROOT / "config/site/areas.ts").read_text()
area_slugs = []
for m in re.finditer(r'\n    \{\n      slug: "([^"]+)"', areas_text):
    area_slugs.append(m.group(1))
if not area_slugs:
    # fallback
    area_slugs = re.findall(r'slug: "([a-z0-9-]+)"', areas_text)
    # de-dupe preserving order
    seen = set()
    area_slugs = [s for s in area_slugs if not (s in seen or seen.add(s))]

print(f"\nAreas found: {len(area_slugs)}")
area_new: dict[str, str | None] = {}
for slug in area_slugs:
    n = assign(f"area:{slug}", ["installation", "servicing", "chemical-wash", "repair", "other"])
    area_new[slug] = n
    print(f"  AREA {slug:36} → {n}")

# ── 6. BRANDS (heroes only, leftover) ──────────────────────────────────────
brands_text = (ROOT / "config/site/brands.ts").read_text()
brand_slugs = []
for m in re.finditer(r'\n    \{\n      slug: "([^"]+)"', brands_text):
    brand_slugs.append(m.group(1))
print(f"\nBrands found: {len(brand_slugs)}")
brand_new: dict[str, str | None] = {}
for slug in brand_slugs:
    n = assign(f"brand:{slug}", ["installation", "servicing", "repair", "other"])
    brand_new[slug] = n
    print(f"  BRAND {slug:36} → {n}")

# leftover unused
unused = [n for n in ALL_IMAGES if n not in used]
print(f"\nAssigned: {len(used)}  Unused leftover: {len(unused)}")
for n in unused:
    print(f"  UNUSED {n}")

# ── APPLY REPLACEMENTS ─────────────────────────────────────────────────────

def replace_field_after_slug(path: Path, slug: str, field: str, new_value: str) -> bool:
    """Replace the first `field: "..."` that appears after `slug: "slug"`."""
    text = path.read_text()
    # find slug occurrence that starts an object
    pattern = re.compile(rf'(slug:\s*"{re.escape(slug)}")(?P<body>.*?{field}:\s*")([^"]+)(")', re.S)
    m = pattern.search(text)
    if not m:
        return False
    start, end = m.start(3), m.end(3)
    new_text = text[:start] + new_value + text[end:]
    path.write_text(new_text)
    return True


def replace_all_field_values_for_slugs(path: Path, field: str, mapping: dict[str, str]) -> int:
    text = path.read_text()
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        slug = m.group("slug")
        if slug not in mapping:
            return m.group(0)
        count += 1
        return f'{m.group("pre")}{mapping[slug]}{m.group("post")}'

    # non-greedy from slug to the field
    rx = re.compile(
        rf'(?P<pre>slug:\s*"(?P<slug>[^"]+)"(?:.|\n){{0,4000}}?{field}:\s*")(?P<old>[^"]+)(?P<post>")'
    )
    new_text, n = rx.subn(repl, text)
    if n:
        path.write_text(new_text)
    return count


# Blogs
blog_by_file: dict[Path, dict[str, str]] = defaultdict(dict)
for slug, title, old, path in blogs:
    name = blog_new[slug]
    if name:
        blog_by_file[path][slug] = path_of(name)

for path, mapping in blog_by_file.items():
    n = replace_all_field_values_for_slugs(path, "image", mapping)
    print(f"Updated {path.name}: {n} blog images")

# Services-data hero + og
svc_map = {slug: path_of(assignments[f"service:{slug}"]) for slug in SERVICE_PREFS if f"service:{slug}" in assignments}
svc_path = ROOT / "config/services-data.ts"
n1 = replace_all_field_values_for_slugs(svc_path, "heroImage", svc_map)
n2 = replace_all_field_values_for_slugs(svc_path, "ogImage", svc_map)
print(f"Updated services-data.ts hero={n1} og={n2}")

# service-og-images.ts — keyed by slug not slug field
og_path = ROOT / "config/service-og-images.ts"
og_text = og_path.read_text()
for slug, pth in svc_map.items():
    og_text = re.sub(
        rf'("{re.escape(slug)}":\s*\{{[^}}]*?url:\s*")[^"]+(")',
        rf"\g<1>{pth}\g<2>",
        og_text,
        count=1,
        flags=re.S,
    )
# emergency / maintenance already in SERVICE_PREFS
# _default → leftover or homepage
default_img = path_of(assignments.get("page:homepage", next(iter(unused), ALL_IMAGES[0])))
og_text = re.sub(
    r'(_default:\s*\{[^}]*?url:\s*")[^"]+(")',
    rf"\g<1>{default_img}\g<2>",
    og_text,
    count=1,
    flags=re.S,
)
og_path.write_text(og_text)
print("Updated service-og-images.ts")

# Areas
area_map = {s: path_of(n) for s, n in area_new.items() if n}
n = replace_all_field_values_for_slugs(ROOT / "config/site/areas.ts", "heroImage", area_map)
print(f"Updated areas.ts: {n}")
# blank remaining areas that didn't get a unique image
areas_t = (ROOT / "config/site/areas.ts").read_text()
for slug, n in area_new.items():
    if n:
        continue
    areas_t = re.sub(
        rf'(slug:\s*"{re.escape(slug)}"(?:.|\n){{0,2500}}?heroImage:\s*")[^"]+(")',
        r"\g<1>\g<2>",
        areas_t,
        count=1,
    )
(ROOT / "config/site/areas.ts").write_text(areas_t)

# Problems
prob_map = {s: path_of(assignments[f"problem:{s}"]) for s in PROBLEM_PREFS if f"problem:{s}" in assignments}
n = replace_all_field_values_for_slugs(ROOT / "config/site/problems.ts", "heroImage", prob_map)
print(f"Updated problems.ts: {n}")

# Brands — unique hero if assigned, else blank; always clear galleryImages to stop reuse
brands_t = (ROOT / "config/site/brands.ts").read_text()
for slug, n in brand_new.items():
    new_hero = path_of(n) if n else ""
    brands_t, c = re.subn(
        rf'(slug:\s*"{re.escape(slug)}"(?:.|\n){{0,2500}}?heroImage:\s*")[^"]*(")',
        rf"\g<1>{new_hero}\g<2>",
        brands_t,
        count=1,
    )
# Clear every galleryImages array so brand pages don't re-use photos assigned elsewhere
brands_t = re.sub(
    r"galleryImages:\s*\[[^\]]*\]",
    "galleryImages: []",
    brands_t,
)
(ROOT / "config/site/brands.ts").write_text(brands_t)
print("Updated brands.ts heroes + cleared galleries")

# ── write assignment map ───────────────────────────────────────────────────
report = {
    "total_gallery_photos": len(ALL_IMAGES),
    "assigned": len(used),
    "unused": unused,
    "assignments": {k: f"/hero/{v}" for k, v in assignments.items()},
    "missing": {
        "areas_without_unique_image": [s for s, n in area_new.items() if not n],
        "brands_without_unique_image": [s for s, n in brand_new.items() if not n],
    },
}
(ROOT / "docs/image-assignment-map.json").write_text(json.dumps(report, indent=2))
print(f"\nWrote docs/image-assignment-map.json ({len(assignments)} assignments)")
