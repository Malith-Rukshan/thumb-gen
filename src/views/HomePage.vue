<template>
  <div>
    <!-- Hero Section -->
    <section class="relative z-10 container mx-auto px-4 py-8 lg:py-12">
      <div class="text-center mb-12 lg:mb-16">
        <div class="inline-flex items-center justify-center mb-6">
          <div class="relative">
            <div
              class="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full animate-pulse"
            ></div>
            <img
              src="/logo.png"
              alt="ThumbGen Logo"
              class="w-[220px] h-[220px] lg:w-[220px] lg:h-[220px] relative"
              draggable="false"
            />
          </div>
        </div>
        <h1
          class="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          Thumb<span class="text-blue-600">Gen</span>
        </h1>
        <p class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Generate beautiful thumbnails from videos, animations, images, and
          text — all in your browser.
        </p>
      </div>
    </section>

    <!-- Tools Section -->
    <section id="tools" class="pb-16 pt-4">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <a class="text-3xl lg:text-4xl font-bold text-gray-900" href="#tools">
            Available Tools
          </a>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Choose from our collection of powerful thumbnail generation tools.
            All processing happens in your browser for maximum privacy.
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <!-- Video Thumbnail Tool -->
          <router-link
            to="/video-thumbnail-generator"
            class="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
              >
                <VideoIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  Video Thumbnail Generator
                </h3>
                <p class="text-sm text-gray-600">
                  Extract perfect frames from videos. Support for MP4, WebM, and
                  OGG formats.
                </p>
              </div>
            </div>
          </router-link>

          <!-- Lottie Thumbnail Tool -->
          <router-link
            to="/lottie-thumbnail-generator"
            class="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
              >
                <CirclePlayIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  Lottie/TGS Thumbnail
                </h3>
                <p class="text-sm text-gray-600">
                  Generate thumbnails from Lottie animations and Telegram
                  stickers.
                </p>
              </div>
            </div>
          </router-link>

          <!-- Base64 Converter -->
          <router-link
            to="/base64-image-converter"
            class="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
              >
                <ImageIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  Base64 Image Converter
                </h3>
                <p class="text-sm text-gray-600">
                  Convert images to base64 for progressive loading placeholders.
                </p>
              </div>
            </div>
          </router-link>

          <!-- Text Thumbnail Tool -->
          <router-link
            to="/text-thumbnail-generator"
            class="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
              >
                <TypeIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  Text Thumbnail Generator
                </h3>
                <p class="text-sm text-gray-600">
                  Create stunning text-based thumbnails with custom fonts and
                  backgrounds.
                </p>
              </div>
            </div>
          </router-link>

          <!-- Watermark Tool -->
          <router-link
            to="/watermark-tool"
            class="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
              >
                <DropletIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  Watermark Tool
                </h3>
                <p class="text-sm text-gray-600">
                  Add custom watermarks to protect your images and add branding.
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <FeaturesSection />

    <!-- FAQ Section -->
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
import {
  ImageIcon,
  VideoIcon,
  CirclePlayIcon,
  TypeIcon,
  DropletIcon,
} from "@lucide/vue";
import FeaturesSection from "@/components/sections/FeaturesSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
</script>
