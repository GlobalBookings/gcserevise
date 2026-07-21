export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gcserevise.co.uk/#website",
    name: "GCSERevise",
    url: "https://gcserevise.co.uk",
    description: "Free AQA GCSE revision notes, quizzes, flashcards, guided topic tutoring and progress tracking for six high-demand subjects.",
    inLanguage: "en-GB",
    publisher: { "@id": "https://gcserevise.co.uk/#organization" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://gcserevise.co.uk/#organization",
    name: "GCSERevise",
    url: "https://gcserevise.co.uk",
    description: "Free AQA GCSE topic revision for UK students",
    logo: {
      "@type": "ImageObject",
      url: "https://gcserevise.co.uk/icon.png",
      width: 512,
      height: 512,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LearningResourceJsonLd({
  name,
  description,
  provider,
  url,
}: {
  name: string;
  description: string;
  provider: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    provider: {
      "@type": "EducationalOrganization",
      "@id": "https://gcserevise.co.uk/#organization",
      name: provider,
    },
    url,
    isAccessibleForFree: true,
    educationalLevel: "GCSE",
    learningResourceType: ["Revision notes", "Quiz", "Flashcards"],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    inLanguage: "en-GB",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
