<template>
  <footer
    class="relative z-20 mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            About ThumbGen
          </h3>
          <p class="text-sm text-gray-600">
            A modern, browser-based tool for generating thumbnails from videos,
            animations, images, and text. 100% client-side processing ensures
            your privacy.
          </p>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-blue-600" />
              <a
                href="/video-thumbnail-generator"
                class="hover:text-blue-600 transition-colors"
              >
                Video frame extraction
              </a>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-blue-600" />
              <a
                href="/lottie-thumbnail-generator"
                class="hover:text-blue-600 transition-colors"
              >
                Lottie/TGS support
              </a>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-blue-600" />
              <a
                href="/base64-image-converter"
                class="hover:text-blue-600 transition-colors"
              >
                Base64 conversion
              </a>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-blue-600" />
              <a
                href="/watermark-tool"
                class="hover:text-blue-600 transition-colors"
              >
                Custom watermarks
              </a>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Links</h3>
          <div class="flex flex-col space-y-2">
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen"
              target="_blank"
              class="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <GithubIcon class="w-4 h-4" />
              GitHub Repository
            </a>
            <a
              href="https://malith.dev"
              target="_blank"
              class="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <UserIcon class="w-4 h-4" />
              Developer Profile
            </a>
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen/issues"
              target="_blank"
              class="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <MessageSquareIcon class="w-4 h-4" />
              Report an Issue
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-gray-600">
            © {{ currentYear }} ThumbGen. Made with
            <HeartIcon class="w-4 h-4 inline text-red-500" />
            by
            <a
              href="https://github.com/Malith-Rukshan"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              Malith Rukshan
            </a>
          </p>
          <div class="flex items-center gap-4">
            <router-link
              to="/privacy-policy"
              class="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </router-link>
            <span class="text-sm text-gray-500">•</span>
            <span class="text-sm text-gray-600">
              Open Source •
              <a
                href="https://github.com/Malith-Rukshan/thumb-gen/blob/main/LICENSE"
                target="_blank"
                >MIT License</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  CheckIcon,
  UserIcon,
  MessageSquareIcon,
  HeartIcon,
} from "@lucide/vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";

const currentYear = computed(() => new Date().getFullYear());
</script>
