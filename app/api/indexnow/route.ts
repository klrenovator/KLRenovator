import { NextResponse } from "next/server";
import { hit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trigger = searchParams.get("trigger");

  // The old `?trigger=auto|manual` check was not authentication — the value
  // is guessable and was visible in this file. Require a shared secret when
  // one is configured, and rate limit regardless so this can't be used to
  // spam IndexNow from our domain.
  const expected = process.env.INDEXNOW_TRIGGER_SECRET;
  if (expected) {
    if (searchParams.get("key") !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (trigger !== "auto" && trigger !== "manual") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = hit(`indexnow:${clientIp(req)}`, 3, 60 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  try {
    // We send a ping to IndexNow (which notifies Bing, Yahoo, Yandex, etc.)
    const host = "www.klrenovator.com";
    // We will create this key file in the public folder so Search Engines can verify it
    const key = "e7492c813de342fca1deeb6b05df8445";
    // `host` already includes the www. — the old template added a second one
    // and produced https://www.www.klrenovator.com/<key>.txt, which does not
    // resolve. It is now also actually sent in the payload; previously it was
    // computed and thrown away, so IndexNow fell back to guessing the key
    // location and rejected the submission when the guess missed.
    const keyLocation = `https://${host}/${key}.txt`;

    const payload = {
      host: host,
      key: key,
      keyLocation,
      urlList: [
        `https://${host}/`,
        `https://${host}/book`,
        `https://${host}/ms`,
        `https://${host}/zh`,
        `https://${host}/blog`
      ]
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({ success: true, message: "IndexNow Ping Sent to Bing/Yahoo!" });
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
