import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** サイトマップ（検索エンジン向け） */
export default function sitemap(): MetadataRoute.Sitemap {
  // /legal は雛形が埋まるまで noindex のためサイトマップには含めません
  const routes = ["", "/about", "/works", "/order", "/contact"];
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
