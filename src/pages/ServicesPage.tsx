import { useState } from 'react';
import {
  Sparkles, Wrench, SprayCan, Ruler, Sun, ClipboardCheck,
  Home, Building2, Layers, PaintRoller, Hammer, Route,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import CallToAction from '../components/CallToAction';
import * as media from '../config/media';
import { BUSINESS_INFO } from '../config/businessInfo';
import { PageProps } from '../types';

const SERVICES = [
  {
    icon: Route,
    title: 'Asphalt Paving',
    body: 'The core of the business. Ground prepped properly, compacted stone base laid, then topped with hot mix asphalt. Driveways, lots, lanes and roadways, residential through industrial.',
  },
  {
    icon: Layers,
    title: 'Tar & Chip Surfacing',
    body: 'Hot liquid asphalt covered with a layer of stone chip. It costs less per foot than hot mix over long runs, which makes it the practical answer for rural drives and private roads.',
  },
  {
    icon: Building2,
    title: 'Parking Lot Paving',
    body: 'Retail, office, multifamily and industrial lots. Work can be phased by section so you never lose the whole lot at once.',
  },
  {
    icon: PaintRoller,
    title: 'Resurfacing & Overlays',
    body: 'When the base underneath is still sound, a new layer of asphalt over the top costs far less than tearing the whole thing out. We tell you honestly which one you need.',
  },
  {
    icon: SprayCan,
    title: 'Asphalt Sealcoating',
    body: 'A protective coat over asphalt that is still structurally sound. It slows the UV and water damage that turns small cracks into a full replacement.',
  },
  {
    icon: Hammer,
    title: 'Milling',
    body: 'Grinding off the existing surface to correct grade and drainage before repaving, rather than stacking new asphalt on top of a failing profile.',
  },
  {
    icon: Wrench,
    title: 'Gravel Driveways',
    body: 'New gravel drives, regrading, and rebuilding drives that have rutted past the point where grading helps.',
  },
  {
    icon: Home,
    title: 'Farm Lanes & Private Roads',
    body: 'Long access runs that carry equipment rather than cars. These live or die on the base, so that is where the work goes.',
  },
  {
    icon: Ruler,
    title: 'Subdivision & Roadway Paving',
    body: 'Full roadway work for subdivisions and developments, from prep and base through final surface.',
  },
];

const PROCESS = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'We come out and measure',
    description:
      'We walk the site, measure the square footage, and look at what is actually there — the existing surface, the drainage, how the ground sits. You get a written price before anything is committed.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Prep the ground',
    description:
      'Whatever the existing surface is, the ground underneath gets prepared properly. This is the step that decides whether the finished job lasts, and it is the one most often rushed.',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Lay the stone base',
    description:
      'A compacted stone base carries the load and gives the asphalt something solid to bond to. Depth is set by what the surface has to carry, so a truck yard is not built like a driveway.',
  },
  {
    number: '04',
    icon: SprayCan,
    title: 'Hot mix asphalt goes down',
    description:
      'Hot mix laid over the prepared base and compacted while it is still at temperature. On tar and chip work, hot liquid asphalt goes down first and the stone chip is spread into it.',
  },
  {
    number: '05',
    icon: Ruler,
    title: 'Edges, grade and layout',
    description:
      'Edges finished, grade checked so water runs where it should rather than standing. On commercial lots, stalls, arrows and ADA markings go down once the surface is ready.',
  },
  {
    number: '06',
    icon: Sun,
    title: 'Cure time, then it is yours',
    description:
      'New asphalt needs time before it takes traffic. We tell you the actual window for your job and the weather that week, rather than a generic number.',
  },
];

const FAQS = [
  {
    question: 'What goes into a proper asphalt job?',
    answer:
      'Three things, in order. The ground gets prepped, a compacted stone base goes down, then hot mix asphalt on top. Skip or rush the first two and the surface fails no matter how good the asphalt is. Most of the failed driveways we get called to look at failed underneath, not on top.',
  },
  {
    question: 'What is tar and chip, and why would I choose it?',
    answer:
      'Hot liquid asphalt sprayed down and covered with stone chip rolled into it. It gives a durable surface with more texture than hot mix, and it costs less per foot over long runs. On a long rural driveway or a private road, that difference adds up quickly.',
  },
  {
    question: 'Do I need a full replacement, or will resurfacing do?',
    answer:
      'It depends on the base. If the base underneath is still sound and the problem is on the surface, an overlay costs far less than tearing everything out. If the base has gone, an overlay just buys a year or two before the same cracks come back through. We look and tell you which one you actually need.',
  },
  {
    question: 'Is there a minimum job size?',
    answer:
      `Yes, ${BUSINESS_INFO.minimumJob.label}. Mobilising a crew and equipment costs the same whether the area is small or large, so below that the price per foot stops making sense for the customer.`,
  },
  {
    question: 'Do you do commercial and industrial work?',
    answer:
      'Both, alongside residential. Industrial yards and truck areas get a deeper base and a mix specified for the loading, because residential-spec asphalt will not survive that traffic.',
  },
  {
    question: 'What warranty do you offer?',
    answer:
      `${BUSINESS_INFO.warranty.included} ${BUSINESS_INFO.warranty.extended}`,
  },
  {
    question: 'When is the season for this?',
    answer:
      `Roughly ${BUSINESS_INFO.season}. Hot mix has to go down and be compacted while it is still at temperature, so cold ground and cold air work against the job. We watch the forecast and will move a date rather than pave in the wrong conditions.`,
  },
  {
    question: 'What does it cost?',
    answer:
      'It comes down to square footage, what is already there, and what the surface has to carry. Two driveways of the same size can price very differently once the base work is accounted for. Every quote is measured on site and given in writing, so call and we will come look.',
  },
  {
    question: 'Where do you work?',
    answer:
      `We work about a ${BUSINESS_INFO.serviceArea.radius}-mile radius of Grand Rapids, and will travel up to ${BUSINESS_INFO.serviceArea.maxTravel} miles for the right job. That covers Grand Rapids, Wyoming, Kentwood, Grandville, Walker, Rockford, Ada, Lowell, Caledonia, Hudsonville, Jenison, Holland, Zeeland, Allendale and Byron Center.`,
  },
];

