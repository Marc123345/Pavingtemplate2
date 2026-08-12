import { useEffect } from 'react';
import { BUSINESS_INFO } from '../../config/businessInfo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  location?: string;
}

const BASE_KEYWORDS = [
  'asphalt paving',
  'asphalt contractor',
  'driveway sealing',
  'parking lot paving',
  'crack filling',
  'line striping',
  'West Michigan paving',
  'Grand Rapids asphalt contractor',
];

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  canonicalUrl,
  location,
}: SEOHeadProps) {
  const locationKeywords = location
    ? [`asphalt paving ${location}`, `driveway paving ${location}`, `paving contractor ${location}`]
    : [];

  const allKeywords = [...BASE_KEYWORDS, ...locationKeywords, ...keywords].join(', ');

  const fullTitle = title
    ? `${title} | ${BUSINESS_INFO.name}`
    : `${BUSINESS_INFO.name} — ${BUSINESS_INFO.tagline}`;

  const fullDescription = description || BUSINESS_INFO.description;
  const fullCanonicalUrl = canonicalUrl || BUSINESS_INFO.contact.website;
  const fullOgImage = ogImage || `${BUSINESS_INFO.contact.website}/og-image.jpg`;

  useEffect(() => {
    document.title = fullTitle;

    const { address, location: geo, contact } = BUSINESS_INFO;

    const metaTags: { name?: string; property?: string; content: string }[] = [
      { name: 'description', content: fullDescription },
      { name: 'keywords', content: allKeywords },
      { name: 'author', content: BUSINESS_INFO.name },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },

      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: fullDescription },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullCanonicalUrl },
      { property: 'og:image', content: fullOgImage },
      { property: 'og:site_name', content: BUSINESS_INFO.name },
      { property: 'og:locale', content: 'en_US' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: fullDescription },
      { name: 'twitter:image', content: fullOgImage },

      // Service-area business centred on Grand Rapids, MI (see areaServed in schema).
      { name: 'geo.region', content: `US-${address.addressRegion}` },
      { name: 'geo.placename', content: address.addressLocality },
      { name: 'geo.position', content: `${geo.latitude};${geo.longitude}` },
      { name: 'ICBM', content: `${geo.latitude}, ${geo.longitude}` },

      { name: 'theme-color', content: '#16161A' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'mobile-web-app-capable', content: 'yes' },

      { property: 'og:phone_number', content: contact.phoneRaw },
      { property: 'og:email', content: contact.email },
      { property: 'og:latitude', content: String(geo.latitude) },
      { property: 'og:longitude', content: String(geo.longitude) },
      { property: 'og:street-address', content: address.streetAddress },
      { property: 'og:locality', content: address.addressLocality },
      { property: 'og:region', content: address.addressRegion },
      { property: 'og:postal-code', content: address.postalCode },
      { property: 'og:country-name', content: 'United States' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = (name || property) as string;

      let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }

      meta.content = content;
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullCanonicalUrl;
  }, [fullTitle, fullDescription, allKeywords, fullCanonicalUrl, fullOgImage, ogType]);

  return null;
}
