// SEO optimization utilities for TraceIT

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  [key: string]: any;
}

// Generate meta tags
export const generateMetaTags = (meta: MetaTags): string[] => {
  const tags: string[] = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}">`,
    `<meta name="keywords" content="${meta.keywords?.join(', ') || ''}">`,
    `<meta property="og:title" content="${meta.title}">`,
    `<meta property="og:description" content="${meta.description}">`,
    `<meta property="og:image" content="${meta.ogImage}">`,
    `<meta property="og:url" content="${meta.ogUrl}">`,
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${meta.title}">`,
    `<meta name="twitter:description" content="${meta.description}">`,
    `<meta name="twitter:image" content="${meta.ogImage}">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<meta name="theme-color" content="#00E5FF">`,
    `<link rel="canonical" href="${meta.canonical}">`
  ];

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow">`);
  }

  return tags;
};

// Generate structured data (JSON-LD)
export const generateStructuredData = (data: StructuredData): string => {
  const { '@context': context, '@type': type, ...restData } = data;
  const structuredData = {
    '@context': context || 'https://schema.org',
    '@type': type,
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    ...restData
  };

  return `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
};

// Organization structured data
export const generateOrganizationData = (): string => {
  return generateStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TraceIT',
    description: 'A community-powered lost and found platform that helps people reconnect with their belongings.',
    url: 'https://traceit.com',
    logo: 'https://traceit.com/images/logo.png',
    sameAs: [
      'https://facebook.com/traceit',
      'https://twitter.com/traceit',
      'https://instagram.com/traceit'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1 (555) 123-4567',
      contactType: 'customer service',
      availableLanguage: ['English']
    }
  });
};

// Website structured data
export const generateWebsiteData = (): string => {
  return generateStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TraceIT',
    description: 'A community-powered lost and found platform that helps people reconnect with their belongings.',
    url: 'https://traceit.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://traceit.com/search',
      'query-input': 'required name=search_term_string'
    }
  });
};

// Breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>): string => {
  const itemList = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }));

  return generateStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList
  });
};

// Service structured data
export const generateServiceData = (): string => {
  return generateStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Lost and Found Platform',
    description: 'TraceIT is a community-powered platform that helps students and staff report and find lost items across campus locations.',
    provider: {
      '@type': 'Organization',
      name: 'TraceIT',
      url: 'https://traceit.com'
    },
    serviceType: 'Lost and Found Service',
    areaServed: 'Campus and University Locations',
    audience: 'Students, Faculty, Staff, Visitors'
  });
};

// FAQ structured data
export const generateFAQData = (faqs: Array<{ question: string; answer: string }>): string => {
  const faqList = faqs.map((faq, index) => ({
    '@type': 'Question',
    position: index + 1,
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));

  return generateStructuredData({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList
  });
};

// Inject meta tags into head
export const injectMetaTags = (meta: MetaTags) => {
  if (typeof document === 'undefined') return;

  const tags = generateMetaTags(meta);
  const structuredData = generateOrganizationData();

  // Remove existing meta tags
  document.querySelectorAll('meta[data-dynamic]').forEach(el => el.remove());
  document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach(el => el.remove());

  // Add new meta tags
  tags.forEach(tagHTML => {
    const tag = document.createElement('div');
    tag.innerHTML = tagHTML;
    const metaTag = tag.firstChild as HTMLElement;
    if (metaTag) {
      metaTag.setAttribute('data-dynamic', 'true');
      document.head.appendChild(metaTag);
    }
  });

  // Add structured data
  const structuredDataScript = document.createElement('script');
  structuredDataScript.type = 'application/ld+json';
  structuredDataScript.setAttribute('data-dynamic', 'true');
  structuredDataScript.textContent = structuredData;
  document.head.appendChild(structuredDataScript);
};

// Update page title
export const updatePageTitle = (title: string) => {
  if (typeof document !== 'undefined') {
    document.title = title;
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.setAttribute('content', title);
      newOgTitle.setAttribute('data-dynamic', 'true');
      document.head.appendChild(newOgTitle);
    }
  }
};

// Generate canonical URL
export const generateCanonicalUrl = (path?: string): string => {
  const baseUrl = 'https://traceit.com';
  return path ? `${baseUrl}${path}` : baseUrl;
};
