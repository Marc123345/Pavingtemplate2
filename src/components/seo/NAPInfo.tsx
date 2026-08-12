import { Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../../config/businessInfo';

interface NAPInfoProps {
  variant?: 'horizontal' | 'vertical' | 'footer';
  showIcons?: boolean;
  className?: string;
}

export default function NAPInfo({ variant = 'horizontal', showIcons = true, className = '' }: NAPInfoProps) {
  const { name, contact, address } = BUSINESS_INFO;

  const fullAddress = `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`;

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="font-bold text-lg">{name}</div>
        <div className="flex items-start gap-2">
          {showIcons && <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />}
          <address className="not-italic">{fullAddress}</address>
        </div>
        <div className="flex items-center gap-2">
          {showIcons && <Phone className="w-5 h-5 flex-shrink-0" />}
          <a href={`tel:${contact.phoneRaw}`} className="hover:underline">
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          {showIcons && <Mail className="w-5 h-5 flex-shrink-0" />}
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div>
          <div className="font-bold mb-1">{name}</div>
          <div className="flex items-start gap-2 text-sm">
            {showIcons && <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            <address className="not-italic">{fullAddress}</address>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {showIcons && <Phone className="w-4 h-4 flex-shrink-0" />}
          <a href={`tel:${contact.phoneRaw}`} className="hover:underline">
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {showIcons && <Mail className="w-4 h-4 flex-shrink-0" />}
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`}>
      <div className="flex items-center gap-2">
        {showIcons && <MapPin className="w-4 h-4 flex-shrink-0" />}
        <address className="not-italic text-sm">{fullAddress}</address>
      </div>
      <div className="flex items-center gap-2">
        {showIcons && <Phone className="w-4 h-4 flex-shrink-0" />}
        <a href={`tel:${contact.phoneRaw}`} className="text-sm hover:underline">
          {contact.phone}
        </a>
      </div>
      <div className="flex items-center gap-2">
        {showIcons && <Mail className="w-4 h-4 flex-shrink-0" />}
        <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
          {contact.email}
        </a>
      </div>
    </div>
  );
}
