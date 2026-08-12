/**
 * Every photograph used on the site, in one place.
 *
 * IMPORTANT — why these are stock:
 * The Pavingtemplate repo shipped with the previous client's real job photos
 * and videos (hosted on their ImageKit account). Presenting another
 * contractor's completed work as Bill's would be a misrepresentation, so
 * all of those were removed.
 *
 * Everything below is free-to-use Pexels stock that has been visually checked
 * to actually depict what the caption says — sealer application, crack
 * sealing, striping, and worn asphalt. None of it is captioned as
 * "our work" anywhere on the site.
 *
 * SWAP THESE OUT as soon as Bill sends real job photos: replace the `src`
 * values here and the whole site updates. The gallery page also has an
 * explicit `REAL_PROJECT_PHOTOS` list that takes priority when populated.
 */

const px = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export interface Photo {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
}

const photo = (id: number, alt: string, caption: string): Photo => ({
  src: px(id, 1600),
  thumb: px(id, 700),
  alt,
  caption,
});

/** Sealer going down on a city street — the clearest "this is what we do" shot. */
export const HERO = photo(
  34272103,
  'Distributor truck spraying fresh black asphalt sealer across a street',
  'Sealer being applied by distributor truck',
);

export const SEALING = photo(
  34648982,
  'Asphalt distributor truck laying a fresh coat of sealer along a rural road',
  'Fresh sealer, edge to edge',
);

export const SEALING_CLOSE = photo(
  13675247,
  'Close view of a sealcoating spray bar applying dark emulsion to asphalt',
  'Even coverage from the spray bar',
);

export const SEALED_WET = photo(
  27410934,
  'Freshly sealed asphalt road with a wet black finish running through evergreen trees',
  'A finished surface while it cures',
);

export const RESIDENTIAL_STREET = photo(
  9843588,
  'Paving crew laying hot mix asphalt along a residential street',
  'Working a residential street',
);

export const CRACK_SEALING = photo(
  9963246,
  'Hot rubber crack sealant filling a branching crack in grey asphalt',
  'Hot rubber crack sealing',
);

export const CRACKED_ASPHALT = photo(
  29213468,
  'Close-up of dry, grey, badly cracked asphalt breaking apart',
  'Unsealed asphalt, opening up',
);

export const STRIPING = photo(
  12142222,
  'Bright yellow line striping crossing a grey asphalt parking area',
  'Line striping and stall marking',
);

export const PARKING_STALLS = photo(
  33966251,
  'Crisp white parking stall lines on dark asphalt',
  'Freshly marked parking stalls',
);

export const CREW_EQUIPMENT = photo(
  5924617,
  'Paving crew and chip seal equipment working along a tree-lined road',
  'Equipment on site',
);

export const RURAL_ROAD = photo(
  17605960,
  'Paving equipment surfacing a long rural road beside farmland',
  'Private roads and long lanes',
);

/** Ordered gallery grid. Purely illustrative of the trade — not "our projects". */
export const STOCK_GALLERY: Photo[] = [
  HERO,
  CRACK_SEALING,
  STRIPING,
  SEALED_WET,
  CRACKED_ASPHALT,
  SEALING,
  PARKING_STALLS,
  SEALING_CLOSE,
  RESIDENTIAL_STREET,
  CREW_EQUIPMENT,
  RURAL_ROAD,
];

/**
 * Drop Bill's real before/after photos in here and the gallery switches
 * from illustrative stock to genuine project work automatically.
 * Leave empty until real photos exist.
 */
export const REAL_PROJECT_PHOTOS: Photo[] = [];
