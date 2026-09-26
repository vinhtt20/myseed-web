import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/articles";
import { SEEDS } from "@/data/seeds";

export const dynamic = "force-static";

const BASE = "https://vinhtt20.github.io/myseed-web";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/gioi-thieu", "/vuon-uom", "/gui-hat-giong", "/tin-tuc", "/lien-he"].map((p) => ({
    url: `${BASE}${p}`,
  }));
  return [
    ...pages,
    ...SEEDS.map((s) => ({ url: `${BASE}/vuon-uom/${s.slug}`, lastModified: s.createdAt })),
    ...ARTICLES.map((a) => ({ url: `${BASE}/tin-tuc/${a.slug}`, lastModified: a.publishedAt })),
  ];
}
