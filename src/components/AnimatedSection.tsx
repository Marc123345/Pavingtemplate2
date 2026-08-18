import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Accepted and ignored. Kept so the ~53 existing call sites still compile. */
  animation?: 'fade-in-up' | 'fade-in' | 'scale-in';
  /** Accepted and ignored, as above. */
  delay?: number;
}

/**
 * A plain wrapper.
 *
 * This used to hold content at opacity-0 and reveal it with an
 * IntersectionObserver once it scrolled into view. The scroll animations are
 * gone, so it renders its children directly and immediately.
 *
 * It is deliberately kept as a component rather than deleted: it is used in
 * about fifty places, and leaving the signature intact — including the now
 * unused `animation` and `delay` props — meant removing the behaviour in one
 * file instead of editing every call site. It also means content can never
 * again be left invisible by a failed observer, which is the failure mode this
 * pattern has when JavaScript is slow or blocked.
 */
export default function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}
