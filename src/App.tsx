import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Chatbot from './components/Chatbot';
import { locationSlugs } from './data/locations';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));

export type Page = 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'sitemap' | 'location';

interface Route {
  page: Page;
  citySlug?: string;
}

const LOCATION_PREFIX = '/asphalt-paving/';

function routeFromPath(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path.startsWith(LOCATION_PREFIX)) {
    const slug = path.slice(LOCATION_PREFIX.length);
    if (locationSlugs.includes(slug)) return { page: 'location', citySlug: slug };
    return { page: 'home' };
  }

  if (path === '/' || path === '/index.html') return { page: 'home' };
  if (path.startsWith('/services')) return { page: 'services' };
  if (path.startsWith('/gallery')) return { page: 'gallery' };
  if (path.startsWith('/about')) return { page: 'about' };
  if (path.startsWith('/contact')) return { page: 'contact' };
  if (path.startsWith('/sitemap')) return { page: 'sitemap' };
  return { page: 'home' };
}

function pathFromRoute({ page, citySlug }: Route): string {
  if (page === 'location' && citySlug) return `${LOCATION_PREFIX}${citySlug}`;
  return page === 'home' ? '/' : `/${page}`;
}

function App() {
  const [route, setRoute] = useState<Route>(routeFromPath);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => setRoute(routeFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: Page, citySlug?: string) => {
    const next: Route = { page, citySlug };
    setIsTransitioning(true);
    window.history.pushState({}, '', pathFromRoute(next));

    setTimeout(() => {
      setRoute(next);
      setIsTransitioning(false);
    }, 200);
  };

  const renderPage = () => {
    switch (route.page) {
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;
      case 'location':
        return <LocationPage slug={route.citySlug!} onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      <Header currentPage={route.page} onNavigate={handleNavigate} />
      <main className={`transition-opacity duration-200 pb-24 md:pb-0 overflow-x-hidden w-full ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-16 h-16 border-4 border-primary-700 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-semibold">Loading&hellip;</p>
              </div>
            </div>
          }
        >
          {renderPage()}
        </Suspense>
      </main>
      <Footer onNavigate={handleNavigate} />
      <Chatbot />
    </div>
  );
}

export default App;
