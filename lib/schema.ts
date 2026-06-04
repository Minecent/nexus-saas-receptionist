const siteUrl = "https://nexus-saas-receptionist.vercel.app";

export function blogPostingSchema({
  headline,
  description,
  slug,
  keywords,
}: {
  headline: string;
  description: string;
  slug: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "url": `${siteUrl}/blog/${slug}`,
    "datePublished": "2026-04-01",
    "dateModified": "2026-04-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEXUS AI",
      "url": siteUrl,
    },
    "author": {
      "@type": "Organization",
      "name": "NEXUS AI",
      "url": siteUrl,
    },
    "articleSection": "Comparison",
    "keywords": keywords,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2"],
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
        { "@type": "ListItem", "position": 3, "name": headline, "item": `${siteUrl}/blog/${slug}` },
      ],
    },
  };
}
