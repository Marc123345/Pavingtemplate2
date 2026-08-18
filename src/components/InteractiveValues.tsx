import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shield, X, CheckCircle, MessageCircle, Ruler, LucideIcon } from 'lucide-react';
import * as media from '../config/media';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  details: string[];
  motto: string;
}

/**
 * Deliberately about *process* rather than credentials or history — this is a
 * young business, so there is no job count or founding year to point at.
 */
const values: Value[] = [
  {
    icon: Ruler,
    title: 'Priced Off a Real Measurement',
    description:
      'Nobody quotes a driveway accurately from the kerb. We measure the surface and look at its condition before giving you a number.',
    image: media.ESTATE_DRIVE.src,
    imageAlt: media.ESTATE_DRIVE.alt,
    motto: 'Measured, then written down',
    details: [
      'Square footage measured on site, not estimated from a photo',
      'Condition assessed — cracking, oil staining, edge loss, drainage',
      'Crack filling and patching included in the quote, not added later',
      'Written price in your hand before any work is scheduled',
      'No charge and no obligation for the estimate',
    ],
  },
  {
    icon: Shield,
    title: 'The Prep Gets Real Time',
    description:
      'Asphalt only lasts on a properly prepared base. Most of the work on a good job happens before any hot mix reaches the site.',
    image: media.RAKING_EDGE.src,
    imageAlt: media.RAKING_EDGE.alt,
    motto: 'The surface is the easy part',
    details: [
      'Surface cleaned of debris and loose material',
      'Vegetation cut back from edges so the coat reaches the full width',
      'Oil and fuel spots treated so the sealer does not lift there',
      'Cracks cleaned out and filled — hot rubber where the crack is moving',
      'Failed areas patched rather than coated over',
    ],
  },
  {
    icon: MessageCircle,
    title: 'You Get a Straight Answer',
    description:
      'Including when the answer is that you should not spend money on this yet, or that sealing will not fix what you actually have.',
    image: media.WOODED_LANE.src,
    imageAlt: media.WOODED_LANE.alt,
    motto: 'We will tell you not to buy it',
    details: [
      'If the surface needs resurfacing, we say so instead of coating it',
      'If it was sealed recently, we tell you to wait',
      'Plain explanation of what each step is for — no jargon',
      'A real person on the phone, reachable by call or text',
      'You hear about anything that changes before it changes',
    ],
  },
  {
    icon: CheckCircle,
    title: 'Timed Around the Weather',
    description:
      'Sealer needs dry pavement and warm enough surface temperatures to cure. We would rather move your date than coat in the wrong conditions.',
    image: media.DUSK_DRIVE.src,
    imageAlt: media.DUSK_DRIVE.alt,
    motto: 'Rather reschedule than ruin it',
    details: [
      'Forecast checked before the crew rolls out',
      'Work rescheduled rather than rushed ahead of rain',
      'Surface temperature considered, not just air temperature',
      'Realistic cure window for your specific job and that week',
      'Clear guidance on when you can walk on it and when you can drive on it',
    ],
  },
];

export default function InteractiveValues() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            onHoverStart={() => setHoveredValue(index)}
            onHoverEnd={() => setHoveredValue(null)}
          >
            <motion.button
              onClick={() => setSelectedValue(index)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-full group bg-white border border-ink-900 hover:border border-ink-900 transition-all duration-500 border-2 border-gray-100 hover:border-primary-300 overflow-hidden text-left cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-charcoal-900">
                <motion.img
                  src={value.image}
                  alt={value.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredValue === index ? 1.12 : 1 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent"
                  animate={{ opacity: hoveredValue === index ? 0.9 : 0.7 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute bottom-4 left-4 w-14 h-14 bg-primary-700 flex items-center justify-center border border-ink-900 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-charcoal-950 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-1">{value.description}</p>
                <div className="text-sm font-semibold text-primary-700 group-hover:translate-x-2 transition-transform duration-300">
                  What that means &rarr;
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedValue !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedValue(null)}
            className="fixed inset-0 bg-charcoal-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-ink-900 cursor-default"
            >
              <div className="relative h-44 md:h-64 overflow-hidden bg-charcoal-900">
                <img
                  src={values[selectedValue].image}
                  alt={values[selectedValue].imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
                <button
                  onClick={() => setSelectedValue(null)}
                  className="absolute top-3 right-3 md:top-5 md:right-5 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-300 group z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-700 flex items-center justify-center border border-ink-900 mb-3">
                    {(() => {
                      const IconComponent = values[selectedValue].icon;
                      return <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bebas font-bold text-white tracking-wide">
                    {values[selectedValue].title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-9">
                <div className="mb-6 md:mb-8">
                  <p className="text-xl md:text-2xl font-bold text-primary-700 mb-3 italic">
                    &ldquo;{values[selectedValue].motto}&rdquo;
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {values[selectedValue].description}
                  </p>
                </div>

                <div className="border-t-2 border-gray-200 pt-6 md:pt-8">
                  <h4 className="text-lg md:text-xl font-bold text-charcoal-950 mb-5">
                    In practice:
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {values[selectedValue].details.map((detail, idx) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 md:gap-4"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm md:text-base text-gray-700 flex-1">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                  <button
                    onClick={() => setSelectedValue(null)}
                    className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-3.5 px-6 text-base transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
