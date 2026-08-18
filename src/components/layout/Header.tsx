import { Menu, X, Phone, Clock } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_INFO } from '../../config/businessInfo';

type Page = 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'sitemap' | 'location';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { phone, phoneRaw } = BUSINESS_INFO.contact;

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border border-ink-900 border-b border-gray-200 transition-all duration-300">
      <div className="bg-charcoal-950 text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href={`tel:${phoneRaw}`} className="hover:text-amber-400 transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Mon–Fri 7:00 AM – 6:00 PM &middot; Sat 8:00 AM – 4:00 PM</span>
              </div>
            </div>
            <div className="text-charcoal-300">
              Serving Grand Rapids &amp; West Michigan
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <button
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            onClick={() => handleNavigate('home')}
            aria-label="A1 Paving — go to homepage"
          >
            <img
              src="/logo-mark.svg"
              alt=""
              width="48"
              height="48"
              className="h-11 w-11 md:h-12 md:w-12 flex-shrink-0"
            />
            <span className="text-left leading-none">
              <span className="block font-anton text-xl md:text-2xl tracking-wide text-charcoal-950">
                A1 PAVING
              </span>
              <span className="block text-[9px] md:text-[10px] font-bold tracking-[0.24em] text-primary-700 mt-0.5">
                ASPHALT PAVING
              </span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`text-base font-bebas font-semibold tracking-wide transition-all duration-300 hover:text-primary-700 relative group ${
                  currentPage === item.page ? 'text-primary-700' : 'text-charcoal-950'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-700 transition-all duration-300 ${
                  currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center space-x-2 bg-primary-700 hover:bg-primary-800 px-6 py-3 font-bold text-white transition-all duration-300 hover:border border-ink-900"
              aria-label="Call now for a free asphalt paving estimate"
            >
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </a>
          </div>

          <button
            className="lg:hidden p-3 -mr-2 touch-manipulation active:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in">
          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left px-6 py-4 transition-all duration-300 font-semibold text-base touch-manipulation min-h-[48px] ${
                  currentPage === item.page
                    ? 'bg-primary-700 text-white border border-ink-900'
                    : 'text-charcoal-950 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center space-x-3 bg-primary-700 active:bg-primary-700 px-6 py-4 font-bold text-white transition-all duration-200 mt-6 border border-ink-900 text-base touch-manipulation min-h-[52px]"
              aria-label="Call now for a free asphalt paving estimate"
            >
              <Phone className="w-5 h-5" />
              <span>{phone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
