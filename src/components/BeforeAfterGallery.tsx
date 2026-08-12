import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Comparison {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

interface BeforeAfterGalleryProps {
  comparisons: Comparison[];
  /**
   * Shown once beneath the set. Use it to be explicit when the images are
   * illustrative stock rather than the company's own completed jobs.
   */
  disclaimer?: string;
}

export default function BeforeAfterGallery({ comparisons, disclaimer }: BeforeAfterGalleryProps) {
  return (
    <div className="space-y-12">
      {comparisons.map((comparison, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center bg-white p-6 lg:p-8 shadow-2xl border border-gray-100">
            <div className="relative group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
                <img
                  src={comparison.before.src}
                  alt={comparison.before.alt}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
              </div>
              <div className="absolute top-4 left-4 bg-charcoal-800 px-5 py-2.5 font-bold text-white text-sm md:text-base tracking-wider shadow-lg">
                {comparison.beforeLabel ?? 'BEFORE'}
              </div>
            </div>

            <div className="flex justify-center lg:px-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-xl lg:rotate-0 rotate-90 transition-transform duration-300">
                  <ArrowRight className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
                <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30 animate-pulse" />
              </div>
            </div>

            <div className="relative group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
                <img
                  src={comparison.after.src}
                  alt={comparison.after.alt}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-2 ring-primary-500/0 group-hover:ring-primary-500/80 transition-all duration-300" />
              </div>
              <div className="absolute top-4 left-4 bg-gradient-to-br from-primary-500 to-primary-600 px-5 py-2.5 font-bold text-white text-sm md:text-base tracking-wider shadow-lg">
                {comparison.afterLabel ?? 'AFTER'}
              </div>
            </div>

            {comparison.caption && (
              <p className="lg:col-span-3 text-sm text-gray-500 text-center">
                {comparison.caption}
              </p>
            )}
          </div>

          <div className="absolute -bottom-3 -right-3 w-full h-full bg-primary-100 -z-10" />
        </motion.div>
      ))}

      {disclaimer && (
        <p className="text-xs text-gray-500 text-center max-w-2xl mx-auto px-4">
          {disclaimer}
        </p>
      )}
    </div>
  );
}
