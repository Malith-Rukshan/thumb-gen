<template>
  <section id="features" class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <a
          class="text-3xl lg:text-4xl font-bold text-gray-900"
          href="#features"
        >
          Features
        </a>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Everything you need to create perfect thumbnails, all in one place
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <!-- Privacy First -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <ShieldCheckIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">100% Private</h3>
          <p class="text-gray-600">
            All processing happens in your browser. Your files never leave your
            device.
          </p>
        </div>

        <!-- No Registration -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <UserXIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No Registration
          </h3>
          <p class="text-gray-600">
            Start using immediately. No sign-up, no login, no tracking.
          </p>
        </div>

        <!-- Fast Processing -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <ZapIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Lightning Fast
          </h3>
          <p class="text-gray-600">
            Instant processing with modern browser APIs. No server delays.
          </p>
        </div>

        <!-- Multiple Formats -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <FileStackIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Multiple Formats
          </h3>
          <p class="text-gray-600">
            Support for PNG, JPG, WebP, MP4, WebM, Lottie, and more.
          </p>
        </div>

        <!-- Batch Processing -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <LayersIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Batch Export</h3>
          <p class="text-gray-600">
            Process multiple frames or images at once. Export as ZIP.
          </p>
        </div>

        <!-- Open Source -->
        <div class="text-center group">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors"
          >
            <GithubIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Open Source</h3>
          <p class="text-gray-600">
            Transparent, auditable code. Contribute or self-host.
          </p>
        </div>
      </div>

      <!-- Demo: Progressive Image Loading -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="rounded-2xl p-8 shadow-[0_0px_15px_rgba(0,0,0,0.1)]">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            See Base64 Placeholders in Action
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Without Placeholder -->
            <div class="space-y-4">
              <h4 class="font-semibold text-gray-900">Without Placeholder</h4>
              <div
                class="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  v-if="showFullImage1"
                  :src="`https://picsum.photos/400/300?random=${randomId1}`"
                  alt="Demo without placeholder"
                  class="absolute inset-0 w-full h-full object-cover"
                  @load="handleImageLoad1"
                />
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <LoadingSpinner class="w-8 h-8" />
                </div>
              </div>
              <p class="text-sm text-gray-600">
                Notice the loading spinner while the image loads
              </p>
            </div>

            <!-- With Placeholder -->
            <div class="space-y-4">
              <h4 class="font-semibold text-gray-900">
                With Base64 Placeholder
              </h4>
              <div
                class="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden"
              >
                <!-- Base64 placeholder -->
                <img
                  :src="placeholderImage"
                  alt="Placeholder"
                  class="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                />
                <!-- Full image -->
                <img
                  v-if="showFullImage2"
                  :src="`https://picsum.photos/400/300?random=${randomId2}`"
                  alt="Demo with placeholder"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  :class="imageLoaded2 ? 'opacity-100' : 'opacity-0'"
                  @load="handleImageLoad2"
                />
              </div>
              <p class="text-sm text-gray-600">
                Smooth transition from blurred placeholder to full image
              </p>
            </div>
          </div>

          <div class="mt-6 text-center">
            <button
              @click="resetDemo"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  ShieldCheckIcon,
  UserXIcon,
  ZapIcon,
  FileStackIcon,
  LayersIcon,
} from "@lucide/vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

// Base64 placeholder (tiny 4x3 image)
const placeholderImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const showFullImage1 = ref(false);
const showFullImage2 = ref(false);
const imageLoaded1 = ref(false);
const imageLoaded2 = ref(false);
const randomId1 = ref(1);
const randomId2 = ref(2);

const handleImageLoad1 = () => {
  imageLoaded1.value = true;
};

const handleImageLoad2 = () => {
  setTimeout(() => {
    imageLoaded2.value = true;
  }, 100);
};

const resetDemo = () => {
  showFullImage1.value = false;
  showFullImage2.value = false;
  imageLoaded1.value = false;
  imageLoaded2.value = false;
  randomId1.value = Math.floor(Math.random() * 1000);
  randomId2.value = Math.floor(Math.random() * 1000);

  // Simulate network delay
  setTimeout(() => {
    showFullImage1.value = true;
    showFullImage2.value = true;
  }, 500);
};

onMounted(() => {
  resetDemo();
});
</script>
