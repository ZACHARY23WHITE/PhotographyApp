import type { NextConfig } from "next";

// Two build targets share this config:
//  • Capacitor (App Store / Play Store): `BUILD_TARGET=capacitor next build`
//    → static export (`out/`) so the whole app bundles into a native shell.
//  • Firebase App Hosting (the live web URL): plain `next build` → normal
//    server build. A static export has no server for App Hosting to run, so
//    `output: "export"` must NOT be set for the hosted deploy.
const isCapacitorBuild = process.env.BUILD_TARGET === "capacitor";

const nextConfig: NextConfig = {
  ...(isCapacitorBuild ? { output: "export" as const } : {}),

  // No server-side image optimizer in the static bundle, so serve images
  // as-authored. All our images are local, so this is lossless either way.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
