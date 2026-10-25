import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Home is eager for a fast first paint; tool pages are lazy-loaded so heavy
// libraries (lottie-web, jszip) only download when a tool is opened
import HomePage from "@/views/HomePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      title: "ThumbGen - Free Online Thumbnail Generator",
      description:
        "Generate beautiful thumbnails from videos, animations, images, and text. Free online tool with no registration required.",
    },
  },
  {
    path: "/video-thumbnail-generator",
    name: "video-thumbnail",
    component: () => import("@/views/VideoThumbnailPage.vue"),
    meta: {
      title:
        "Video Thumbnail Generator - Extract Frames from Videos | ThumbGen",
      description:
        "Extract perfect frames from your videos to create engaging thumbnails. Support for MP4, WebM, and OGG formats. Free online tool.",
    },
  },
  {
    path: "/lottie-thumbnail-generator",
    name: "lottie-thumbnail",
    component: () => import("@/views/LottieThumbnailPage.vue"),
    meta: {
      title:
        "Lottie & TGS Thumbnail Generator - Extract Animation Frames | ThumbGen",
      description:
        "Generate thumbnails from Lottie animations and Telegram stickers. Extract any frame from your animated content.",
    },
  },
  {
    path: "/base64-image-converter",
    name: "base64-converter",
    component: () => import("@/views/Base64ConverterPage.vue"),
    meta: {
      title: "Image to Base64 Converter - Create Tiny Placeholders | ThumbGen",
      description:
        "Convert images to base64 data URIs for progressive loading. Create ultra-light placeholders that enhance user experience.",
    },
  },
  {
    path: "/text-thumbnail-generator",
    name: "text-thumbnail",
    component: () => import("@/views/TextThumbnailPage.vue"),
    meta: {
      title: "Text Thumbnail Generator - Create Custom Text Images | ThumbGen",
      description:
        "Design stunning text-based thumbnails with custom fonts, colors, and backgrounds. Perfect for social media and blog headers.",
    },
  },
  {
    path: "/watermark-tool",
    name: "watermark-tool",
    component: () => import("@/views/WatermarkToolPage.vue"),
    meta: {
      title: "Watermark Tool - Add Watermarks to Images | ThumbGen",
      description:
        "Protect your images with custom watermarks. Add text or image watermarks with full control over positioning and opacity.",
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("@/views/PrivacyPolicyPage.vue"),
    meta: {
      title: "Privacy Policy | ThumbGen",
      description:
        "Learn about how ThumbGen protects your privacy. All processing happens in your browser - we never store your data.",
    },
  },
  // Catch-all 404 route - must be last
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundPage.vue"),
    meta: {
      title: "404 - Page Not Found | ThumbGen",
      description: "The page you're looking for doesn't exist.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

// Update page title and meta tags
router.afterEach((to) => {
  document.title = (to.meta.title as string) || "ThumbGen";

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      (to.meta.description as string) || "",
    );
  }
});

// After a new deploy, old lazy chunk hashes no longer exist on the server.
// Reload once to pick up the fresh build instead of showing a blank page.
router.onError((error, to) => {
  const isChunkError =
    /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      String(error?.message),
    );
  if (isChunkError && sessionStorage.getItem("chunk-reload") !== to.fullPath) {
    sessionStorage.setItem("chunk-reload", to.fullPath);
    window.location.assign(to.fullPath);
  }
});

export default router;
