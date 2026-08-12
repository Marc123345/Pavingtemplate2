export type Page =
  | 'home'
  | 'services'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'sitemap'
  | 'location';

/** `citySlug` is only meaningful when `page` is `'location'`. */
export type NavigateFn = (page: Page, citySlug?: string) => void;

export interface PageProps {
  onNavigate: NavigateFn;
}
