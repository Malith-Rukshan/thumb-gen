<template>
  <div>
    <header
      class="relative z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-36 -left-72 w-[75rem] h-[54rem] bg-gradient-radial from-blue-500/12 to-transparent"
        ></div>
      </div>
      <div class="container mx-auto px-4 relative">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3">
            <div class="relative">
              <div
                class="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"
              ></div>
              <img
                src="/logo.png"
                alt="ThumbGen Logo"
                class="w-8 h-8 relative"
                draggable="false"
              />
            </div>
            <span class="text-xl font-bold text-gray-900">
              Thumb<span class="text-blue-600">Gen</span>
            </span>
          </router-link>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link
              to="/#tools"
              class="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Tools
            </router-link>
            <router-link
              to="/#features"
              class="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </router-link>
            <router-link
              to="/#faq"
              class="text-gray-600 hover:text-blue-600 transition-colors"
            >
              FAQ
            </router-link>
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <GithubIcon class="w-4 h-4" />
              GitHub
            </a>
          </nav>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MenuIcon v-if="!mobileMenuOpen" class="w-5 h-5" />
            <XIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="mobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile Menu Panel -->
    <Transition name="slide-right">
      <div
        v-if="mobileMenuOpen"
        class="fixed right-0 top-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
      >
        <div class="p-4 border-b border-gray-200">
          <button
            @click="mobileMenuOpen = false"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto block"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <nav class="p-4 space-y-2">
          <router-link
            to="/#tools"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Tools
          </router-link>
          <router-link
            to="/#features"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Features
          </router-link>
          <router-link
            to="/#faq"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            FAQ
          </router-link>
          <router-link
            to="/privacy-policy"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Privacy Policy
          </router-link>
          <div class="border-t border-gray-200 mt-4 pt-4">
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen"
              target="_blank"
              rel="noopener noreferrer"
              class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="inline-flex items-center gap-2">
                <GithubIcon class="w-4 h-4" />
                GitHub
              </span>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MenuIcon, XIcon } from "@lucide/vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";

const mobileMenuOpen = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
