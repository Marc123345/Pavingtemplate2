import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_INFO } from '../config/businessInfo';
import { LOCATIONS } from '../data/locations';
import { NavigateFn } from '../types';

/**
 * Schematic map of the service area, not a real projection.
 *
 * Marker positions are derived from each city's real latitude/longitude
 * relative to the Grand Rapids base, scaled at ~1.35 SVG units per mile with
 * longitude compressed by cos(43.0°). So the relative bearings and spacing are
 * geographically honest even though there is no basemap underneath.
 */
const HUB = { x: 50, y: 50, label: 'Grand Rapids' };

const POSITIONS: Record<string, { x: number; y: number }> = {
  'grand-rapids': { x: 50.0, y: 50.0 },
  wyoming: { x: 47.5, y: 54.7 },
  kentwood: { x: 55.4, y: 58.8 },
  grandville: { x: 43.5, y: 55.0 },
  walker: { x: 42.9, y: 47.6 },
  rockford: { x: 57.4, y: 35.4 },
  'cedar-springs': { x: 58.0, y: 25.8 },
  lowell: { x: 72.3, y: 52.7 },
  ada: { x: 62.0, y: 50.3 },
  caledonia: { x: 60.7, y: 66.2 },
  hudsonville: { x: 36.6, y: 58.5 },
  jenison: { x: 39.0, y: 55.2 },
  holland: { x: 19.9, y: 66.4 },
  zeeland: { x: 26.0, y: 64.1 },
  allendale: { x: 30.5, y: 49.2 },
  'byron-center': { x: 46.3, y: 64.2 },
  greenville: { x: 78.4, y: 30.2 },
  ionia: { x: 90.8, y: 47.7 },
};

const SPOKES = LOCATIONS.filter((l) => l.slug !== 'grand-rapids' && POSITIONS[l.slug]);

interface InteractiveServiceMapProps {
  onNavigate: NavigateFn;
}

