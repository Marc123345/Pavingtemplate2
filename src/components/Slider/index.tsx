import styles from "./slider.module.css";
import { ArrowRight, Phone } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type SliderProps = {
  image?: string;
  video?: string;
  title: ReactNode;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  type?: "default" | "centered" | "overlay";
  altText?: string;
  usePhoneIcon?: boolean;
};

const Slider = ({
  image,
  video,
  title,
  subtitle,
  buttonText = "Get Started",
  buttonLink = "#contact",
  type = "default",
  altText = "Slider image",
  usePhoneIcon = false,
}: SliderProps) => {
  /**
   * Anyone who has asked their system for reduced motion gets the still
   * instead of a looping clip. Read once at mount rather than during render,
   * so the value cannot differ between the first paint and the next.
   */
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(q.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    q.addEventListener("change", onChange);
    return () => q.removeEventListener("change", onChange);
  }, []);

  const showVideo = Boolean(video) && !reduceMotion;
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div
      className={cn(
        styles.section,
        type === "centered" && styles.ipads,
        type === "overlay" && styles.macbooks
      )}
    >
      <div className={styles.overlay} />

      {showVideo ? (
        /* `poster` matters: without it the hero is a black rectangle for as
           long as the first frame takes to arrive, which on a phone connection
           is exactly when the headline is being read. The still shows
           immediately and the clip fades in over it. */
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={image}
          preload="metadata"
          aria-hidden="true"
          className={styles.video}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image}
          alt={altText}
          className={styles.image}
          loading="eager"
        />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>
              {title}
            </h1>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6">
            <a
              href={buttonLink}
              className={styles.button}
            >
              {buttonText}
              <div className={styles.circle}>
                {usePhoneIcon ? <Phone className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10" style={{ marginBottom: '-1px' }}>
        <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="white" style={{ display: 'block' }}>
          <path d="M0,0 L720,100 L1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Slider;
