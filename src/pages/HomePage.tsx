import {
  CheckCircle, Phone, Shield, DollarSign, Clock, Droplet,
  Wrench, PaintRoller, MapPin, TrendingDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import Slider from '../components/Slider';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import BenefitCard from '../components/BenefitCard';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import InteractiveServiceMap from '../components/InteractiveServiceMap';
import SectionDivider from '../components/SectionDivider';
import CallToAction from '../components/CallToAction';
import VideoPlayer from '../components/VideoPlayer';
import { BUSINESS_INFO } from '../config/businessInfo';
import * as media from '../config/media';
import { PageProps } from '../types';

const TRUST_ICONS = [MapPin, DollarSign, Shield, CheckCircle];

export default function HomePage({ onNavigate }: PageProps) {
  const { phone, phoneRaw } = BUSINESS_INFO.contact;

  const trustBadges = BUSINESS_INFO.trustPoints.map((text, i) => ({
    icon: TRUST_ICONS[i % TRUST_ICONS.length],
    text,
  }));

  return (
    <div className="bg-white">
      <SEOHead
        title="Asphalt Paving Grand Rapids | Driveways, Lots & Tar and Chip"
        description="Asphalt paving, tar and chip, resurfacing and sealcoating for residential, commercial and industrial property across Grand Rapids and West Michigan. Free written estimates."
        keywords={[
          'asphalt paving Grand Rapids',
          'driveway paving Grand Rapids MI',
          'tar and chip Michigan',
          'parking lot paving Grand Rapids',
          'asphalt contractor West Michigan',
        ]}
      />
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="localBusiness" />

      <Slider
        image={media.HERO.src}
        video={media.HERO_VIDEO}
        title={<>Anything That Involves <span>Asphalt.</span></>}
        subtitle="Asphalt paving, tar and chip, resurfacing and sealcoating across Grand Rapids and West Michigan. Residential, commercial and industrial. Free written estimates, and a real person on the phone."
        buttonText={`Call ${phone}`}
        buttonLink={`tel:${phoneRaw}`}
        altText={media.HERO.alt}
        type="default"
        usePhoneIcon
      />

      {/* ── Why the base matters ───────────────────────────────────────── */}
      <section className="relative py-12 md:py-28 bg-gradient-to-br from-primary-50 via-white to-charcoal-50 overflow-hidden texture-overlay">
        <div className="absolute inset-0 diagonal-split bg-gradient-to-br from-primary-100/30 to-transparent" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-500/10 blur-3xl floating-element" />
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-amber-400/10 blur-3xl floating-element" style={{ animationDelay: '3s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bebas font-bold text-charcoal-950 mb-4 md:mb-6 leading-tight md:leading-none tracking-tight px-4">
              SEALING COSTS LESS <span className="text-primary-500">THAN REPLACING</span>
            </h2>
            <p className="text-xl md:text-xl lg:text-2xl text-primary-600 font-semibold mb-4 md:mb-6 tracking-wide">
              Built from the ground up, not just topped off.
            </p>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              West Michigan asphalt takes a beating. Water gets into a crack, freezes, and
              our <span className="font-bold text-charcoal-950">freeze-thaw winters</span> pry
              the surface apart from underneath. Almost every failed driveway we are called to
              look at failed in the base, not on top, which is why the ground prep and the stone
              base get the attention here before any asphalt goes down.
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="text-base md:text-lg text-gray-700 leading-relaxed italic border-l-4 border-primary-500 pl-4 md:pl-6 bg-primary-50/60 py-4 md:py-5 mb-8 mx-4">
                <p className="font-semibold text-charcoal-950 mb-2 not-italic">The short version:</p>
                &ldquo;Water is what destroys asphalt. Sealing keeps it out, and crack filling
                closes the doors it was getting in through.&rdquo;
              </div>
            </motion.div>

            {/* Illustrative comparison — stock, and captioned as such. */}
            <BeforeAfterGallery
              comparisons={[
                {
                  before: { src: media.CRACKED_ASPHALT.src, alt: media.CRACKED_ASPHALT.alt },
                  after: { src: media.SEALED_WET.src, alt: media.SEALED_WET.alt },
                  beforeLabel: 'UNSEALED',
                  afterLabel: 'SEALED',
                  caption: 'Grey, cracking asphalt versus a freshly sealed surface.',
                },
                {
                  before: { src: media.STRIPING.src, alt: media.STRIPING.alt },
                  after: { src: media.PARKING_STALLS.src, alt: media.PARKING_STALLS.alt },
                  beforeLabel: 'WORN LINES',
                  afterLabel: 'RE-STRIPED',
                  caption: 'Faded stall markings versus a crisp re-stripe.',
                },
              ]}
              disclaimer="Illustrative examples of the work, not photos of completed A1 Paving projects."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 px-4"
            >
              {[
                {
                  icon: TrendingDown,
                  title: 'Far Cheaper Than Repaving',
                  description: 'Sealing is a fraction of the cost of tearing out and replacing asphalt.',
                },
                {
                  icon: Droplet,
                  title: 'Keeps Water Out',
                  description: 'The coat sheds water instead of letting it soak into the surface.',
                },
                {
                  icon: Clock,
                  title: 'Buys You Years',
                  description: 'On a regular cycle, sealing pushes resurfacing much further out.',
                },
                {
                  icon: PaintRoller,
                  title: 'Looks New Again',
                  description: 'Grey, faded asphalt comes back to a deep, even black.',
                },
                {
                  icon: Wrench,
                  title: 'Cracks Handled First',
                  description: 'We fill and seal cracks before coating, because sealer alone will not bridge them.',
                },
                {
                  icon: Shield,
                  title: 'Resists Oil & Gas',
                  description: 'A sealed surface stands up to drips far better than bare asphalt.',
                },
              ].map((benefit, index) => (
                <BenefitCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  index={index}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-charcoal-950 shadow-theme-lg p-6 md:p-8 mx-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6 text-white">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-400 mb-1 uppercase tracking-wide">
                    Pricing depends on square footage and condition
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2">
                    Every quote is measured on site
                  </div>
                  <p className="text-charcoal-300 text-sm md:text-base">
                    Two driveways the same size can price differently &mdash; cracking, oil
                    staining and edge damage all matter. We measure, look at the condition,
                    and put the number in writing.
                  </p>
                </div>
                <a
                  href={`tel:${phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-4 rounded-theme transition-colors whitespace-nowrap"
                >
                  <Phone className="w-5 h-5" />
                  Get a Number
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <SectionDivider variant="triangle" position="bottom" fillColor="white" />
      </section>

      {/* ── What we do ─────────────────────────────────────────────────── */}
      <AnimatedSection className="relative py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              WHAT WE <span className="text-primary-500">DO</span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Asphalt paving is the core of it. Driveways, parking lots, tar and chip,
              resurfacing and everything else that involves asphalt, from residential
              through industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                photo: media.RESIDENTIAL_STREET,
                title: 'Residential Driveways',
                copy: 'Single driveways, long rural lanes, and everything between. Cracks filled, edges cleaned up, then an even coat.',
              },
              {
                photo: media.STRIPING,
                title: 'Commercial Lots',
                copy: 'Retail, office, multifamily and industrial lots. Full paving, resurfacing, and stall lines, arrows and ADA markings.',
              },
              {
                photo: media.CRACK_SEALING,
                title: 'Crack Filling & Repair',
                copy: 'Ground prep and a compacted stone base. This is the part that decides whether the finished surface actually holds.',
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 100}>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group text-left w-full h-full bg-white border-2 border-gray-100 hover:border-primary-300 shadow-theme hover:shadow-theme-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden bg-charcoal-900">
                    <img
                      src={card.photo.thumb}
                      alt={card.photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 to-transparent" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl md:text-2xl font-bold text-charcoal-950 mb-3 group-hover:text-primary-500 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{card.copy}</p>
                    <span className="text-sm font-semibold text-primary-500 group-hover:translate-x-1 inline-block transition-transform">
                      See the process &rarr;
                    </span>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <SectionDivider variant="arrow" position="bottom" fillColor="#16161A" />
      </AnimatedSection>

      {/* ── Who you're dealing with ────────────────────────────────────── */}
      <section className="relative py-16 md:py-28 bg-charcoal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas font-bold mb-4 tracking-wide">
              WHO YOU&rsquo;RE <span className="text-amber-400">DEALING WITH</span>
            </h2>
            <p className="text-base md:text-lg text-charcoal-300 max-w-2xl mx-auto">
              A local outfit based on East Appleway in Grand Rapids, working both sides of the
              Michigan&ndash;Michigan line.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14">
            {trustBadges.map((badge, index) => (
              <AnimatedSection key={badge.text} delay={index * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500 flex items-center justify-center mb-3 md:mb-4">
                    <badge.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="font-bold text-sm md:text-base">{badge.text}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary-500/20 transform rotate-2" />
              <img
                src={media.SEALING.src}
                alt={media.SEALING.alt}
                loading="lazy"
                className="relative w-full shadow-theme-lg"
              />
              <p className="relative mt-3 text-xs text-charcoal-400">{media.SEALING.caption}</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bebas font-bold mb-6 tracking-wide">
                LOCAL, AND EASY TO <span className="text-amber-400">GET HOLD OF</span>
              </h3>
              <p className="text-base md:text-lg text-charcoal-300 mb-6 leading-relaxed">
                You call the number, you get Bill. We come out and look at the actual
                surface, tell you what it needs and what it does not, and put a written price
                in your hand before anything starts.
              </p>
              <ul className="space-y-3">
                {[
                  'Free written estimate before any work begins',
                  'Cracks filled and sealed as part of the job, not as a surprise add-on',
                  'Straight answer if sealing is not the right call for your surface',
                  `Working radius of about ${BUSINESS_INFO.serviceArea.radius} miles from Grand Rapids`,
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-charcoal-200">
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-charcoal-400">
                Paving season here runs {BUSINESS_INFO.season} &mdash; hot mix has to be laid
                and compacted while it is still at temperature.
              </p>
            </div>
          </div>
        </div>
        <SectionDivider variant="split" position="bottom" fillColor="#F0FDF4" />
      </section>

      {/* ── In his customer's words ────────────────────────────────────── */}
      <section className="relative py-16 md:py-28 bg-charcoal-950 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold text-white mb-4 tracking-wide">
                DON'T TAKE <span className="text-amber-400">OUR WORD FOR IT</span>
              </h2>
              <p className="text-base md:text-lg text-charcoal-200 max-w-2xl mx-auto leading-relaxed">
                A customer talking about their finished driveway, on camera and unedited.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="max-w-3xl mx-auto">
              <VideoPlayer clip={media.TESTIMONIAL_VIDEO} className="shadow-theme-lg" />
            </div>
          </AnimatedSection>
        </div>
        <SectionDivider variant="triangle" position="bottom" fillColor="white" />
      </section>

      {/* ── The work, moving ───────────────────────────────────────────── */}
      <section className="relative py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
                ON THE <span className="text-primary-500">JOB</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Clips from our own jobs across West Michigan. Tap any one to play it.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {media.WORK_CLIPS.map((clip, i) => (
              <AnimatedSection key={clip.src} delay={(i % 3) * 80}>
                <VideoPlayer clip={clip} className="shadow-theme" />
              </AnimatedSection>
            ))}
          </div>
        </div>
        <SectionDivider variant="wave" position="bottom" fillColor="#F0FDF4" />
      </section>

      {/* ── Service area map ───────────────────────────────────────────── */}
      <section className="relative py-16 md:py-28 bg-gradient-to-br from-white via-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveServiceMap onNavigate={onNavigate} />
        </div>
        <SectionDivider variant="wave" position="bottom" fillColor="#16161A" />
      </section>

      <CallToAction
        onNavigate={onNavigate}
        heading={<>Get Your Free <span className="text-amber-400">Estimate</span></>}
      />
    </div>
  );
}
