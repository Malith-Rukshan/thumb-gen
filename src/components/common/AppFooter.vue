<template>
  <footer class="relative z-20 mt-auto border-t border-gray-200/70 bg-white/70 backdrop-blur-xl">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- About -->
        <div class="md:col-span-2 max-w-sm">
          <router-link to="/" class="inline-flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="" class="w-7 h-7" draggable="false" />
            <span class="text-lg font-bold tracking-tight text-gray-900">
              Thumb<span class="text-gradient">Gen</span>
            </span>
          </router-link>
          <p class="text-sm text-gray-600 leading-relaxed">
            A modern, browser-based tool for generating thumbnails from videos,
            animations, images, and text. 100% client-side processing ensures
            your privacy.
          </p>
        </div>

        <!-- Tools -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Tools</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="tool in tools" :key="tool.to">
              <router-link
                :to="tool.to"
                class="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {{ tool.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Links</h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a
                href="https://github.com/Malith-Rukshan/thumb-gen"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <GithubIcon class="w-4 h-4" />
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://malith.dev"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <UserIcon class="w-4 h-4" />
                Developer Profile
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Malith-Rukshan/thumb-gen/issues"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <MessageSquareIcon class="w-4 h-4" />
                Report an Issue
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-6 border-t border-gray-200/70">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600"
        >
          <p class="inline-flex items-center gap-1">
            © {{ currentYear }} ThumbGen. Made with
            <HeartIcon class="w-4 h-4 text-rose-500 fill-rose-500" />
            by
            <a
              href="https://github.com/Malith-Rukshan"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              Malith Rukshan
            </a>
          </p>
          <div class="flex items-center gap-3">
            <router-link
              to="/privacy-policy"
              class="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </router-link>
            <span class="text-gray-300">•</span>
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-600 transition-colors"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { UserIcon, MessageSquareIcon, HeartIcon } from "@lucide/vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
import { tools } from "@/tools";

const currentYear = new Date().getFullYear();
</script>
