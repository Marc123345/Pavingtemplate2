/**
 * Single source of truth for everything client-specific.
 *
 * ── CONFIRM WITH BILL BEFORE LAUNCH ───────────────────────────────────────
 * Items marked  ⚠ CONFIRM  came out of the discovery form ambiguous, or were
 * not supplied at all. Nothing here invents a credential, a founding year, or
 * a job count.
 *   1. address        — the form gave a Lebanon, TN street address, but the
 *                       service area is a 40-mile radius of Grand Rapids, MI.
 *                       Published as a service-area business with no street
 *                       address. See the note on `address` below.
 *   2. phone          — (615) is a Nashville, TN area code. It works, but a
 *                       616 number converts better in Grand Rapids.
 *   3. website        — no domain chosen yet; canonicals point at the
 *                       deployment URL on purpose.
 *   4. hours          — trade-standard default, not supplied.
 *   5. forms.jotformId — empty until a form exists for THIS business.
 *
 * Deliberately NOT on the site, and why:
 *   • Job count. The form says 15 years in business but roughly 10 jobs
 *     completed. Those two do not agree, and "10 jobs" reads as a brand new
 *     company. Left off entirely rather than published wrong.
 *   • BBB. The form explicitly says they are not a member. No badge.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS_INFO = {
  name: 'A1 Paving',
  legalName: 'A1 Paving',
  description:
    'Asphalt paving, tar and chip, sealcoating and resurfacing for residential, commercial and industrial property across Grand Rapids and West Michigan.',
  tagline: 'Anything That Involves Asphalt',

  owner: {
    name: 'Bill Cooper',
    role: 'Owner',
  },

  contact: {
    // ⚠ CONFIRM — 615 is a Nashville area code. Fine to launch with, but a
    // local 616 number is worth buying before running ads in Grand Rapids.
    phone: '+1 (615) 496-4167',
    phoneRaw: '+16154964167',
    email: 'a1paving69@icloud.com',
    /**
     * ⚠ CONFIRM — no domain yet, so this is the deployment URL.
     *
     * It drives every canonical tag, the JSON-LD @id, and the generated
     * sitemap.xml + robots.txt. Pointing canonicals at a domain that does not
     * resolve tells Google the real version of each page lives nowhere, which
     * stops the site being indexed at all. Change this one line when the
     * domain is attached, redeploy, resubmit the sitemap.
     */
    website: 'https://a1-paving-five.vercel.app',
  },

  /**
   * ⚠ CONFIRM — the discovery form gave 2748 SE Tater Peeler Rd, Lebanon TN,
   * then said the business is "now in Grand Rapids, Michigan" and serves a
   * 40-mile radius of Grand Rapids.
   *
   * Publishing the Tennessee street address on a site targeting Grand Rapids
   * would put a 600-mile-away address in the schema and on every page, which
   * is the fastest way to lose local rankings and confuse callers. So this is
   * set up the way Google recommends for a contractor who travels to the
   * customer: a service-area business, city and state only, no street address.
   *
   * If Bill has a Grand Rapids yard or office address, add it here. If the
   * business is genuinely still run from Lebanon TN, tell me and the whole
   * geographic target of the site needs to change.
   */
  address: {
    streetAddress: '',
    addressLocality: 'Grand Rapids',
    addressRegion: 'MI',
    postalCode: '',
    addressCountry: 'US',
  },

  // Grand Rapids, MI — centre of the 40-mile service radius.
  location: {
    latitude: 42.9634,
    longitude: -85.6681,
  },

  serviceArea: {
    // The form gave a 40-mile service radius and a 45-mile maximum travel.
    radius: 40,
    maxTravel: 45,
    unit: 'miles',
    primaryZip: '49503',
    primaryCities: [
      'Grand Rapids',
      'Wyoming',
      'Kentwood',
      'Grandville',
      'Walker',
      'Rockford',
      'Cedar Springs',
      'Lowell',
      'Ada',
      'Caledonia',
      'Hudsonville',
      'Jenison',
      'Holland',
      'Zeeland',
      'Greenville',
      'Ionia',
      'Allendale',
      'Byron Center',
    ],
    counties: [
      'Kent County, MI',
      'Ottawa County, MI',
      'Allegan County, MI',
      'Ionia County, MI',
      'Montcalm County, MI',
    ],
    states: ['Michigan'],
    zipCodes: [
      '49503', '49504', '49505', '49506', '49507', '49508', '49509',
      '49512', '49525', '49546', '49548', '49301', '49315', '49316',
      '49321', '49341', '49418', '49423', '49428', '49464',
    ],
  },

  // ⚠ CONFIRM — trade-standard hours, not supplied in the form. Michigan
  // paving is seasonal: hot mix needs surface temps that hold through the
  // pour, so the working season is roughly April to October here.
  hours: {
    monday: '07:00-18:00',
    tuesday: '07:00-18:00',
    wednesday: '07:00-18:00',
    thursday: '07:00-18:00',
    friday: '07:00-18:00',
    saturday: '08:00-16:00',
    sunday: 'Closed',
  },
  season: 'April through October, weather permitting',

  /**
   * Ordered deliberately. Asphalt paving is the answer to "which service
   * brings in the most business", so it leads everywhere it appears.
   */
  services: [
    'Asphalt Paving',
    'Tar & Chip Surfacing',
    'Parking Lot Paving',
    'Resurfacing & Overlays',
    'Asphalt Sealcoating',
    'Milling',
    'Gravel Driveways',
    'Farm Lanes & Private Roads',
    'Subdivision & Roadway Paving',
  ],

  /** The service to push hardest, per the discovery form. */
  primaryService: 'Asphalt Paving',

  /** Straight from the form. Used on the About and Services pages. */
  process: [
    {
      title: 'Prep the ground',
      body: 'Whatever the existing surface is, the ground underneath gets prepared properly first. Skip this and the surface fails no matter what goes on top.',
    },
    {
      title: 'Lay the stone base',
      body: 'A compacted stone base carries the load and gives the asphalt something solid to bond to.',
    },
    {
      title: 'Top with hot mix asphalt',
      body: 'Hot mix asphalt laid and compacted over the prepared base.',
    },
  ],

  /**
   * Everything here is either stated in the discovery form or true by
   * construction. No BBB (the form says they are not a member), and no job
   * count (see the header note).
   */
  trustPoints: [
    'Licensed & Insured',
    '15 Years in the Trade',
    'Own Crew & Own Equipment',
    '1 Year Warranty on All Work',
  ],

  credentials: {
    licensedAndInsured: true,
    yearsInTrade: 15,
    crewSize: 7,
    ownsEquipment: true,
  },

  warranty: {
    included: 'One year warranty on all work, at no extra cost.',
    extended: 'Extended warranties are available for a small additional fee.',
  },

  /** Minimum job size from the form. Saves the crew quoting jobs too small. */
  minimumJob: {
    squareFeet: 1000,
    label: '1,000 sq ft minimum',
  },

  projectTypes: ['Residential', 'Commercial', 'Industrial'],

  forms: {
    // ⚠ CONFIRM — empty on purpose. The template shipped with another client's
    // Jotform ID; leaving it would send A1's leads to them. Drop this
    // business's own Jotform ID here and the embed switches on.
    jotformId: '',
  },

  priceRange: '$$',
  paymentAccepted: ['Cash', 'Check', 'Visa', 'MasterCard', 'Discover', 'American Express'],
};

