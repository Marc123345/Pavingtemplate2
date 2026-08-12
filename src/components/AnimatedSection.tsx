import { useEffect, useRef, useState, ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'scale-in';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  const animationClassMap = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in',
  };

  const animationClass = isMobile ? '' : (isVisible ? animationClassMap[animation] : 'opacity-0');
  const delayStyle = isMobile || delay === 0 ? {} : { animationDelay: `${delay}ms` };

  return (
    <div ref={ref} className={`${animationClass} ${className}`} style={delayStyle}>
      {children}
    </div>
  );
}