export default function InteractiveServiceMap({ onNavigate }: InteractiveServiceMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedLocation = LOCATIONS.find((l) => l.slug === selected);
  const { phone, phoneRaw } = BUSINESS_INFO.contact;

  const goToCity = (slug: string) => {
    onNavigate('location', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bebas font-bold text-charcoal-950 mb-3 md:mb-4 tracking-wide">
            WHERE WE <span className="text-primary-500">WORK</span>
          </h2>
          <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8">
            {LOCATIONS.length} cities across Grand Rapids County and Kent County, inside about a{' '}
            {BUSINESS_INFO.serviceArea.radius}-mile radius of our Grand Rapids yard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-charcoal-950 p-4 md:p-6 border-2 border-charcoal-800 shadow-2xl aspect-square"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="hubGlow" cx="57%" cy="47%">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={HUB.x} cy={HUB.y} r="42" fill="url(#hubGlow)" />

            {SPOKES.map((loc, index) => {
              const pos = POSITIONS[loc.slug];
              const active = hovered === loc.slug || selected === loc.slug;

              return (
                <g key={loc.slug}>
                  <motion.line
                    x1={HUB.x}
                    y1={HUB.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={active ? '#FACC15' : '#3A3A41'}
                    strokeWidth={active ? 0.5 : 0.2}
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />

                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    onHoverStart={() => setHovered(loc.slug)}
                    onHoverEnd={() => setHovered(null)}
                    onClick={() => setSelected(selected === loc.slug ? null : loc.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx={pos.x} cy={pos.y} r={active ? 2.5 : 1.8} fill={active ? '#FACC15' : '#15803D'} className="transition-all duration-300" />
                    <circle cx={pos.x} cy={pos.y} r={active ? 4 : 3} fill="none" stroke={active ? '#FACC15' : '#14532D'} strokeWidth="0.3" opacity={active ? 0.7 : 0.4} className="transition-all duration-300" />
                    {active && (
                      <text x={pos.x} y={pos.y - 4.5} textAnchor="middle" fontSize="3" fontWeight="bold" fill="#FFFFFF" className="pointer-events-none">
                        {loc.city}
                      </text>
                    )}
                  </motion.g>
                </g>
              );
            })}

            {/* home base */}
            <motion.circle cx={HUB.x} cy={HUB.y} r="3" fill="#FACC15" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
            <motion.circle cx={HUB.x} cy={HUB.y} r="5.5" fill="none" stroke="#FACC15" strokeWidth="0.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.5 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
            <text x={HUB.x} y={HUB.y + 9} textAnchor="middle" fontSize="2.8" fontWeight="bold" fill="#FACC15">
              Grand Rapids
            </text>
            <text x={HUB.x} y={HUB.y + 12.5} textAnchor="middle" fontSize="2.2" fill="#88888F">
              home base
            </text>
          </svg>

          <div className="absolute bottom-2 left-3 md:bottom-4 md:left-5 text-charcoal-400">
            <p className="font-semibold text-xs md:text-sm">Interactive map</p>
            <p className="text-xs hidden md:block">Tap a marker for detail</p>
          </div>
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 md:space-y-6"
        >
          {selectedLocation ? (
            <motion.div
              key={selectedLocation.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-500 text-white p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bebas font-bold tracking-wide mb-1">
                    {selectedLocation.city}, {selectedLocation.state}
                  </h3>
                  <p className="text-sm md:text-base text-primary-100 font-semibold">
                    {selectedLocation.county} &middot;{' '}
                    {selectedLocation.miles === 0
                      ? 'our base'
                      : `about ${selectedLocation.miles} mi ${selectedLocation.direction}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-white/80 hover:text-white text-2xl font-bold leading-none"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm md:text-base text-primary-50 mb-4">
                ZIP codes: {selectedLocation.zipCodes.join(', ')}
              </p>
              <ul className="text-sm md:text-base text-primary-50 mb-6 space-y-1.5">
                {selectedLocation.commonWork.slice(0, 3).map((w) => (
                  <li key={w}>&bull; {w}</li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => goToCity(selectedLocation.slug)}
                  className="flex items-center justify-center gap-2 bg-white text-primary-600 px-5 py-3 font-bold text-sm md:text-base hover:bg-primary-50 transition-colors"
                >
                  {selectedLocation.city} page
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center justify-center gap-2 bg-charcoal-950 text-white px-5 py-3 font-bold text-sm md:text-base hover:bg-charcoal-900 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-charcoal-50 p-6 md:p-8 border-2 border-charcoal-200">
              <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary-500 mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-charcoal-950 mb-2">Pick a city</h3>
              <p className="text-sm md:text-base text-gray-600">
                Tap any marker or name to see the ZIP codes we cover there and the work we
                get called out for most.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {LOCATIONS.map((loc, index) => (
              <motion.button
                key={loc.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.03 }}
                onClick={() => setSelected(selected === loc.slug ? null : loc.slug)}
                onMouseEnter={() => setHovered(loc.slug)}
                onMouseLeave={() => setHovered(null)}
                className={`p-3 md:p-4 text-left text-sm md:text-base font-semibold transition-all duration-300 border-2 ${
                  selected === loc.slug
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xl'
                    : hovered === loc.slug
                    ? 'bg-primary-50 text-charcoal-950 border-primary-400'
                    : 'bg-white text-charcoal-950 border-gray-200 hover:border-primary-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${selected === loc.slug ? 'text-white' : 'text-primary-500'}`} />
                  <span className="truncate">{loc.city}</span>
                  <span className={`ml-auto text-xs font-normal ${selected === loc.slug ? 'text-primary-100' : 'text-gray-400'}`}>
                    {loc.state}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 md:mt-8 bg-charcoal-950 text-white p-6 md:p-8 shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bebas font-bold mb-3 tracking-wide">
              NOT ON THE LIST?
            </h3>
            <p className="text-sm md:text-base text-charcoal-300 mb-5">
              The radius is a guide, not a fence. Call and we will tell you straight away
              whether we can get to you.
            </p>
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-primary-500 hover:bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg transition-colors w-full sm:w-auto rounded-md"
            >
              <Phone className="w-5 h-5" />
              {phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
