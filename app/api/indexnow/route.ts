import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trigger = searchParams.get("trigger");
  
  if (trigger !== "auto" && trigger !== "manual") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // We send a ping to IndexNow (which notifies Bing, Yahoo, Yandex, etc.)
    const host = "www.klrenovator.com";
    // We will create this key file in the public folder so Search Engines can verify it
    const key = "e7492c813de342fca1deeb6b05df8445"; 
    const keyLocation = `https://www.${host}/${key}.txt`;

    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
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
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to send IndexNow ping", details: error.message }, { status: 500 });
  }
}