// Single state, so the helpers the template exposes stay simple.
export const stateForCity = (_city: string) => 'Michigan';
export const stateAbbrForCity = (_city: string) => 'MI';

/**
 * Address is omitted from schema when there is no street address: a
 * PostalAddress with a blank streetAddress is worse than none, and Google
 * treats a service-area business as valid without one.
 */
const addressSchema = BUSINESS_INFO.address.streetAddress
  ? {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    }
  : {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    };

export const SCHEMA_ORG = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${BUSINESS_INFO.contact.website}#organization`,
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  description: BUSINESS_INFO.description,
  url: BUSINESS_INFO.contact.website,
  logo: `${BUSINESS_INFO.contact.website}/logo.svg`,
  image: `${BUSINESS_INFO.contact.website}/og-image.jpg`,

  telephone: BUSINESS_INFO.contact.phoneRaw,
  email: BUSINESS_INFO.contact.email,

  founder: {
    '@type': 'Person',
    name: BUSINESS_INFO.owner.name,
    jobTitle: BUSINESS_INFO.owner.role,
  },

  address: addressSchema,

  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_INFO.location.latitude,
    longitude: BUSINESS_INFO.location.longitude,
  },

  // A service-area business describes reach with serviceArea, not address.
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.location.latitude,
      longitude: BUSINESS_INFO.location.longitude,
    },
    geoRadius: `${BUSINESS_INFO.serviceArea.radius * 1609}`,
  },

  areaServed: BUSINESS_INFO.serviceArea.primaryCities.map(city => ({
    '@type': 'City',
    name: city,
    containedInPlace: {
      '@type': 'State',
      name: 'Michigan',
    },
  })),

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '16:00',
    },
  ],

  priceRange: BUSINESS_INFO.priceRange,
  paymentAccepted: BUSINESS_INFO.paymentAccepted,

  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Asphalt Paving Services',
    itemListElement: BUSINESS_INFO.services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
      },
    })),
  },
};
