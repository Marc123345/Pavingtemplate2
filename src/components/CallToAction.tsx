import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../config/businessInfo';
import { NavigateFn } from '../types';

interface CallToActionProps {
  onNavigate: NavigateFn;
  heading: React.ReactNode;
  body?: string;
  /** 'dark' sits on asphalt, 'amber' sits on the brand fill. */
  tone?: 'dark' | 'amber';
}

export default function CallToAction({
  onNavigate,
  heading,
  body = 'Tell us the address and roughly how big the surface is. We come out, measure it, and hand you a written price. No cost and no pressure.',
  tone = 'dark',
}: CallToActionProps) {
  const { phone, phoneRaw } = BUSINESS_INFO.contact;
  const onDark = tone === 'dark';

  return (
    <section className={`relative py-16 md:py-28 ${onDark ? 'bg-charcoal-950' : 'bg-primary-500'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton font-bold mb-6 tracking-tight uppercase text-white">
          {heading}
        </h2>
        <p className={`text-base md:text-xl mb-10 max-w-2xl mx-auto ${onDark ? 'text-charcoal-300' : 'text-primary-50'}`}>
          {body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4">
          <a
            href={`tel:${phoneRaw}`}
            className={`inline-flex items-center justify-center gap-3 font-bold px-8 md:px-10 py-5 text-base md:text-lg transition-all duration-200 shadow-2xl touch-manipulation min-h-[56px] rounded-md ${
              onDark
                ? 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white'
                : 'bg-charcoal-950 hover:bg-charcoal-900 active:bg-charcoal-800 text-white'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span>Call {phone}</span>
          </a>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center justify-center gap-3 font-bold px-8 md:px-10 py-5 text-base md:text-lg transition-all duration-200 touch-manipulation min-h-[56px] rounded-md border-2 ${
              onDark
                ? 'border-charcoal-700 text-white hover:border-amber-400 hover:text-amber-400'
                : 'border-primary-200 text-white hover:bg-primary-600'
            }`}
          >
            <span>Request an Estimate</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
