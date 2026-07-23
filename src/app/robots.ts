import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/", "/editor/"],
      },
      { userAgent: "Googlebot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/", "/editor/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/", "/editor/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/", "/editor/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/dashboard/", "/api/", "/auth/", "/my-revision/", "/editor/"] },
    ],
    sitemap: "https://gcserevise.co.uk/sitemap.xml",
  };
}
