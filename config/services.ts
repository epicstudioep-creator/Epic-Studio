import { Clapperboard, Film, Image as ImageIcon, PenTool, Share2, Sparkles, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  number: string;
  /** Must match the enquiry dropdown option exactly. */
  title: string;
  description: string;
  icon: LucideIcon;
};

/** EDIT THIS FILE to add, remove or reword services. */
export const services: Service[] = [
  {
    id: "poster",
    number: "01",
    title: "Poster Designing",
    description: "Eye-catching posters for events, promotions, businesses, and social media.",
    icon: PenTool,
  },
  {
    id: "video-editing",
    number: "02",
    title: "Video Editing",
    description:
      "Professional video editing for Instagram Reels, YouTube Shorts, promotional videos, and other content.",
    icon: Clapperboard,
  },
  {
    id: "branding",
    number: "03",
    title: "Logo & Branding",
    description: "Creative logo designs and visual identities that help businesses establish their brand.",
    icon: Sparkles,
  },
  {
    id: "social",
    number: "04",
    title: "Social Media Design",
    description: "Creative Instagram posts, stories, carousel designs, and social media content.",
    icon: Share2,
  },
  {
    id: "thumbnail",
    number: "05",
    title: "Thumbnail Designing",
    description: "Attractive YouTube thumbnails designed to capture attention.",
    icon: ImageIcon,
  },
  {
    id: "promo-video",
    number: "06",
    title: "Promotional Videos",
    description: "Creative promotional videos to showcase products, services, events, and businesses.",
    icon: Film,
  },
];

export const serviceOptions = [...services.map((s) => s.title), "Other"];
