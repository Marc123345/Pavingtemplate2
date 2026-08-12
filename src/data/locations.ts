/**
 * Service-area landing pages. One entry per city = one indexable page at
 * /asphalt-paving/<slug>, which is what actually wins local searches like
 * "asphalt paving grand rapids".
 *
 * Distances are straight-line from Grand Rapids, rounded — they are there to
 * show the crew is genuinely close by, not as ETAs. Everything is inside the
 * 40-mile service radius given in the discovery form.
 *
 * The copy sticks to pavement, property types and West Michigan weather. No
 * invented job counts, no named past clients, nothing the crew has not said
 * they do.
 */
export interface Location {
  slug: string;
  city: string;
  state: 'MI';
  stateName: 'Michigan';
  county: string;
  zipCodes: string[];
  /** Straight-line miles from Grand Rapids. */
  miles: number;
  direction: string;
  /** Lead paragraph. Keep it about pavement and property types — no invented facts. */
  intro: string;
  /** What the crew most often gets called out for here. */
  commonWork: string[];
}

export const LOCATIONS: Location[] = [
  {
    slug: 'grand-rapids',
    city: 'Grand Rapids',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49503', '49504', '49505', '49506', '49507', '49508'],
    miles: 0,
    direction: 'central',
    intro:
      'Grand Rapids is the centre of our service area and where most of our work sits. Michigan winters are hard on asphalt: water gets into a crack, freezes, and lifts the surface apart from the inside. Most of what we get called out for here started as a crack somebody left through one winter too many.',
    commonWork: [
      'Residential driveway paving',
      'Commercial and retail parking lots',
      'Resurfacing and overlays on failing asphalt',
      'Sealcoating and crack repair',
    ],
  },
  {
    slug: 'wyoming',
    city: 'Wyoming',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49509', '49519', '49548'],
    miles: 5,
    direction: 'southwest',
    intro:
      'Wyoming has a mix of older residential streets and a lot of light industrial off Clyde Park and 28th. Industrial lots take heavy repeated loading, which shows up as rutting and alligator cracking long before the surface looks worn out.',
    commonWork: [
      'Industrial and warehouse lot paving',
      'Driveway replacement on older homes',
      'Milling and overlay on rutted lots',
      'Parking lot repairs',
    ],
  },
  {
    slug: 'kentwood',
    city: 'Kentwood',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49508', '49512', '49546'],
    miles: 7,
    direction: 'southeast',
    intro:
      'Kentwood runs heavily to commercial frontage and apartment complexes, where the parking lot is the first thing a tenant or customer walks on. Those lots are usually large enough that resurfacing beats full replacement if the base is still sound.',
    commonWork: [
      'Commercial parking lot paving',
      'Apartment and multi-family lots',
      'Resurfacing and overlays',
      'Sealcoating',
    ],
  },
  {
    slug: 'grandville',
    city: 'Grandville',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49418'],
    miles: 8,
    direction: 'southwest',
    intro:
      'Grandville is mostly established residential with retail along Rivertown. Driveways here tend to be from the same era, which means a lot of them reach the end of their life within a few years of each other.',
    commonWork: [
      'Residential driveway paving',
      'Retail and small commercial lots',
      'Resurfacing over sound base',
      'Gravel driveway installation',
    ],
  },
  {
    slug: 'walker',
    city: 'Walker',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49534', '49544'],
    miles: 7,
    direction: 'northwest',
    intro:
      'Walker has a strong industrial and distribution presence, and those yards see truck traffic that ordinary residential-spec asphalt will not survive. Depth of base matters more than surface here.',
    commonWork: [
      'Heavy-duty industrial paving',
      'Truck yards and loading areas',
      'Milling and reconstruction',
      'Private access roads',
    ],
  },
  {
    slug: 'rockford',
    city: 'Rockford',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49341'],
    miles: 15,
    direction: 'north',
    intro:
      'Rockford runs to larger lots and longer driveways, and plenty of properties sit back off the road. Long runs are where tar and chip earns its keep, because it covers distance at a lower cost per foot than hot mix.',
    commonWork: [
      'Long residential driveways',
      'Tar and chip surfacing',
      'Private lanes and shared access',
      'Asphalt paving and repairs',
    ],
  },
  {
    slug: 'cedar-springs',
    city: 'Cedar Springs',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49319'],
    miles: 20,
    direction: 'north',
    intro:
      'Cedar Springs is rural enough that gravel is still common, and a lot of our work here is either maintaining gravel properly or converting a drive that has become impossible to grade. Both are jobs we do.',
    commonWork: [
      'Gravel driveway installation and regrading',
      'Gravel to asphalt conversions',
      'Tar and chip on long drives',
      'Farm lanes',
    ],
  },
  {
    slug: 'lowell',
    city: 'Lowell',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49331'],
    miles: 18,
    direction: 'east',
    intro:
      'Lowell sits in farm country, and farm lanes take a specific kind of punishment: heavy equipment, seasonal use, and no forgiveness from the weather. A properly built base is the whole job out here.',
    commonWork: [
      'Farm lanes and equipment access',
      'Tar and chip private roads',
      'Gravel driveways',
      'Asphalt paving',
    ],
  },
  {
    slug: 'ada',
    city: 'Ada',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49301'],
    miles: 11,
    direction: 'east',
    intro:
      'Ada has a lot of larger residential properties with driveways that run a good distance from the road, often with a slope. Drainage decides how long that asphalt lasts, so grading gets more attention here than the surface does.',
    commonWork: [
      'Long and sloped residential driveways',
      'Asphalt paving and resurfacing',
      'Tar and chip surfacing',
      'Sealcoating',
    ],
  },
  {
    slug: 'caledonia',
    city: 'Caledonia',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49316'],
    miles: 14,
    direction: 'southeast',
    intro:
      'Caledonia has been building steadily, and newer subdivisions reach the point where the original driveway needs attention at roughly the same time across a whole street. Doing several on one trip keeps the cost down for everyone.',
    commonWork: [
      'Subdivision and roadway paving',
      'New residential driveways',
      'Sealcoating on newer asphalt',
      'Parking lot paving',
    ],
  },
  {
    slug: 'hudsonville',
    city: 'Hudsonville',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ottawa County',
    zipCodes: ['49426'],
    miles: 13,
    direction: 'southwest',
    intro:
      'Hudsonville mixes agricultural property with fast residential growth. That means farm lanes and new subdivision drives inside the same few miles, which are two very different builds.',
    commonWork: [
      'Farm lanes and agricultural access',
      'Residential driveway paving',
      'Gravel driveways',
      'Private roads',
    ],
  },
  {
    slug: 'jenison',
    city: 'Jenison',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ottawa County',
    zipCodes: ['49428', '49429'],
    miles: 10,
    direction: 'west',
    intro:
      'Jenison is largely established residential, and most driveways here have already had at least one repair. Whether the right answer is an overlay or a full replacement comes down to whether the base underneath is still holding.',
    commonWork: [
      'Driveway resurfacing and overlays',
      'Full driveway replacement',
      'Sealcoating and crack filling',
      'Small commercial lots',
    ],
  },
  {
    slug: 'holland',
    city: 'Holland',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ottawa County',
    zipCodes: ['49423', '49424'],
    miles: 26,
    direction: 'southwest',
    intro:
      'Holland gets lake-effect weather, which means more freeze-thaw cycles than places further inland. Every cycle works water deeper into any crack that is already open, so sealing early matters more here than most of the service area.',
    commonWork: [
      'Sealcoating and crack repair',
      'Commercial parking lots',
      'Residential driveway paving',
      'Resurfacing and overlays',
    ],
  },
  {
    slug: 'zeeland',
    city: 'Zeeland',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ottawa County',
    zipCodes: ['49464'],
    miles: 24,
    direction: 'southwest',
    intro:
      'Zeeland has a strong manufacturing base, and industrial yards there carry loads that ordinary asphalt is not built for. Those jobs get a deeper base and a mix specified for the traffic.',
    commonWork: [
      'Industrial and manufacturing yards',
      'Heavy-duty parking lots',
      'Milling and reconstruction',
      'Asphalt paving',
    ],
  },
  {
    slug: 'allendale',
    city: 'Allendale',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ottawa County',
    zipCodes: ['49401'],
    miles: 15,
    direction: 'west',
    intro:
      'Allendale has a large student rental population alongside farmland, so parking areas take constant turnover and lanes take farm equipment. Both wear pavement faster than a normal residential driveway.',
    commonWork: [
      'Multi-unit and rental parking areas',
      'Farm lanes',
      'Asphalt paving and patching',
      'Gravel driveways',
    ],
  },
  {
    slug: 'byron-center',
    city: 'Byron Center',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Kent County',
    zipCodes: ['49315'],
    miles: 12,
    direction: 'south',
    intro:
      'Byron Center is growing quickly, with new residential going in alongside established rural property. New builds want a driveway done right the first time, and the older places usually need the base rebuilt rather than the surface patched again.',
    commonWork: [
      'New construction driveways',
      'Subdivision paving',
      'Base rebuilds on failed asphalt',
      'Tar and chip surfacing',
    ],
  },
  {
    slug: 'greenville',
    city: 'Greenville',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Montcalm County',
    zipCodes: ['48838'],
    miles: 28,
    direction: 'northeast',
    intro:
      'Greenville is at the outer edge of our normal radius and worth the trip for larger jobs. Rural property here means long drives and private roads, where cost per foot decides what gets built.',
    commonWork: [
      'Long private roads',
      'Tar and chip surfacing',
      'Farm lanes',
      'Gravel driveway installation',
    ],
  },
  {
    slug: 'ionia',
    city: 'Ionia',
    state: 'MI',
    stateName: 'Michigan',
    county: 'Ionia County',
    zipCodes: ['48846'],
    miles: 30,
    direction: 'east',
    intro:
      'Ionia sits about 30 miles out, inside the radius we travel. It is farm country, so most of the work is lanes, private roads and yards that carry equipment rather than cars.',
    commonWork: [
      'Farm lanes and equipment yards',
      'Private roads',
      'Gravel driveways',
      'Asphalt paving',
    ],
  },
];

export const findLocation = (slug: string) =>
  LOCATIONS.find((l) => l.slug === slug);

export const locationSlugs = LOCATIONS.map((l) => l.slug);
