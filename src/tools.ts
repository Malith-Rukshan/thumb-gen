import type { Component } from "vue";
import {
  CirclePlayIcon,
  DropletIcon,
  ImageIcon,
  TypeIcon,
  VideoIcon,
} from "@lucide/vue";

export interface Tool {
  to: string;
  label: string;
  description: string;
  icon: Component;
  /** Tailwind classes for the icon tile */
  accent: string;
}

// Single source of truth for tool links (header, home page, footer, 404)
export const tools: Tool[] = [
  {
    to: "/video-thumbnail-generator",
    label: "Video Thumbnail Generator",
    description:
      "Extract perfect frames from videos. Support for MP4, WebM, and OGG formats.",
    icon: VideoIcon,
    accent: "from-blue-500 to-indigo-600 shadow-blue-500/30",
  },
  {
    to: "/lottie-thumbnail-generator",
    label: "Lottie/TGS Thumbnail",
    description:
      "Generate thumbnails from Lottie animations and Telegram stickers.",
    icon: CirclePlayIcon,
    accent: "from-fuchsia-500 to-purple-600 shadow-fuchsia-500/30",
  },
  {
    to: "/base64-image-converter",
    label: "Base64 Image Converter",
    description:
      "Convert images to base64 for progressive loading placeholders.",
    icon: ImageIcon,
    accent: "from-emerald-500 to-teal-600 shadow-emerald-500/30",
  },
  {
    to: "/text-thumbnail-generator",
    label: "Text Thumbnail Generator",
    description:
      "Create stunning text-based thumbnails with custom fonts and backgrounds.",
    icon: TypeIcon,
    accent: "from-amber-400 to-orange-500 shadow-orange-500/30",
  },
  {
    to: "/watermark-tool",
    label: "Watermark Tool",
    description:
      "Add custom watermarks to protect your images and add branding.",
    icon: DropletIcon,
    accent: "from-rose-500 to-pink-600 shadow-rose-500/30",
  },
];
