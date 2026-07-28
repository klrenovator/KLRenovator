# GSC Resubmit + CI — Step by Step (direct links)

Merge karne ke baad, aur Vercel pe deploy complete hone ke baad ye karein.

> ⚠️ **Pehle deploy hone dein.** Agar deploy se pehle resubmit karenge to
> Google purana version hi dekhega aur kuch faida nahi hoga.
> Vercel pe deployment "Ready" dikhne ka intezar karein.

---

## 1️⃣ Sitemap resubmit karein

**Direct link:**
https://search.google.com/search-console/sitemaps?resource_id=sitemap%3Ahttps%3A%2F%2Fwww.klrenovator.com%2F

Agar upar wala link property select na kare, to ye use karein:
https://search.google.com/search-console/sitemaps

**Steps:**

1. Upar left mein property **`https://www.klrenovator.com/`** selected honi
   chahiye — confirm kar lein
2. "Add a new sitemap" box mein type karein: **`sitemap.xml`**
   (poora URL nahi, sirf `sitemap.xml`)
3. **SUBMIT** dabayein
4. Agar `sitemap.xml` pehle se listed hai — us row pe click karein, phir
   upar right ⋮ menu se **"Resubmit"**

**Kya expect karein:** Status "Success", aur "Discovered pages" **1,733 se
badh kar ~2,099** ho jana chahiye. Ye number update hone mein 1–3 din lag
sakte hain — turant nahi badalta.

---

## 2️⃣ Ye 6 URLs manually "Request Indexing" karein

Ye sab se zaroori pages hain jo pehle sitemap mein the hi nahi. Manual
request se Google inhe priority queue mein daal deta hai.

**URL Inspection tool:**
https://search.google.com/search-console/inspect?resource_id=sitemap%3Ahttps%3A%2F%2Fwww.klrenovator.com%2F

**Har URL ke liye ye process:**

1. Upar search bar mein URL paste karein → Enter
2. Google check karega (20–30 second)
3. **"REQUEST INDEXING"** button dabayein
4. ~1 minute wait, phir "Request sent" aayega
5. Agli URL pe jayein

**Ye 6 URLs ek-ek karke:**

```
https://www.klrenovator.com/ms
https://www.klrenovator.com/zh
https://www.klrenovator.com/book
https://www.klrenovator.com/ms/areas
https://www.klrenovator.com/zh/areas
https://www.klrenovator.com/brands/daikin/petaling-jaya
```

> Google ka daily quota hai (~10–12 requests per day per property). Agar
> "Quota exceeded" aaye to kal baaki kar lein — koi nuqsan nahi.

Aakhri wala (`/brands/daikin/petaling-jaya`) is liye hai taake aap
**test kar sakein** ke duplicate-content fix kaam kar raha hai ya nahi —
ye un 360 pages mein se ek hai jo pehle 98.9% identical the.

---

## 3️⃣ Page Indexing report — kya dekhna hai

**Direct link:**
https://search.google.com/search-console/index?resource_id=sitemap%3Ahttps%3A%2F%2Fwww.klrenovator.com%2F

Neeche scroll karke "Why pages aren't indexed" table dekhein. In buckets pe
nazar rakhein:

| Bucket | Abhi | Kab tak theek hoga |
|---|---|---|
| **Alternate page with proper canonical tag** | ~249 | 2–3 hafte → lagbhag 0 |
| **Duplicate without user-selected canonical** | (551 ka hissa) | 4–8 hafte → kaafi kam |
| **Crawled — currently not indexed** | (551 ka hissa) | 4–8 hafte → kaafi kam |
| **Discovered — currently not indexed** | (551 ka hissa) | 2–4 hafte → kam |
| **Not found (404)** | kuch | 1–2 hafte → 0 |

> **Sabar zaroori hai.** 249 canonical wale pages jaldi theek honge kyunke
> wo purely technical fix tha. Lekin 551 duplicate-content wale pages ko
> Google ko **dobara crawl karke content re-evaluate** karna padega — ye
> 4–8 hafte ka kaam hai, aur sab index nahi honge (kuch waqai low-value
> hain). Ye normal hai.

