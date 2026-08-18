import { MapPin, Phone, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/Breadcrumbs';
import CallToAction from '../components/CallToAction';
import { BUSINESS_INFO } from '../config/businessInfo';
import { LOCATIONS, findLocation } from '../data/locations';
import * as media from '../config/media';
import { NavigateFn } from '../types';

interface LocationPageProps {
  slug: string;
  onNavigate: NavigateFn;
}

export default function LocationPage({ slug, onNavigate }: LocationPageProps) {
  const location = findLocation(slug);
  const { phone, phoneRaw, website } = BUSINESS_INFO.contact;

  if (!location) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-charcoal-950 mb-4">Area not found</h1>
          <button
            onClick={() => onNavigate('home')}
            className="text-primary-500 font-semibold hover:underline"
          >
            Back to the homepage
          </button>
        </div>
      </div>
    );
  }

  const { city, state, stateName, county, zipCodes, miles, direction, intro, commonWork } = location;
  const nearby = LOCATIONS.filter((l) => l.slug !== slug && l.state === state).slice(0, 5);

  return (
    <div className="bg-white">
      <SEOHead
        title={`Asphalt Paving in ${city}, ${state} | Driveways & Parking Lots`}
        description={`Asphalt paving, tar and chip, resurfacing and sealcoating in ${city}, ${stateName}. Free written estimates on driveways and parking lots across ${county}. Call ${phone}.`}
        location={city}
        canonicalUrl={`${website}/asphalt-paving/${slug}`}
        keywords={[
          `asphalt paving ${city}`,
          `driveway sealing ${city}`,
          `paving contractor ${city} ${state}`,
          `parking lot striping ${city}`,
          `crack filling ${city}`,
        ]}
      />
      <StructuredData type="organization" />
      <StructuredData
        type="service"
        serviceData={{
          name: `Asphalt Asphalt Paving in ${city}, ${state}`,
          description: `Asphalt paving, resurfacing and sealcoating for driveways, lots and parking lots in ${city}, ${stateName}.`,
          provider: BUSINESS_INFO.name,
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-charcoal-950 py-20">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url(${media.HERO.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-950/85 to-primary-950/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">
              {miles === 0 ? 'Our home base' : `About ${miles} mi ${direction} of our yard`}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bebas font-bold mb-5 leading-none tracking-tight">
            ASPHALT PAVING IN<br />
            <span className="text-amber-400">{city.toUpperCase()}, {state}</span>
          </h1>
          <p className="text-lg md:text-2xl text-charcoal-200 max-w-3xl leading-relaxed">
            Driveways and parking lots across {county}. Free written estimates.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-7 py-4 transition-colors rounded-theme min-h-[56px]"
            >
              <Phone className="w-5 h-5" />
              Call {phone}
            </a>
            <a
              href={`sms:${phoneRaw}?body=Hi%20Bill%2C%20I%27d%20like%20a%20seal%20coating%20estimate%20in%20${encodeURIComponent(city)}.`}
              className="inline-flex items-center justify-center gap-3 border-2 border-charcoal-600 hover:border-amber-400 hover:text-amber-400 text-white font-bold px-7 py-4 transition-colors rounded-theme min-h-[56px]"
            >
              <MessageSquare className="w-5 h-5" />
              Text us
            </a>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { name: 'Service Areas', url: `${website}/sitemap` },
          { name: `${city}, ${state}`, url: `${website}/asphalt-paving/${slug}` },
        ]}
      />

      {/* Local detail */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-6 tracking-wide">
                ASPHALT PAVING IN <span className="text-primary-500">{city.toUpperCase()}</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>{intro}</p>
                <p>
                  The pattern here is the same one we see across the whole Inland Northwest:
                  summer UV oxidises the binder until the asphalt goes grey and porous, then
                  autumn rain and snowmelt get into the cracks and the freeze-thaw pries them
                  wider all winter. Sealing on a cycle interrupts that before it turns into
                  potholes.
                </p>
                <p>
                  We are based on East Appleway in Grand Rapids, so{' '}
                  {miles === 0
                    ? 'this is home turf'
                    : `${city} is roughly a ${miles}-mile run for us`}
                  . That matters more than it sounds &mdash; short drives mean we can come back
                  and look at something without making a production of it.
                </p>
              </div>

              <div className="mt-8 p-6 bg-primary-50 border-2 border-primary-200">
                <div className="font-bold text-lg text-charcoal-950 mb-3">
                  ZIP codes we cover in {city}
                </div>
                <div className="flex flex-wrap gap-2">
                  {zipCodes.map((zip) => (
                    <span key={zip} className="px-3 py-1.5 bg-white border border-primary-300 text-primary-700 text-sm font-bold">
                      {zip}
                    </span>
                  ))}
                </div>
                {slug === 'grand-rapids' && (
                  <p className="text-sm text-gray-600 mt-4">
                    49503 is our primary campaign ZIP &mdash; if you are in or around{' '}
                    downtown Grand Rapids, we are almost certainly working nearby already.
                  </p>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={120}>
              <div className="bg-charcoal-950 text-white p-7 md:p-9 shadow-theme-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  What we get called out for in {city}
                </h3>
                <ul className="space-y-4 mb-8">
                  {commonWork.map((work) => (
                    <li key={work} className="flex items-start gap-4">
                      <div className="w-7 h-7 bg-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-charcoal-200">{work}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-charcoal-800 space-y-3">
                  <p className="text-charcoal-300 text-sm">
                    Every quote is measured on site and given to you in writing. Crack filling
                    is part of the job, not an add-on you find out about later.
                  </p>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="w-full inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-6 py-4 text-lg font-bold transition-colors rounded-theme"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <img
                  src={media.STRIPING.thumb}
                  alt={media.STRIPING.alt}
                  loading="lazy"
                  className="w-full shadow-theme"
                />
                <p className="mt-2 text-xs text-gray-500">{media.STRIPING.caption}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services quick list */}
      <section className="section-padding bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              EVERYTHING WE OFFER IN <span className="text-primary-500">{city.toUpperCase()}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUSINESS_INFO.services.map((service, i) => (
              <AnimatedSection key={service} delay={i * 40}>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full h-full text-left bg-white p-5 border-2 border-gray-100 hover:border-primary-300 shadow-sm hover:shadow-theme transition-all duration-300 group"
                >
                  <span className="block font-semibold text-charcoal-950 group-hover:text-primary-500 transition-colors">
                    {service}
                  </span>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bebas font-bold text-charcoal-950 mb-8 tracking-wide text-center">
              ALSO SERVING NEARBY IN <span className="text-primary-500">{stateName.toUpperCase()}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {nearby.map((loc) => (
                <button
                  key={loc.slug}
                  onClick={() => { onNavigate('location', loc.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group bg-white p-4 border-2 border-gray-100 hover:border-primary-300 shadow-sm hover:shadow-theme transition-all duration-300 text-left"
                >
                  <div className="font-semibold text-charcoal-950 text-sm md:text-base group-hover:text-primary-500 transition-colors">
                    {loc.city}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{loc.county}</div>
                  <div className="text-xs font-semibold text-primary-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        onNavigate={onNavigate}
        heading={<>Free Estimate in <span className="text-amber-400">{city}</span></>}
        body={`We come to your ${city} property, measure the surface, look at the condition, and hand you a written price. No cost and no obligation.`}
      />
    </div>
  );
}
