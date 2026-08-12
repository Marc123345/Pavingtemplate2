import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './seo/StructuredData';
import { BUSINESS_INFO } from '../config/businessInfo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbList = [{ name: 'Home', url: BUSINESS_INFO.contact.website }, ...items];

  return (
    <>
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbList} />

      <nav aria-label="Breadcrumb" className="bg-charcoal-900 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm overflow-x-auto">
            <li className="flex items-center flex-shrink-0">
              <a
                href="/"
                className="text-charcoal-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                aria-label="Go to homepage"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </a>
            </li>

            {items.map((item, index) => (
              <li key={item.url} className="flex items-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-charcoal-600 mx-2 flex-shrink-0" />
                {index === items.length - 1 ? (
                  <span className="text-amber-400 font-medium whitespace-nowrap">{item.name}</span>
                ) : (
                  <a
                    href={item.url}
                    className="text-charcoal-400 hover:text-amber-400 transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
