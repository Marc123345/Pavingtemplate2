import { Home, Wrench, Image, Phone, Info, MapPin, FileText } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { BUSINESS_INFO } from '../config/businessInfo';
import { LOCATIONS } from '../data/locations';
import * as media from '../config/media';
import { NavigateFn, Page } from '../types';

interface SitemapPageProps {
  onNavigate: NavigateFn;
}

export default function SitemapPage({ onNavigate }: SitemapPageProps) {
  const { phone, phoneRaw } = BUSINESS_INFO.contact;

  const go = (page: Page, citySlug?: string) => {
    onNavigate(page, citySlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainPages: { name: string; page: Page; icon: typeof Home; description: string }[] = [
    { name: 'Home', page: 'home', icon: Home, description: 'Why the base decides how long asphalt lasts' },
    { name: 'Services & Process', page: 'services', icon: Wrench, description: 'Every service, the six-step process, and the FAQs' },
    { name: 'Gallery', page: 'gallery', icon: Image, description: 'What sealer, crack filling and striping look like' },
    { name: 'About', page: 'about', icon: Info, description: 'Who we are and what this climate does to asphalt' },
    { name: 'Free Estimate', page: 'contact', icon: Phone, description: 'Call, text or email for a written price' },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950">
      <SEOHead
        title="Sitemap"
        description={`Every page on the ${BUSINESS_INFO.name} site, including asphalt paving service-area pages for Grand Rapids, Kentwood, Wyoming and the rest of the region.`}
        keywords={['sitemap', 'site navigation']}
      />

      <section className="relative min-h-[34vh] flex items-center bg-charcoal-950 overflow-hidden py-16">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${media.WOODED_COMPACTION.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-amber-400" />
            <h1 className="text-3xl md:text-5xl font-bebas font-bold text-white tracking-wide">
              SITE <span className="text-amber-400">MAP</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-charcoal-300 max-w-2xl">
            Every page on the site, including a page for each city we cover.
          </p>
        </div>
      </section>

      <section className="section-padding bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-amber-500/20 pb-4">
              Main Pages
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mainPages.map((link) => (
                <button
                  key={link.page}
                  onClick={() => go(link.page)}
                  className="group text-left bg-charcoal-800/50 border border-charcoal-700 p-6 hover:border-amber-500/60 hover:bg-charcoal-800 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300 flex-shrink-0">
                      <link.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                        {link.name}
                      </h3>
                      <p className="text-sm text-charcoal-400 leading-relaxed">{link.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-amber-500/20 pb-4">
              Service Areas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.slug}
                  onClick={() => go('location', loc.slug)}
                  className="group text-left bg-charcoal-800/50 border border-charcoal-700 p-6 hover:border-amber-500/60 hover:bg-charcoal-800 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
                        Asphalt Paving in {loc.city}, {loc.state}
                      </h3>
                      <p className="text-sm text-charcoal-400 leading-relaxed">
                        {loc.county} &middot; {loc.zipCodes.join(', ')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-primary-700/5 border border-amber-500/20 p-7 md:p-9">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Can&rsquo;t find what you need?
              </h2>
              <p className="text-charcoal-300 mb-7 max-w-2xl mx-auto">
                Call and ask. It is quicker than clicking around.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${phoneRaw}`}
                  className="px-8 py-3.5 bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {phone}
                </a>
                <button
                  onClick={() => go('contact')}
                  className="px-8 py-3.5 bg-charcoal-800 border border-amber-500/30 text-white font-semibold hover:border-amber-500 hover:bg-charcoal-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Request an estimate
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">For search engines</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-charcoal-800 border border-charcoal-700 text-charcoal-300 hover:border-amber-500/50 hover:text-white transition-all duration-300"
              >
                XML Sitemap
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-charcoal-800 border border-charcoal-700 text-charcoal-300 hover:border-amber-500/50 hover:text-white transition-all duration-300"
              >
                Robots.txt
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
