/**
 * Every photograph and video used on the site, in one place.
 *
 * A1's own work carries the site entirely — ten photographs and six clips Bill
 * sent in August 2026, all served from A1's ImageKit account. There is no
 * stock photography left anywhere: if a slot needed a picture of a trade A1
 * has not photographed, the slot now shows real paving work and says so,
 * rather than borrowing a stranger's photo of sealcoating.
 *
 * A NOTE ON RESOLUTION — STILL OUTSTANDING
 * Every one of these is 640x480, about a third of a megapixel, which is what a
 * phone photo becomes after a messaging app has compressed it. The ImageKit
 * copies are the same pixels, so serving them from a CDN improved delivery,
 * not sharpness. They hold up at card and gallery size, which is where they
 * are used, and they are deliberately NOT used full-bleed behind the home page
 * headline — at that size the softness shows, so the hero runs video instead.
 * Getting the originals off Bill's phone is the single biggest visual upgrade
 * left: re-upload at full size under the same names and every photo on the
 * site sharpens with no code change.
 */

export interface Photo {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
}

/**
 * A1's own work, served from A1's ImageKit account alongside the videos.
 *
 * `f-auto` is the reason these come from a CDN rather than /public: ImageKit
 * negotiates AVIF or WebP per browser, which takes a meaningful bite out of a
 * ten-photo gallery on a phone. The filenames are descriptive because image
 * search reads them.
 *
 * The thumbnail is asked for at 400px because it is only ever painted into a
 * 4:3 grid cell; the full size is served at its native 640px rather than
 * upscaled, since asking ImageKit for more pixels than the source holds just
 * ships a bigger blurry file.
 */
const real = (slug: string, alt: string, caption: string): Photo => ({
  src: `https://ik.imagekit.io/qcvroy8xpd/${slug}.jpg?tr=q-82,f-auto`,
  thumb: `https://ik.imagekit.io/qcvroy8xpd/${slug}.jpg?tr=w-400,q-78,f-auto`,
  alt,
  caption,
});

/* --------------------------------------------------------------------------
   A1's own photographs
   -------------------------------------------------------------------------- */

export const ESTATE_DRIVE = real(
  'winding-asphalt-driveway-horse-farm-fencing',
  'Long curved asphalt driveway running between black post-and-rail fencing up to a house',
  'A finished drive, fence line to front door',
);

export const ESTATE_ENTRANCE = real(
  'new-asphalt-driveway-entrance-estate',
  'Entrance apron of a new asphalt driveway meeting the road, marked with a traffic cone',
  'Where the new drive meets the road',
);

export const CURVED_DRIVE = real(
  'curved-new-asphalt-driveway-across-lawn',
  'Freshly laid asphalt driveway curving through mown lawns towards a house',
  'A new drive curving through the lawn',
);

export const CREW_PAVER = real(
  'paving-crew-asphalt-paver-machine-jobsite',
  'A1 crew in high-visibility vests working alongside a paver laying hot asphalt',
  'Our crew on the paver',
);

export const RAKING_EDGE = real(
  'paving-crew-laying-asphalt-residential-driveway',
  'Crew member raking the edge of fresh hot asphalt behind a paver and dump truck',
  'Hand-working the edge behind the paver',
);

export const FEEDING_PAVER = real(
  'dump-truck-feeding-asphalt-paver-neighborhood',
  'Red dump truck tipping hot asphalt into a paver on a residential driveway',
  'Feeding the paver on a residential job',
);

export const WOODED_COMPACTION = real(
  'fresh-asphalt-driveway-wooded-property',
  'Two rollers compacting a new asphalt driveway running through mature woodland',
  'Rolling a driveway through the trees',
);

export const WOODED_LANE = real(
  'asphalt-walking-path-paved-through-woods',
  'Narrow finished asphalt lane running away through dense green woodland',
  'A finished woodland lane',
);

export const SUNRISE_DRIVE = real(
  'finished-tree-lined-asphalt-driveway-sunset',
  'Long private asphalt drive beside open farmland with a roller working at sunrise',
  'Long private drives, start to finish',
);

