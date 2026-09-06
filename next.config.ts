import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the whole app can be bundled into a native shell
  // (Capacitor → App Store / Play Store) and served offline. See AGENTS.md.
  output: "export",

  // No server-side image optimizer exists in a static bundle, so serve images
  // as-authored. All our images are local PNGs/SVGs, so this is lossless.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
