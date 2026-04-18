"use client";

import { useState } from "react";
import { Snowflake } from "lucide-react";

/**
 * Service hero image with automatic fallback to an
 * on-brand SVG illustration if the remote image fails.
 */
export const ServiceHeroImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-brand-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Snowflake className="h-32 w-32 text-white/80" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-lg font-bold">{alt}</p>
          <p className="text-sm text-white/80">KL Renovator · Aircon Service</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
    />
  );
};
