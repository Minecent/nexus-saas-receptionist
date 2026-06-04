import { MetadataRoute } from "next";

const siteUrl = "https://nexus-saas-receptionist.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = [
    "nexus-vs-ruby-receptionists",
    "nexus-vs-smith-ai",
    "nexus-vs-answerconnect",
    "nexus-vs-davinci-virtual",
    "nexus-vs-patlive",
    "nexus-vs-abby-connect",
  ];

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-05-26"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/login`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/signup`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
