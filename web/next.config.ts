import type { NextConfig } from "next";

// GitHub Pages serves the site from https://vinhtt20.github.io/myseed-web/,
// so the Pages build (GITHUB_PAGES=true) exports static HTML under that sub-path.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isPages ? "/myseed-web" : undefined,
  images: {
    // Pages has no image-optimization server.
    unoptimized: true,
    // Placeholder photography until real project photos arrive (docs Q7).
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