export default function ServicesPage({ onNavigate }: PageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <div className="bg-white">
      <SEOHead
        title="Asphalt Paving Services & Process | Tar & Chip, Resurfacing"
        description="Exactly how we build an asphalt surface, step by step: ground prep, stone base, hot mix. Plus tar and chip, resurfacing, milling and straight answers on cost, minimums and season."
        keywords={[
          'asphalt paving process',
          'asphalt crack filling',
          'hot rubber crack sealing',
          'parking lot line striping',
          'driveway sealing services',
        ]}
      />
      <StructuredData type="organization" />
      <StructuredData type="faqPage" faqData={FAQS} />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[440px] flex items-center bg-charcoal-950 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${media.WOODED_COMPACTION.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-charcoal-950/65" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-anton font-bold mb-5 leading-tight tracking-tight uppercase">
            Services &amp; <span className="text-amber-400">Process</span>
          </h1>
          <p className="text-lg md:text-2xl text-charcoal-200 max-w-2xl leading-relaxed">
            What we do, in what order, and why the order matters.
          </p>
        </div>

      </section>

      {/* Service list */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              WHAT WE <span className="text-primary-700">TAKE ON</span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Residential, commercial and industrial. Asphalt paving and everything that has to happen
              around it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 60}>
                <div className="h-full bg-white p-6 md:p-7 border-2 border-gray-100 hover:border-primary-300 border border-ink-200 hover:border border-ink-900 transition-all duration-300">
                  <div className="w-14 h-14 bg-primary-700 flex items-center justify-center mb-5">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-charcoal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bebas font-bold mb-4 tracking-wide">
              SIX STEPS, <span className="text-amber-400">IN THIS ORDER</span>
            </h2>
            <p className="text-base md:text-lg text-charcoal-300 max-w-2xl mx-auto">
              Skipping any of these is how a new surface ends up cracking within a season.
            </p>
          </div>

          <div className="space-y-5">
            {PROCESS.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 70}>
                <div className="group bg-charcoal-900 border border-charcoal-800 hover:border-primary-700/60 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 p-6 md:p-8">
                    <div className="flex items-center gap-4 sm:flex-col sm:items-center flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-700 flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                        {step.number}
                      </div>
                      <step.icon className="w-6 h-6 text-amber-400 sm:mt-3" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-charcoal-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Crack filling explainer */}
      <section className="section-padding bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-3 bg-primary-200 transform -rotate-2" />
                <img
                  src={media.RAKING_EDGE.src}
                  alt={media.RAKING_EDGE.alt}
                  loading="lazy"
                  className="relative w-full border border-ink-900"
                />
                <p className="relative mt-3 text-xs text-gray-500">{media.RAKING_EDGE.caption}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120}>
              <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-5 tracking-wide">
                THE CRACKS ARE THE <span className="text-primary-700">WHOLE PROBLEM</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                Asphalt almost never fails from the top down. It fails because water gets
                through a crack, saturates the base underneath, then freezes and expands.
                Every freeze-thaw cycle widens the crack and loosens more of the base.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                That is why crack filling comes before sealer, every time. Sealer is about the
                consistency of paint &mdash; it cannot span an open crack, and coating over one
                just hides it until spring.
              </p>
              <ul className="space-y-3">
                {[
                  'Cracks cleaned out before anything is filled',
                  'Hot rubber for wider, moving cracks so the fill flexes instead of splitting',
                  'Failed and potholed areas cut out and patched, not coated over',
                  'Honest call if the surface is too far gone to be worth sealing',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-charcoal-900">
                    <span className="mt-2 w-2 h-2 bg-primary-700 flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              COMMON <span className="text-primary-700">QUESTIONS</span>
            </h2>
            <p className="text-base md:text-lg text-gray-700">Straight answers about asphalt paving</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const open = expandedFaq === index;
              return (
                <div key={faq.question} className="group">
                  <button
                    onClick={() => setExpandedFaq(open ? null : index)}
                    aria-expanded={open}
                    className="w-full px-5 md:px-8 py-5 md:py-6 text-left flex justify-between items-center gap-4 bg-white hover:bg-primary-50/50 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 border border-ink-200"
                  >
                    <span className="font-bold text-base md:text-lg text-charcoal-950">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 bg-primary-100 flex items-center justify-center transition-all duration-300 ${open ? 'rotate-45 bg-primary-700' : ''}`}>
                      <span className={`font-bold text-xl leading-none ${open ? 'text-white' : 'text-primary-800'}`}>+</span>
                    </div>
                  </button>

                  {open && (
                    <div className="px-5 md:px-8 py-5 md:py-6 bg-charcoal-50 border-x-2 border-b-2 border-gray-100 animate-fade-in">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CallToAction
        onNavigate={onNavigate}
        heading={<>Ready to Get <span className="text-amber-400">a Price?</span></>}
        body="Free on-site estimate, measured properly and given to you in writing. No obligation."
      />
    </div>
  );
}
