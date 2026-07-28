# Google Search Console — Audit & Fixes

**Branch:** `arena/019fa7f0-klrenovator` · **Date:** 28 July 2026
**Status:** Lint ✅ · Typecheck ✅ · Build ✅ 2,104 pages · `verify:build` ✅ · `audit:gsc` ✅ **0 errors, 0 warnings**

Aapke paas GSC ka export attach nahi tha, is liye maine **build ka asli
rendered HTML** (2,104 pages) parse karke wo sab checks chalaye jo Google
"Page indexing" report mein report karta hai. Naya script:
`scripts/gsc-audit.mjs` → `npm run audit:gsc`.

**Result: 273 errors + 8 warnings fix ho gaye. Phir aapke GSC screenshot
se pata chala ke 551 not-indexed ka asli sabab alag tha — duplicate
content — wo bhi ab fix hai.**

| | Pehle | Ab |
|---|---|---|
| Indexing-blocking errors | **273** | **0** |
| Sitemap URLs | 1,733 | **2,099** |
| Pages Google ko "mat index karo" bola ja raha tha | **249** | **0** |
| Internal links jo 404 pe jaate the | **24** | **0** |
| Duplicate title / description | **8** | **0** |
| Brand-area pages identical to each other | **98.9%** | **82.1%** |
| Area-install pages identical | **93.4%** | **81.4%** |

---

## 🔴 1. 249 pages khud ko de-index karwa rahe the (sab se bara issue)

`lib/hreflang-canonical.ts` ke do helpers — `buildTrilingualHreflang()` aur
`normalizeHreflangUrls()` — **canonical hamesha ENGLISH URL pe hard-code**
kar rahe the, chahe page MS ka ho ya ZH ka.

Matlab har `/ms/*` aur `/zh/*` page Google ko keh raha tha:
> "mera asli version English page hai, mujhe index mat karo"

GSC mein ye aise dikhta hai:
- **"Alternate page with proper canonical tag"** → excluded, kabhi index nahi hoga
- **"Duplicate, Google chose a different canonical than user"**

Sath hi hreflang bhi silently toot raha tha — Google demand karta hai ke
canonical aur self-referencing hreflang aapas mein agree karein; jab
disagree karein to poora language cluster discard ho jata hai.

**Kitne pages affected the:**

| Route family | Pages |
|---|---|
| `/ms/brands/[brand]/[area]` | 121 |
| `/zh/brands/[brand]/[area]` | 121 |
| `/ms/brands`, `/ms/btu-calculator`, `/ms/installation`, `/ms/problems` | 4 |
| `/zh/brands`, `/zh/btu-calculator`, `/zh/installation`, `/zh/problems` | 4 |
| **Total** | **250** |

**Fix:** dono helpers ab `locale` parameter lete hain aur us locale ka apna
URL canonical banate hain. `x-default` English pe hi rehta hai — wo sahi
hai, x-default fallback hota hai canonical nahi.

```ts
buildTrilingualHreflang("/brands")        // canonical → /brands
buildTrilingualHreflang("/brands", "ms")  // canonical → /ms/brands   ✅
```

Verify (asli build output se):
```
/ms/brands/daikin/petaling-jaya → canonical https://www.klrenovator.com/ms/brands/daikin/petaling-jaya ✅
/zh/brands                      → canonical https://www.klrenovator.com/zh/brands ✅
```

---

## 🔴 2. `/book` homepage ka duplicate ban raha tha

`app/book/page.tsx` mein `alternates` tha hi nahi, to root layout ka
canonical inherit ho gaya — jo homepage (`https://www.klrenovator.com`) pe
point karta hai. Sitemap mein `/book` submitted tha, lekin khud ko homepage
ka duplicate declare kar raha tha → **kabhi index nahi hota**.

Fix: apna self-canonical + proper OG tags.

---

## 🔴 3. 24 internal links 404 pe ja rahe the

| Kitne | Link | Masla | Fix |
|---|---|---|---|
| 20 | `/ms/brands/{brand}/pemasangan` | Malay pillar page 20 brand cards link kar raha tha, lekin route `/installation` hai — `/pemasangan` exist hi nahi karta | `/installation` |
| 4 | `/best-hp-aircond-bedroom-size-guide-malaysia` etc. | Blog body mein `/blog/` prefix reh gaya tha (3-3 baar EN/MS/ZH mein) | `/blog/...` |