export const DUSK_DRIVE = real(
  'roller-compacting-fresh-asphalt-driveway-sunset',
  'Roller compacting a new asphalt drive beside open grass at dusk',
  'Finishing a drive at last light',
);

/** The hero photograph, used as the poster frame behind the hero video. */
export const HERO = ESTATE_DRIVE;

/**
 * Aliases, so pages referring to these concepts keep working. Each one points
 * at a real photograph that genuinely depicts the concept named — there is
 * deliberately no alias for a sealed surface, because none of A1's photographs
 * show sealcoating and naming one SEALED_WET would make the name lie about
 * the picture.
 */
export const RESIDENTIAL_STREET = FEEDING_PAVER;
export const CREW_EQUIPMENT = CREW_PAVER;
export const RURAL_ROAD = SUNRISE_DRIVE;

/* --------------------------------------------------------------------------
   Video
   -------------------------------------------------------------------------- */

export interface Clip {
  src: string;
  poster: string;
  title: string;
  /** Portrait clips are shot on a phone and must not be letterboxed into 16:9. */
  portrait?: boolean;
}

/**
 * ImageKit is asked for MP4 explicitly. Left to content-negotiate it will hand
 * some browsers a WebM variant that stalls before delivering any data, which
 * reads as a broken player. Two of these were uploaded with a `.mov`
 * extension but are ISO MP4 inside, so they play everywhere as-is.
 */
const ik = (file: string, width: number) =>
  `https://ik.imagekit.io/qcvroy8xpd/${encodeURIComponent(file)}?tr=w-${width},q-70,f-mp4`;

/**
 * Plays muted and looping behind the home page headline.
 *
 * This is the one landscape clip that establishes the whole operation — dump
 * truck, paver, crew and roller in one frame. Five of the six clips Bill sent
 * were shot vertically on a phone; a 9:16 video stretched across a 16:9 hero
 * crops to a meaningless strip of asphalt, so the choice here is dictated by
 * shape as much as by content.
 */
export const HERO_VIDEO = ik('Paving Video 2.mp4', 1280);

/**
 * Bill's customer, on camera. Shot vertically, so it is shown vertically and
 * given a column of its own rather than being letterboxed into a widescreen
 * frame with the speaker's head cropped off.
 */
export const TESTIMONIAL_VIDEO: Clip = {
  src: ik('Testimonial paving.mp4', 1280),
  poster: ESTATE_DRIVE.src,
  title: 'A customer on the finished job',
  portrait: true,
};

/**
 * The rest of the clips. `portrait` is not cosmetic — it decides whether the
 * player frames the clip 9:16 or 16:9, and getting it wrong crops the subject
 * out of the shot entirely.
 */
export const WORK_CLIPS: Clip[] = [
  {
    src: ik('Paving 5.mp4', 960),
    poster: CURVED_DRIVE.thumb,
    title: 'Rolling the finished surface',
  },
  {
    src: ik('Paving Video.mp4', 960),
    poster: CREW_PAVER.thumb,
    title: 'Laying hot mix',
    portrait: true,
  },
  {
    src: ik('Paving Video 3.mov', 960),
    poster: WOODED_COMPACTION.thumb,
    title: 'Rolling it flat',
    portrait: true,
  },
  {
    src: ik('Paving 4.mov', 960),
    poster: SUNRISE_DRIVE.thumb,
    title: 'A drive taking shape',
    portrait: true,
  },
];

/* --------------------------------------------------------------------------
   Gallery
   -------------------------------------------------------------------------- */

/**
 * A1's own completed work, in the order it reads best: the two strongest
 * finished drives first, then the crew at work, then the rest. The gallery
 * shows "Our recent work" because this is populated.
 */
export const REAL_PROJECT_PHOTOS: Photo[] = [
  ESTATE_DRIVE,
  CURVED_DRIVE,
  CREW_PAVER,
  WOODED_COMPACTION,
  SUNRISE_DRIVE,
  RAKING_EDGE,
  ESTATE_ENTRANCE,
  FEEDING_PAVER,
  WOODED_LANE,
  DUSK_DRIVE,
];
