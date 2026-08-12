import { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import { BUSINESS_INFO } from '../config/businessInfo';
import { LOCATIONS } from '../data/locations';
import * as media from '../config/media';
import { PageProps } from '../types';

export default function ContactPage({ onNavigate }: PageProps) {
  const { phone, phoneRaw, email } = BUSINESS_INFO.contact;
  const { address, forms } = BUSINESS_INFO;
  const jotformId = forms.jotformId;

  useEffect(() => {
    if (!jotformId) return;

    const formContainer = document.getElementById('jotform-container');
    if (!formContainer) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://form.jotform.com/jsform/${jotformId}`;
    script.async = true;
    formContainer.appendChild(script);

    return () => {
      if (script.parentNode === formContainer) {
        formContainer.removeChild(script);
      }
    };
  }, [jotformId]);

  return (
    <div className="bg-white">
      <SEOHead
        title={`Free Asphalt Paving Estimate | Call ${phone}`}
        description="Request a free written asphalt paving estimate for your driveway, lot or parking lot. Serving Grand Rapids, Wyoming, Kentwood, Grandville, Holland and the surrounding West Michigan area."
        keywords={['free asphalt paving estimate', 'driveway paving quote', 'parking lot paving quote']}
      />
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-charcoal-950 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${media.SEALING.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-charcoal-950/65" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-anton font-bold mb-5 leading-tight tracking-tight uppercase">
            Get Your <span className="text-amber-400">Free Estimate</span>
          </h1>
          <p className="text-lg md:text-2xl text-charcoal-200 max-w-2xl leading-relaxed">
            Call, text, or email. Tell us the address and roughly how big the surface is.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none" style={{ marginBottom: '-1px' }}>
          <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="white" style={{ display: 'block' }}>
            <path d="M0,0 L720,100 L1440,0 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact detail + form */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <AnimatedSection>
              <div className="bg-charcoal-950 text-white p-7 md:p-10 h-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Talk to a real person</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Call</div>
                      <a href={`tel:${phoneRaw}`} className="text-amber-400 hover:text-amber-300 transition-colors text-lg">
                        {phone}
                      </a>
                      <p className="text-charcoal-400 text-sm mt-1">Fastest way to get on the schedule</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Text</div>
                      <a href={`sms:${phoneRaw}`} className="text-amber-400 hover:text-amber-300 transition-colors text-lg">
                        {phone}
                      </a>
                      <p className="text-charcoal-400 text-sm mt-1">
                        Send a photo of the driveway and we can often price it faster
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Email</div>
                      <a href={`mailto:${email}?subject=Seal%20coating%20estimate%20request`} className="text-amber-400 hover:text-amber-300 transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Hours</div>
                      <p className="text-charcoal-300">Monday &ndash; Friday: 7:00 AM &ndash; 6:00 PM</p>
                      <p className="text-charcoal-300">Saturday: 8:00 AM &ndash; 4:00 PM</p>
                      <p className="text-charcoal-300">Sunday: Closed</p>
                      <p className="text-charcoal-500 text-sm mt-2">
                        Paving season: {BUSINESS_INFO.season}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">We come to you</div>
                      <address className="not-italic text-charcoal-300">
                        {address.streetAddress}<br />
                        {address.addressLocality}, {address.addressRegion} {address.postalCode}
                      </address>
                      <p className="text-charcoal-400 text-sm mt-1">
                        About a {BUSINESS_INFO.serviceArea.radius}-mile working radius
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-charcoal-800">
                  <p className="text-charcoal-300">
                    <strong className="text-white">To speed things up:</strong> have the property
                    address handy, and let us know roughly how big the surface is and whether
                    you can see cracking. A photo helps more than anything.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              {jotformId ? (
                <div
                  id="jotform-container"
                  className="bg-white p-6 md:p-10 shadow-lg border-2 border-gray-100 min-h-[600px]"
                />
              ) : (
                /**
                 * No form is wired up yet, on purpose. The template shipped with the
                 * previous client's Jotform ID — leaving it in would have delivered
                 * Bill's leads to a different company. Set
                 * BUSINESS_INFO.forms.jotformId and this block is replaced by the embed.
                 */
                <div className="bg-primary-50 border-2 border-primary-200 p-7 md:p-10 h-full flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal-950 mb-4">
                    Request an estimate
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    The quickest way to get a price is to call or text the number and tell us
                    the address. If you would rather write it out, email works too &mdash; and a
                    photo of the surface means we can usually give you a ballpark before we
                    even drive out.
                  </p>

                  <div className="space-y-3">
                    <a
                      href={`tel:${phoneRaw}`}
                      className="flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-4 text-base md:text-lg transition-colors rounded-md min-h-[56px]"
                    >
                      <Phone className="w-5 h-5" />
                      Call {phone}
                    </a>
                    <a
                      href={`sms:${phoneRaw}?body=Hi%20Bill%2C%20I%27d%20like%20a%20seal%20coating%20estimate.%20Address%3A%20`}
                      className="flex items-center justify-center gap-3 bg-charcoal-950 hover:bg-charcoal-900 text-white font-bold px-6 py-4 text-base md:text-lg transition-colors rounded-md min-h-[56px]"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Text a photo
                    </a>
                    <a
                      href={`mailto:${email}?subject=Seal%20coating%20estimate%20request&body=Property%20address%3A%20%0A%0AApproximate%20size%20(sq%20ft%20or%20number%20of%20cars)%3A%20%0A%0ADriveway%20or%20parking%20lot%3F%20%0A%0AAny%20visible%20cracking%20or%20potholes%3F%20%0A`}
                      className="flex items-center justify-center gap-3 bg-white border-2 border-primary-300 hover:border-primary-500 text-primary-600 font-bold px-6 py-4 text-base md:text-lg transition-colors rounded-md min-h-[56px]"
                    >
                      <Mail className="w-5 h-5" />
                      Email the details
                    </a>
                  </div>

                  <p className="text-sm text-gray-600 mt-8">
                    The email button pre-fills the four things we need to know, so you can just
                    fill in the blanks and send.
                  </p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-16 md:py-28 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              WHERE WE <span className="text-primary-500">WORK</span>
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              About {BUSINESS_INFO.serviceArea.radius} miles out from Grand Rapids, across{' '}
              {BUSINESS_INFO.serviceArea.counties.join(' and ')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
            {LOCATIONS.map((loc, index) => (
              <AnimatedSection key={loc.slug} delay={index * 30}>
                <button
                  onClick={() => {
                    onNavigate('location', loc.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full h-full bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 text-left border border-gray-100 hover:border-primary-300 rounded-lg touch-manipulation group"
                >
                  <div className="font-semibold text-charcoal-950 text-sm md:text-base group-hover:text-primary-500 transition-colors">
                    {loc.city}, {loc.state}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {loc.zipCodes.slice(0, 2).join(' · ')}
                  </div>
                  <div className="text-xs font-semibold text-primary-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-center text-gray-700 text-base md:text-lg">
            <strong className="text-charcoal-950">Don&rsquo;t see your town?</strong><br />
            Call {phone} and we will tell you in under a minute whether we can get to you.
          </p>
        </div>
      </section>
    </div>
  );
}