Ye GSC mein **"Not found (404)"** deta hai, crawl budget waste karta hai,
aur target pages ka PageRank rok deta hai. Ab poore `config/` folder mein
scan kiya — koi bare blog-slug link nahi bacha.

---

## 🟠 4. 366 indexable pages sitemap mein the hi nahi

| Pages | Kya |
|---|---|
| 360 | `/brands/[brand]/[area]` + `/ms` + `/zh` twins (120 per locale) |
| 2 | `/ms` aur `/zh` **homepages** — site ke 2 sab se valuable localized entry points |
| 4 | `/ms/areas`, `/zh/areas`, `/ms/brands`, `/zh/brands` |

Ye sab real, prerendered, indexable pages hain — bas Google ko submit hi
nahi ho rahe the. GSC mein **"Discovered — currently not indexed"**.

**Root cause:** `PRIORITY_AREAS_BY_BRAND` map 3 route files mein
copy-paste tha aur sitemap uska koi reference hi nahi rakhta tha.

**Fix:** naya `config/brand-area-priority.ts` — single source of truth.
Ab teeno route files ka `generateStaticParams()` aur `app/sitemap.ts`
dono wahin se derive karte hain, to dobara drift ho hi nahi sakta. Helper
sirf wahi (brand, area) pair deta hai jiska area `siteConfig.areaPages`
mein actually maujood ho — warna sitemap mein 404 chala jata.

Sitemap: **1,733 → 2,099 URLs**, sab resolve karte hain ✅

---

## 🟠 5. Baaki chhoti cheezein

| Issue | Fix |
|---|---|
| `/ms/btu-calculator`, `/zh/btu-calculator`, `/ms/review`, `/zh/review` pe `og:locale` = `en_MY` | Sahi locale set kiya — WhatsApp/Facebook previews galat language announce kar rahe the |
| `/cuci-aircond-kl` (English page) pe Malay meta description — `/ms/` twin se bilkul same | Real English description likhi |
| `/blog/harga-servis-aircond-2026-malaysia` — English body pe Malay title, MS twin se identical | English title diya |
| IndexNow: `https://www.www.klrenovator.com/...` (double www) aur `keyLocation` compute hoke discard ho raha tha | Fix + payload mein actually bheja |
| `robots.txt` mein `site-summary.json` line 2 baar | Dedupe |
| `public/site-summary.json` "10+ years" jabke baaki site "12+ years" | 12+ kiya (schema `foundingDate: 2014` ke mutabiq) |
| `app/zh/commercial-aircond-installation/page tsx` — 1-byte stray file | Delete |

---

## 🟢 6. Chaar blog posts — English URL pe Malay content

In 4 posts ka `title`, `excerpt` aur poora `content` **Malay mein tha,
jabke ye English route `/blog/<slug>` pe serve ho rahe the** — aur
`/ms/blog/<slug>` twin bilkul same bytes de raha tha. Do URLs, ek hi
content, aapas mein compete kar rahe the.

Ab teeno languages alag hain — baaki blogs jaisa:

| URL | Pehle | Ab |
|---|---|---|
| `/blog/harga-servis-aircond-2026-malaysia` | Malay title, English body | "Aircond Service Price Malaysia 2026 — Full Price Guide" |
| `/blog/cara-pilih-hp-aircond-bilik-malaysia` | Poora Malay | "What HP Aircond Do I Need? Room Size Guide Malaysia" |
| `/blog/baiki-vs-tukar-baru-aircond-malaysia` | Poora Malay | "Aircond Repair or Replace? Malaysia Cost Guide 2026" |
| `/blog/servis-aircond-rumah-sewa-airbnb-malaysia` | Poora Malay | "Rental & Airbnb Aircond Servicing Guide Malaysia" |

**Zaroori:** sirf English fields (`title`, `excerpt`, `content`) badle hain.
`titleMS` / `excerptMS` / `contentMS` aur saare ZH fields **bilkul waise ke
waise hain** — Malay aur Chinese pages pe koi farq nahi.

