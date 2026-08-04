import { NextResponse } from "next/server";
import { hit, clientIp } from "@/lib/rate-limit";
import sitemap from "@/app/sitemap";

export const dynamic = "force-dynamic";

const HOST = "www.klrenovator.com";
const BASE = `https://${HOST}`;

// Build the full URL list from the single source of truth — the sitemap.
// The old handler hardcoded only 5 URLs (/, /book, /ms, /zh, /blog), which
// is why Bing Webmaster Tools' "IndexNow submitted URLs" report never showed
// more than 5 URLs no matter how many times the endpoint was triggered.
// Every canonical sitemap entry plus its hreflang language alternates are
// included (deduped), so all ~hundreds of indexable pages across EN/MS/ZH
// get submitted. IndexNow accepts up to 10,000 URLs per POST; we are far
// below that, so a single request is enough.
function buildUrlList(): string[] {
  const seen = new Set<string>();
  for (const entry of sitemap()) {
    if (entry.url.startsWith(BASE)) seen.add(entry.url);
    const languages = entry.alternates?.languages as
      | Record<string, string>
      | undefined;
    if (languages) {
      for (const langUrl of Object.values(languages)) {
        if (typeof langUrl === "string" && langUrl.startsWith(BASE)) {
          seen.add(langUrl);
        }
      }
    }
  }
  return Array.from(seen);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // `trigger=auto|manual` is not authentication: it is guessable and was
  // historically visible in source. This operational endpoint fails closed
  // until a deployment configures its secret.
  const expected = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!expected) {
    console.error("IndexNow trigger attempted without INDEXNOW_TRIGGER_SECRET configured.");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  if (searchParams.get("key") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await hit(`indexnow:${clientIp(req)}`, 3, 60 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  try {
    // We send a ping to IndexNow (which notifies Bing, Yahoo, Yandex, etc.)
    const key = "e7492c813de342fca1deeb6b05df8445";
    // `host` already includes the www. — the old template added a second one
    // and produced https://www.www.klrenovator.com/<key>.txt, which does not
    // resolve. It is now also actually sent in the payload; previously it was
    // computed and thrown away, so IndexNow fell back to guessing the key
    // location and rejected the submission when the guess missed.
    const keyLocation = `${BASE}/${key}.txt`;
    const urlList = buildUrlList();

    const payload = {
      host: HOST,
      key: key,
      keyLocation,
      urlList,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: "IndexNow Ping Sent to Bing/Yahoo!",
        submitted: urlList.length,
      });
    } else {
      return NextResponse.json({ success: false, error: await response.text() });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send IndexNow ping", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
