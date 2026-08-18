import { MapPin, Phone, CheckCircle, Snowflake, Sun, Droplet } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import InteractiveValues from '../components/InteractiveValues';
import CallToAction from '../components/CallToAction';
import { BUSINESS_INFO } from '../config/businessInfo';
import * as media from '../config/media';
import { PageProps } from '../types';

export default function AboutPage({ onNavigate }: PageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { address, contact, serviceArea } = BUSINESS_INFO;

  return (
    <div className="bg-white">
      <SEOHead
        title="About Us | Local Asphalt Paving in Grand Rapids & West Michigan"
        description="A1 Paving is an owner-run asphalt contractor working out of Grand Rapids, Michigan. Fifteen years in the trade, a seven-man crew and our own equipment, covering Kent, Ottawa and the surrounding counties."
        keywords={[
          'local asphalt contractor',
          'Grand Rapids paving company',
          'asphalt paving West Michigan',
        ]}
      />
      <StructuredData type="organization" />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[55vh] md:h-[65vh] min-h-[440px] flex items-center bg-charcoal-950 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${media.WOODED_COMPACTION.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal-950/60" />

        <motion.div style={{ opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bebas font-bold mb-4 md:mb-6 leading-none tracking-tight"
          >
            A LOCAL OUTFIT THAT DOES <span className="text-amber-400">ONE THING</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-charcoal-200 max-w-2xl leading-relaxed"
          >
            Asphalt paving, tar and chip, resurfacing and sealcoating. Owner-run out of
            Grand Rapids, with our own crew and our own equipment.
          </motion.p>
        </motion.div>

      </section>

      {/* Story */}
      <section className="section-padding bg-gradient-to-br from-white via-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-28"
          >
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-primary-500/20 transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
              <div className="relative overflow-hidden shadow-theme-lg">
                <img
                  src={media.RESIDENTIAL_STREET.src}
                  alt={media.RESIDENTIAL_STREET.alt}
                  loading="lazy"
                  className="relative w-full"
                />
              </div>
              <p className="relative mt-3 text-xs text-gray-500">{media.RESIDENTIAL_STREET.caption}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bebas font-bold text-charcoal-950 mb-4 md:mb-6 leading-none tracking-tight">
                WHY THE <span className="text-primary-500">BASE</span> MATTERS MOST
              </h2>
              <div className="space-y-5">
                <p className="text-base md:text-xl text-gray-700 leading-relaxed">
                  Anything that involves asphalt, we do. Fifteen years in the trade, seven
                  people on the crew, and our own equipment, which means the schedule is ours
                  and the work does not get subbed out to whoever is free that week.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  In practice that means the ground prep and the stone base get real time.
                  Those are the steps that decide whether a surface lasts twenty years or
                  cracks in two, and they are also the easiest steps to quietly skip because
                  nobody can see them once the asphalt is down.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  We are based on East Appleway in Grand Rapids, which puts most of Grand Rapids
                  Valley and most of Kent County within a short drive. You call the
                  number and you get Bill, not a call centre.
                </p>
                <div className="bg-charcoal-950 text-white p-5 md:p-6 shadow-theme-md">
                  <p className="text-base md:text-lg font-semibold">
                    If sealing is not the right call for your surface, we will say so. Coating
                    over a failing driveway is a way to take someone&rsquo;s money twice.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Climate section — the local reason this service exists */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-28"
          >
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
                WHAT THIS CLIMATE DOES <span className="text-primary-500">TO ASPHALT</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                The Inland Northwest is about as hard on pavement as it gets &mdash; hot dry
                summers followed by a winter that freezes and thaws repeatedly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Sun,
                  title: 'Summer bakes the binder out',
                  body: 'UV and heat oxidise the asphalt binder. The surface fades from black to grey, loses flexibility, and starts shedding aggregate.',
                },
                {
                  icon: Droplet,
                  title: 'Water gets into the cracks',
                  body: 'Once the surface is porous and cracked, rain and snowmelt soak straight through to the gravel base underneath.',
                },
                {
                  icon: Snowflake,
                  title: 'Freeze-thaw breaks it apart',
                  body: 'That trapped water freezes, expands, and levers the crack wider. Repeat all winter and you get potholes and alligator cracking.',
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 100}>
                  <div className="h-full bg-white p-6 md:p-8 border-2 border-gray-100 shadow-theme">
                    <div className="w-14 h-14 bg-primary-500 flex items-center justify-center mb-5">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-charcoal-950 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <p className="text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto mt-10">
              A properly built base interrupts that cycle before it starts, and sealcoating
              keeps water out of the surface once it is down. Together they are the cheapest
              pavement maintenance there is.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bebas font-bold text-charcoal-950 mb-4 md:mb-6 leading-none tracking-tight">
                HOW WE <span className="text-primary-500">WORK</span>
              </h2>
              <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
                Four commitments on every job, residential or commercial
              </p>
            </div>
            <InteractiveValues />
          </motion.div>
        </div>
      </section>

      {/* Where to find us */}
      <section className="relative section-padding bg-charcoal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bebas font-bold mb-6 tracking-wide">
                WHERE TO <span className="text-amber-400">FIND US</span>
              </h2>
              <div className="space-y-5 text-charcoal-200">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-white mb-1">Based in Grand Rapids</div>
                    <address className="not-italic">
                      {address.streetAddress}<br />
                      {address.addressLocality}, {address.addressRegion} {address.postalCode}
                    </address>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-white mb-1">Call or text</div>
                    <a href={`tel:${contact.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-white mb-1">Working radius</div>
                    <p>
                      About {serviceArea.radius} miles &mdash; {serviceArea.counties.join(' and ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-charcoal-900 border border-charcoal-800 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-5">Cities we cover</h3>
              <div className="grid grid-cols-2 gap-2">
                {serviceArea.primaryCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onNavigate('location', city.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-sm md:text-base text-charcoal-300 hover:text-amber-400 transition-colors py-1.5"
                  >
                    {city}
                  </button>
                ))}
              </div>
              <p className="text-sm text-charcoal-500 mt-5">
                Paving season: {BUSINESS_INFO.season}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        onNavigate={onNavigate}
        heading={<>Let&rsquo;s Look at <span className="text-amber-400">Your Pavement</span></>}
        tone="amber"
        body="Free on-site estimate. We measure it, tell you what it needs, and put the price in writing."
      />
    </div>
  );
}
