import { useState } from 'react';
import { Camera, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import CallToAction from '../components/CallToAction';
import * as media from '../config/media';
import { PageProps } from '../types';

export default function GalleryPage({ onNavigate }: PageProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const hasRealPhotos = media.REAL_PROJECT_PHOTOS.length > 0;
  /* Only A1's own photographs remain, so there is no stock fallback to choose
     between any more — the gallery is simply his work. */
  const photos: media.Photo[] = media.REAL_PROJECT_PHOTOS;

  return (
    <div className="bg-white">
      <SEOHead
        title="Gallery | Asphalt Paving, Tar & Chip and Resurfacing"
        description="What asphalt paving, tar and chip and resurfacing actually look like — from worn grey pavement through to a freshly sealed, freshly striped surface."
        keywords={['asphalt paving photos', 'tar and chip pictures', 'parking lot paving examples']}
      />
      <StructuredData type="organization" />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-charcoal-950 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${media.WOODED_COMPACTION.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-charcoal-950/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-anton font-bold mb-5 leading-tight tracking-tight uppercase">
            What the Work <span className="text-amber-400">Looks Like</span>
          </h1>
          <p className="text-lg md:text-2xl text-charcoal-200 max-w-2xl leading-relaxed">
            Driveways, private lanes and estate approaches across West Michigan &mdash;
            base to finished surface.
          </p>
        </div>

      </section>

      <section className="relative section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasRealPhotos && (
            /**
             * Honest framing. The Pavingtemplate repo shipped with the previous
             * client's own project videos; reusing those here would be passing off
             * another contractor's work as Bill's. Populate
             * media.REAL_PROJECT_PHOTOS and this notice disappears automatically,
             * replaced by a genuine "our recent work" gallery.
             */
            <div className="flex items-start gap-4 bg-primary-50 border-2 border-primary-200 p-5 md:p-6 mb-10 md:mb-14 max-w-4xl mx-auto">
              <Info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal-950 mb-1">
                  These images show the trade, not our own completed jobs.
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  They are here so you can see exactly what each step looks like. Photos from
                  our own projects go up as the season runs &mdash; and if you would like to see
                  work near you before booking, just ask when you call.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-4 tracking-wide">
              {hasRealPhotos ? (
                <>OUR RECENT <span className="text-primary-500">WORK</span></>
              ) : (
                <>ASPHALT PAVING, <span className="text-primary-500">STEP BY STEP</span></>
              )}
            </h2>
            <p className="text-base md:text-lg text-gray-700">Tap any image to see it larger</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {photos.map((photo, index) => (
              <AnimatedSection key={photo.src} delay={(index % 3) * 80}>
                <button
                  onClick={() => setLightbox(index)}
                  className="group relative w-full overflow-hidden shadow-theme hover:shadow-theme-lg transition-all duration-500 hover:-translate-y-1 bg-charcoal-900 text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.thumb}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-sm md:text-base">{photo.caption}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {!hasRealPhotos && (
            <p className="text-xs text-gray-500 text-center mt-10">
              Photography licensed from Pexels and used to illustrate the services described.
            </p>
          )}
        </div>
      </section>

      <CallToAction
        onNavigate={onNavigate}
        heading={<>Want This for <span className="text-amber-400">Your Pavement?</span></>}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-charcoal-950/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-12 h-12 bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full cursor-default"
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                className="w-full max-h-[75vh] object-contain shadow-theme-lg"
              />
              <figcaption className="text-center text-charcoal-200 mt-4 text-sm md:text-base">
                {photos[lightbox].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
