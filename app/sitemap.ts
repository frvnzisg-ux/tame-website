import type { MetadataRoute } from "next";

const baseUrl = "https://www.tamelife.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/signup", "/contact", "/privacy", "/terms", "/security", "/blog"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
