import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/"],
      },
      { userAgent: "Googlebot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/"] },
    ],
    sitemap: "https://gcserevise.co.uk/sitemap.xml",
  };
}
