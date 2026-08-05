export const links = {
    whatsapp: "https://wa.me/60182983573",
    facebook: "https://www.facebook.com/share/1DDDB3523A/",
    instagram: "https://www.instagram.com/klrenovator?igsh=MTNqb3p1NDExZ3Boeg==",
    tiktok: "https://www.tiktok.com/@klrenovator?_r=1&_t=ZS-96tR1k7aVU5",
    // youtube: REMOVED 2026-07-28. https://www.youtube.com/@klrenovator returns
    // 404 — the channel does not exist. It was listed in `sameAs` on 264 pages.
    // Google follows sameAs URLs to verify the business entity, and a dead
    // profile weakens that verification. It was also the only thing on the site
    // suggesting video content, which is why the Video indexing report showed
    // "4 no videos indexed" for a site with no <video>, no iframe and no
    // VideoObject markup anywhere.
    // To re-add: create the channel, confirm it loads, then restore the key and
    // add it back to the sameAs arrays in app/layout.tsx,
    // components/about-page-i18n.tsx and app/blog/[slug]/blog-post-client.tsx.
    googleMaps: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
    googleBusiness: "https://share.google/HhXvqWDkefZ5bzNdL",
    twitter: "https://x.com/KlRenovator",
    // yelp: REMOVED 2026-07-28. "kl-renovator-no-title" was a placeholder that
    // was never replaced — it is not a real listing. Same sameAs reasoning.
    linkedin: "https://www.linkedin.com/in/kl-renovator-7912b7389",
  };
