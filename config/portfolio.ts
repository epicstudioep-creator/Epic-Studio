/**
 * PORTFOLIO — HOW TO ADD YOUR OWN WORK
 *
 * 1. Copy your image/video into /public/portfolio/ (e.g. /public/portfolio/my-poster.jpg).
 * 2. Add an entry to `portfolioItems` below (copy any entry as a template).
 * 3. Set `sample: false` on real work. Entries with `sample: true` are shown
 *    with a visible "SAMPLE PLACEHOLDER" badge so they are never mistaken for
 *    completed client projects.
 * 4. Delete the sample entries once you have your own.
 *
 * Videos: set type: "video", src: "/portfolio/clip.mp4" and poster: "/portfolio/clip.jpg".
 * (Keep clips short/compressed; for long videos host on YouTube/Vimeo and link out instead.)
 */

export const portfolioCategories = [
  "All",
  "Posters",
  "Video Editing",
  "Branding",
  "Social Media",
  "Thumbnails",
] as const;

export type PortfolioCategory = Exclude<(typeof portfolioCategories)[number], "All">;

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  type: "image" | "video";
  /** Image path (images) or video file path (videos). Optional for placeholder videos. */
  src?: string;
  /** Thumbnail shown in the grid. Required for videos. */
  poster?: string;
  alt: string;
  /** true = placeholder, shown with a "SAMPLE PLACEHOLDER" badge. */
  sample: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "sample-poster",
    title: "Poster Design",
    category: "Posters",
    type: "image",
    src: "/portfolio/sample-poster.svg",
    alt: "Sample placeholder for a poster design",
    sample: true,
  },
  {
    id: "sample-video",
    title: "Reel Edit",
    category: "Video Editing",
    type: "video",
    poster: "/portfolio/sample-video.svg",
    // src: "/portfolio/your-video.mp4",  <- add when you have a real video
    alt: "Sample placeholder for a video edit",
    sample: true,
  },
  {
    id: "sample-branding",
    title: "Logo & Brand Identity",
    category: "Branding",
    type: "image",
    src: "/portfolio/sample-branding.svg",
    alt: "Sample placeholder for a branding project",
    sample: true,
  },
  {
    id: "sample-social",
    title: "Social Media Post",
    category: "Social Media",
    type: "image",
    src: "/portfolio/sample-social.svg",
    alt: "Sample placeholder for a social media design",
    sample: true,
  },
  {
    id: "sample-thumbnail",
    title: "YouTube Thumbnail",
    category: "Thumbnails",
    type: "image",
    src: "/portfolio/sample-thumbnail.svg",
    alt: "Sample placeholder for a YouTube thumbnail",
    sample: true,
  },
  {
    id: "sample-promo",
    title: "Promotional Video",
    category: "Video Editing",
    type: "video",
    poster: "/portfolio/sample-promo.svg",
    alt: "Sample placeholder for a promotional video",
    sample: true,
  },
];
