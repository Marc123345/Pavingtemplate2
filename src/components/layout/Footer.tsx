import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../../config/businessInfo';

type Page = 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'sitemap' | 'location';

interface FooterProps {
  onNavigate: (page: Page, citySlug?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { phone, phoneRaw, email } = BUSINESS_INFO.contact;
  const { address, serviceArea } = BUSINESS_INFO;
  const fullAddress = `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`;

  const handleNavigate = (page: Page, citySlug?: string) => {
    onNavigate(page, citySlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass =
    'text-sm md:text-base hover:text-amber-400 transition-all duration-300 hover:pl-2 touch-manipulation min-h-[40px] flex items-center text-left';

  const topCities = serviceArea.primaryCities.slice(0, 6);

  return (
    <footer className="bg-charcoal-950 text-charcoal-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div>
            <img
              src="/logo-dark.svg"
              alt={BUSINESS_INFO.name}
              width="240"
              height="48"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm md:text-base leading-relaxed">
              Asphalt paving, tar and chip, resurfacing and sealcoating for driveways and
              parking lots on both sides of the Michigan&ndash;Michigan line.
            </p>
            <p className="text-sm mt-4 text-charcoal-400">
              Paving season: {BUSINESS_INFO.season}.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6">Navigate</h4>
            <ul className="space-y-1">
              <li><button onClick={() => handleNavigate('home')} className={linkClass}>Home</button></li>
              <li><button onClick={() => handleNavigate('services')} className={linkClass}>Services &amp; Process</button></li>
              <li><button onClick={() => handleNavigate('gallery')} className={linkClass}>Gallery</button></li>
              <li><button onClick={() => handleNavigate('about')} className={linkClass}>About</button></li>
              <li><button onClick={() => handleNavigate('contact')} className={linkClass}>Free Estimate</button></li>
              <li><button onClick={() => handleNavigate('sitemap')} className={linkClass}>Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6">Services</h4>
            <ul className="space-y-1">
              {BUSINESS_INFO.services.slice(0, 6).map((service) => (
                <li key={service}>
                  <button onClick={() => handleNavigate('services')} className={linkClass}>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6">Service Areas</h4>
            <ul className="space-y-1">
              {topCities.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => handleNavigate('location', city.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                    className={linkClass}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-800 mt-10 md:mt-12 pt-6 md:pt-8">
          {/* NAP block — keep this text identical to the Google Business Profile. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">Call or Text</div>
                <a href={`tel:${phoneRaw}`} className="text-sm md:text-base hover:text-amber-400 transition-colors touch-manipulation">
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">Email</div>
                <a href={`mailto:${email}`} className="text-sm md:text-base hover:text-amber-400 transition-colors touch-manipulation break-all">
                  {email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">Based In</div>
                <address className="not-italic text-sm md:text-base">{fullAddress}</address>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">Hours</div>
                <p className="text-sm md:text-base">Mon–Fri 7–6 &middot; Sat 8–4</p>
                <p className="text-sm text-charcoal-400">Sunday closed</p>
              </div>
            </div>
          </div>

          <div className="text-center text-xs md:text-sm text-charcoal-500 pt-6 md:pt-8 border-t border-charcoal-800">
            <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
            <p className="mt-2">
              {BUSINESS_INFO.trustPoints.join(' | ')}
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                onClick={() => handleNavigate('sitemap')}
                className="text-charcoal-500 hover:text-amber-400 transition-colors"
              >
                Sitemap
              </button>
              <span className="text-charcoal-700">|</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-500 hover:text-amber-400 transition-colors"
              >
                XML Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky call bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-charcoal-950/95 backdrop-blur-md border-t-2 border-amber-500/40 p-4 flex gap-3 z-40 safe-area-inset shadow-2xl" style={{ position: 'fixed' }}>
        <a
          href={`tel:${phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-500 active:bg-primary-700 px-4 py-3.5 font-bold text-white transition-all duration-200 min-w-0 rounded-xl shadow-lg touch-manipulation min-h-[56px]"
          aria-label="Call now for a free asphalt paving estimate"
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          <span className="text-base whitespace-nowrap overflow-hidden text-ellipsis">Call Now</span>
        </a>
        <button
          onClick={() => handleNavigate('contact')}
          className="flex-1 flex items-center justify-center gap-2 bg-charcoal-800 active:bg-charcoal-700 px-4 py-4 font-bold text-white transition-all duration-200 min-w-0 rounded-xl shadow-lg touch-manipulation min-h-[56px]"
          aria-label="Request a free estimate"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">Free Estimate</span>
        </button>
      </div>
    </footer>
  );
}
