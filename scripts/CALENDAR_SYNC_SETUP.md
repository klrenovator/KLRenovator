# Calendar → Sheet Auto-Sync — Setup Guide (5 minutes, FREE)

Google Calendar mein jo bhi booking aaye — **WhatsApp Business**, **staff manual entry**, ya **website booking** — woh **automatically** Google Sheet (Bookings Log tab) mein save ho jati hai. Reschedule ho to row update, event delete ho to row "Removed from calendar" mark hoti hai.

Koi third-party service nahi — sab aapke Google account ke andar (Apps Script). **Cost: zero. PDPA-safe** (data Google se bahar nahi jata).

---

## Setup steps

1. **Tracker sheet kholein:** [KL Renovator — Audit Remediation Tracker 2026-10](https://docs.google.com/spreadsheets/d/19qok6A6itJIgeSPzxtJZyYrjn74-fmQf7ZoIja3gku0/edit)
2. **Extensions → Apps Script** kholen.
3. `Code.gs` ka poora content delete karke **`scripts/calendar-sheet-sync.gs`** ka code paste karein → 💾 Save.
4. Upar function list mein **`setup`** select karein → **▶ Run**. 
   - Pehli baar **authorization** maangega: Review permissions → apna Google account (klrenovator62) → "Advanced" → "Go to project (unsafe)" → **Allow**. (Yeh Apps Script ka standard flow hai — code aapke liye likha gaya hai, kuch bahar nahi bhejta.)
5. **Triggers** (left sidebar ⏰) → **+ Add Trigger**:
   - Function: **`syncBookings`**
   - Event source: **Time-driven**
   - Type: **Minutes timer** → **Every 10 minutes** (5 min bhi chalega)
   - Save
6. Bas! Pehli sync turant chalegi, uske baad har 10 minute.

## Verify

Sheet mein **Bookings Log** tab check karein — calendar ke events rows mein dikhne chahiye (Sync Key, date, time, customer title, phone, address, details).

## Calendar ID kab badalna hai?

Default `CALENDAR_ID: 'primary'` = us Google account ka main calendar jisne script chalai. Agar WhatsApp Business / website bookings **kisi shared/aur calendar** par jaati hain to:
- Google Calendar → ⚙ Settings → **Integrate calendar** → Calendar ID copy karein
- Script mein `CALENDAR_ID` ki value paste karein → Save
- (Us calendar ko script wale account se **Make changes** access share hona chahiye — usually same account hota hai to zaroorat nahi.)

## Notes

- **Phone column** title/description se best-effort nikalta hai (Malaysia number format). Customer ka number event ke title/description mein likhna best practice hai — jaise "Ahmad 012-345 6789 — Cuci aircond 2 unit".
- **Recurring events** ke har instance ki apni row banti hai (safe keying).
- **Cancellations:** event calendar se delete karein → agli sync (≤10 min) row par "Removed from calendar" aa jayega. Event title mein "CANCELLED" likhne se status "Cancelled" ho jata hai.
- **PDPA:** Sheet mein customer phone/address aate hain — sheet ko private rakhein (abhi private hai), zaroorat se zyada logon ko share na karein.
- Sync window: pichhle 7 din se agle 180 din tak ke events. Purane events history mein rehte hain, sirf scan nahi hote.
