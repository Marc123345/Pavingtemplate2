interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'tilt' | 'triangle' | 'arrow' | 'hills' | 'split';
  position?: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
}

export default function SectionDivider({
  variant = 'wave',
  position = 'bottom',
  fillColor = 'white',
  className = ''
}: SectionDividerProps) {
  const svgVariants = {
    wave: (
      <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z" />
    ),
    curve: (
      <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" />
    ),
    tilt: (
      <path d="M0,0 L1440,80 L1440,120 L0,120 Z" />
    ),
    triangle: (
      <path d="M0,0 L720,100 L1440,0 L1440,120 L0,120 Z" />
    ),
    arrow: (
      <path d="M0,0 L720,80 L1440,0 L1440,120 L0,120 Z" />
    ),
    hills: (
      <path d="M0,0 Q360,60 720,0 T1440,0 L1440,120 L0,120 Z" />
    ),
    split: (
      <path d="M0,0 L0,40 L720,80 L1440,40 L1440,0 L1440,120 L0,120 Z" />
    )
  };

  const rotation = position === 'top' ? 'rotate-180' : '';

  return (
    <div className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg
        className={`relative block w-full h-[60px] md:h-[100px] ${rotation}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill={fillColor}
      >
        {svgVariants[variant]}
      </svg>
    </div>
  );
}
