import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { Clip } from '../config/media';

interface Props {
  clip: Clip;
  className?: string;
  /**
   * Overrides the shape. Normally leave this alone: the frame follows the
   * clip's own `portrait` flag, so a vertical clip cannot be dropped into a
   * widescreen frame by forgetting to pass anything.
   */
  shape?: 'video' | 'portrait';
}

/**
 * A click-to-play clip of A1's work.
 *
 * Deliberately does not autoplay. These sit further down the page, several to
 * a row — starting five videos the moment they scroll into view would burn a
 * visitor's mobile data on clips they never asked to watch, and the sound is
 * part of the point on the testimonial. Nothing is fetched until the poster is
 * clicked: `preload="none"` means the poster image is the entire cost of a
 * clip nobody plays.
 */
export default function VideoPlayer({ clip, className = '', shape }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // The element exists already, so this plays the source rather than
    // waiting a render for the browser to notice a new `src`.
    void ref.current?.play();
  };

  // The clip's own orientation decides the frame unless explicitly overridden.
  const resolved = shape ?? (clip.portrait ? 'portrait' : 'video');
  const aspect = resolved === 'portrait' ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <div className={`relative overflow-hidden bg-charcoal-950 ${aspect} ${className}`}>
      <video
        ref={ref}
        className="w-full h-full object-cover"
        poster={clip.poster}
        preload="none"
        playsInline
        controls={started}
        onPlay={() => setStarted(true)}
      >
        <source src={clip.src} type="video/mp4" />
        Your browser cannot play this video.
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal-950/35 hover:bg-charcoal-950/20 transition-colors duration-300 group"
          aria-label={`Play video: ${clip.title}`}
        >
          <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-7 h-7 md:w-9 md:h-9 text-white translate-x-0.5" fill="currentColor" />
          </span>
          <span className="text-white font-semibold text-sm md:text-base px-4 text-center drop-shadow-lg">
            {clip.title}
          </span>
        </button>
      )}
    </div>
  );
}