Naya English content baaki EN posts ka hi format follow karta hai:
`<h2>` structure, `summary-block` "Direct answer" boxes (AEO/featured
snippet ke liye), comparison tables, aur English internal links
(`/services/repair`, `/btu-calculator`, `/aircond-service-price-malaysia`
— sab verify kiye, koi 404 nahi).

Saari pricing site config se match ki hai (AMC RM 299/year, basic RM 99,
chemical wash RM 120–220, installation RM 199) — koi naya number invent
nahi kiya.

English pages ab lambe bhi hain: ~5,700 → ~7,700 characters.

---

## 🔴 7. Duplicate content — 551 "not indexed" ki ASLI wajah

Aapke screenshot mein **551 not indexed** dikh raha tha. Maine reconcile
kiya: GSC ka total **1,186 + 551 = 1,737** hai, jo purane sitemap ke
**1,733 URLs** se match karta hai. Matlab 551 wo pages hain jo sitemap
mein the lekin Google ne index karne se **mana kar diya** — ye canonical
ya 404 ka masla nahi tha (wo alag se fix ho chuka), ye **content ka**
masla tha.

Maine build output pe similarity measure ki (Jaccard, 4+ character tokens):

| Page family | Pehle | Ab |
|---|---|---|
| Brand × Area (360 pages) | **98.9% identical** | **82.1%** |
| `daikin/petaling-jaya` vs `daikin/mont-kiara` | **98.0%** | **75.2%** |
| Area installation (120 pages) | **93.4%** | **81.4%** |

**98.9% identical** ka matlab hai sirf area ka naam badal raha tha — baaki
har sentence, heading, pricing table sab byte-for-byte same. Google isko
"Duplicate without user-selected canonical" / "Crawled — currently not
indexed" mein daal deta hai. **Ye 551 ka sab se bada hissa hai.**

### Kya kiya

**Naya `config/brand-area-uniqueness.ts`** — har (brand, area) pair ke liye
genuinely alag content generate karta hai, wo bhi data se jo **pehle se
`config/site.ts` mein mojood tha lekin use hi nahi ho raha tha**:
`landmarks`, `population`, `state`.

Har page pe ab:
- **Area-specific intro** — asli landmarks cite karta hai (PJ ke liye SS2,
  Damansara Utama; Cheras ke liye Taman Connaught, Batu 9)
- **"Local Conditions" section** — us area ki asli baat (service-lift
  permits, dust load, bracket corrosion, wiring age)
- **4 area-aware FAQs + FAQPage schema** — pehle in pages pe FAQ tha hi nahi

Text spun nahi hai — 4 alag-alag variants hain, har ek factually accurate,
aur ek stable hash se select hote hain (same page hamesha same text, build
pe change nahi hota).

**Area-installation pages** ka `getWhyItems()` bilkul fixed 4 cards return
kar raha tha. Ab 4 alag card sets hain, wahi deterministic `pick()` helper
use karke jo file mein pehle se tha.

Pages lambe bhi ho gaye: **3,339 → 5,059 characters**.

> ⚠️ Ye ek content-quality fix hai, koi switch nahi. Google ko in 551 pages
> ko dobara crawl karke re-evaluate karna hoga — **4–8 hafte** lagenge.
> Sab 551 index nahi honge (kuch waqai low-value hain), lekin bara hissa
> aana chahiye.

---

## 🟡 8. 36 invalid review snippets

Screenshot mein **Review snippets: 87 valid, 36 invalid** tha.

Wajah: `app/layout.tsx` har page pe `HVACBusiness` schema mein
`aggregateRating` (5★, 500 reviews) daal raha hai — **2,104 pages pe**.

Google ki policy (Sept 2019, Dec 2025 mein dobara confirm): agar entity
apne hi reviews apni website pe markup kare to wo **"self-serving"** hai,
aur `LocalBusiness` / `Organization` (aur unke subtypes — `HVACBusiness`
bhi) ke liye review rich results **allowed nahi**.

Is liye kuch pages "valid" aa rahe hain, kuch "invalid" — Google
inconsistently flag kar raha hai kyunke markup technically valid hai lekin
policy ke against.

**Maine ye jaan bujh ke NAHI hataya** — ye aapka business decision hai:

| Option | Asar |
|---|---|
| **A. `aggregateRating` hata dein** | 36 invalid turant 0 ho jayenge. Stars waise bhi nahi dikh rahe the (policy ki wajah se), to search mein koi nuqsan nahi. AI Overviews rating data thoda kam dekh payenge. |
| **B. Rehne dein** | 36 invalid GSC mein dikhte rahenge. Ye **ranking ko nuqsan nahi deta** — sirf "ye rich result nahi milega" ka matlab hai. |

Batayein to A kar deta hoon — 2 minute ka kaam hai.

---

## 🟡 9. Videos: "4 no videos indexed"

Screenshot mein video section tha. Maine check kiya — site pe **koi
`<video>` tag, koi iframe, koi VideoObject schema nahi hai**. Sirf footer
mein YouTube channel ka link hai (264 pages pe).

Google ne wo YouTube links dekhe aur video expect kiya, mila nahi. **Ye
koi error nahi hai** — ignore kar sakte hain. Agar future mein site pe
asli video embed karein tab `VideoObject` schema add karna hoga.

---

## 🛡️ Ab ye dobara nahi ho sakta

`scripts/gsc-audit.mjs` ban gaya hai — `npm run audit:gsc`.
Ye fail karega agar:

- kisi page ka canonical kahin aur point kare
- sitemap mein koi noindex URL ho
- koi internal link 404 pe jaye
- hreflang cluster mein return tag missing ho, ya target exist na kare
- sitemap mein aisa URL ho jiska page build hi na hua ho
- duplicate title/description (warning)

Local: `npm run build && npm run audit:gsc`

> ⚠️ CI mein add karne ke liye ek manual step hai — GitHub App ke paas
> `workflows` permission nahi hai, is liye `.github/workflows/ci.yml` push
> reject ho gaya. Steps `ci/README.md` mein likh diye hain (neeche point 3).

---

## ⚠️ Aapke Karne Ke Kaam

### 1. Deploy ke baad GSC mein sitemap resubmit karein

Sitemap 1,733 → 2,099 URLs ho gaya hai aur 249 pages ab pehli baar
indexable hue hain.

1. Search Console → **Sitemaps** → `sitemap.xml` resubmit
2. **URL Inspection** se ye 3 spot-check karein → "Request Indexing":
   - `https://www.klrenovator.com/ms`
   - `https://www.klrenovator.com/zh`
   - `https://www.klrenovator.com/book`
3. 2–3 hafte baad **Page indexing** report dekhein — "Alternate page with
   proper canonical tag" bucket **249 se ghat kar lagbhag 0** hona chahiye.

> Ye pages mahine se excluded the, is liye Google ko recrawl karne mein
> waqt lagega. Ek hi din mein sab index nahi hoga — normal hai.

### 2. CI mein audit step add karein (1 minute)

GitHub App ke paas `workflows` permission nahi hai, is liye ye main push
nahi kar saka. `.github/workflows/ci.yml` mein `Verify build output` ke
turant baad ye add kar dein:

```yaml
      - name: Search Console audit
        run: npm run audit:gsc
```

Poori detail `ci/README.md` mein hai. Iske bagair bhi sab fixes kaam kar
rahe hain — ye sirf future regressions rokne ke liye hai.

### 3. (Pehle wale audit se pending) Env vars

Agar abhi tak set nahi kiye to Vercel → Settings → Environment Variables:
```bash
ADMIN_PASSWORD=<naya strong password>
ADMIN_SESSION_SECRET=<openssl rand -hex 32>
```
Inke bagair `/admin/bookings` pe login nahi hoga (jaan bujh ke fail-closed).

### 4. Optional — 172 meta descriptions 160 chars se lambe

Google inko truncate karega. Blocking nahi hai, click-through thoda
affect hota hai. Bolen to `clampMetaDescription()` ka threshold tight
karke bulk fix kar sakta hoon.

---

## Verification

```
✓ npm run lint        — clean
✓ npm run typecheck   — clean
✓ npm run build       — 2,104 pages
✓ npm run verify:build
      sitemap: 2099 URLs, all resolve ✓
      h1 coverage: 2104/2104
✓ npm run audit:gsc
      ✓ No indexing-blocking errors found
      0 warnings
```
