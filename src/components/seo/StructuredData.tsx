import { SCHEMA_ORG, BUSINESS_INFO } from '../../config/businessInfo';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'breadcrumb' | 'service' | 'localBusiness' | 'faqPage';
  breadcrumbs?: Array<{ name: string; url: string }>;
  serviceData?: {
    name: string;
    description: string;
    provider: string;
  };
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function StructuredData({
  type = 'organization',
  breadcrumbs,
  serviceData,
  faqData,
}: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return SCHEMA_ORG;

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SCHEMA_ORG.name,
          url: SCHEMA_ORG.url,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SCHEMA_ORG.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs?.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: serviceData?.name,
          description: serviceData?.description,
          provider: {
            '@type': 'HouseholdServices',
            name: SCHEMA_ORG.name,
            telephone: BUSINESS_INFO.contact.phoneRaw,
            url: BUSINESS_INFO.contact.website,
          },
          areaServed: SCHEMA_ORG.areaServed,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        };

      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${BUSINESS_INFO.contact.website}#localbusiness`,
          name: BUSINESS_INFO.name,
          image: `${BUSINESS_INFO.contact.website}/og-image.jpg`,
          telephone: BUSINESS_INFO.contact.phoneRaw,
          email: BUSINESS_INFO.contact.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS_INFO.address.streetAddress,
            addressLocality: BUSINESS_INFO.address.addressLocality,
            addressRegion: BUSINESS_INFO.address.addressRegion,
            postalCode: BUSINESS_INFO.address.postalCode,
            addressCountry: BUSINESS_INFO.address.addressCountry,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS_INFO.location.latitude,
            longitude: BUSINESS_INFO.location.longitude,
          },
          url: BUSINESS_INFO.contact.website,
          priceRange: BUSINESS_INFO.priceRange,
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '07:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '08:00',
              closes: '16:00',
            },
          ],
        };

      case 'faqPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData?.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        };

      default:
        return SCHEMA_ORG;
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