---

## 4️⃣ Review snippets — fix ho gaya, bas dekh lena

**Direct link:**
https://search.google.com/search-console/structured-data/review-snippet?resource_id=sitemap%3Ahttps%3A%2F%2Fwww.klrenovator.com%2F

Maine `aggregateRating` hata diya hai (detail `GSC-AUDIT-REPORT.md` §8).

**Kya expect karein:** 2–4 hafte mein **36 invalid → 0**. Sath hi 87
"valid" bhi report se gayab ho jayenge — ye **theek hai**. Wo stars Google
ki policy ki wajah se kabhi render hote hi nahi the; ab markup hi nahi to
report bhi khali. **Ranking pe koi asar nahi.**

Aapki asli 5.0★ / 500 reviews:
- Website pe users ko **waise hi dikhti rahengi** (kuch nahi badla)
- Google tak **Google Business Profile** se pahunchti hain — yehi supported
  raasta hai

---

## 5️⃣ CI mein ye line add karein

Ye main push nahi kar saka kyunke GitHub App ke paas `workflows`
permission nahi hai (GitHub ne push reject kar diya).

**File:** `.github/workflows/ci.yml`

**Direct edit link:**
https://github.com/klrenovator/KLRenovator/edit/main/.github/workflows/ci.yml

> Note: ye link `main` branch pe edit karega. PR merge karne ke **baad**
> karein.

**Kahan add karna hai:** file ke bilkul aakhir mein, `Verify build output`
step ke turant baad. File ka aakhri hissa abhi aisa hai:

```yaml
      - name: Verify build output
        # Guards the regressions this repo has actually had: giant client
        # chunks, sitemap URLs with no page, missing/duplicate <h1>.
        run: npm run verify:build
```

**Iske neeche ye add karein** (indentation exactly aisi hi rakhein — 6
spaces `- name:` se pehle):

```yaml

      - name: Search Console audit
        # Fails on anything Google would report as an indexing error:
        # canonical pointing elsewhere, noindex in sitemap, internal 404s,
        # hreflang without return tags, near-duplicate page families.
        run: npm run audit:gsc
```

**Complete file ka aakhri hissa aise dikhna chahiye:**

```yaml
      - name: Verify build output
        # Guards the regressions this repo has actually had: giant client
        # chunks, sitemap URLs with no page, missing/duplicate <h1>.
        run: npm run verify:build

      - name: Search Console audit
        # Fails on anything Google would report as an indexing error:
        # canonical pointing elsewhere, noindex in sitemap, internal 404s,
        # hreflang without return tags, near-duplicate page families.
        run: npm run audit:gsc
```

Phir neeche **"Commit changes"** dabayein.

---

## ✅ Checklist

- [ ] PR #4 merge karein
- [ ] Vercel deploy "Ready" hone ka intezar karein
- [ ] Sitemap resubmit (step 1)
- [ ] 6 URLs request indexing (step 2)
- [ ] CI line add karein (step 5)
- [ ] 2 hafte baad Page Indexing report check karein
- [ ] 2–4 hafte baad review snippets 0 invalid confirm karein (step 4)

---

## 🎥 YouTube channel (optional, future)

`youtube.com/@klrenovator` **404 tha** — channel exist nahi karta — is liye
maine wo link schema se hata diya (Yelp placeholder aur dead Medium link
bhi). Yehi "4 no videos indexed" ki wajah thi.

Agar aap kabhi channel banayein:
1. Channel bana ke confirm karein ke load hota hai
2. `config/site.ts` ke `links` block mein comment likha hai — `youtube` key
   wapas add karein
3. 3 files ke `sameAs` array mein add karein (comment mein listed hain)

Video **rich results** ke liye us se aage bhi kaam chahiye hoga — Google ko
dedicated "watch page" chahiye jahan video hi main content ho, plus
`VideoObject` schema. Wo alag project hai, tab batayein.
