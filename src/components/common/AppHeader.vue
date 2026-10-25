<template>
  <div>
    <header
      :class="[
        'sticky top-0 z-30 transition-all duration-300',
        scrolled
          ? 'bg-white/75 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_1px_12px_-6px_rgb(15_23_42/0.15)]'
          : 'bg-transparent border-b border-transparent',
      ]"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2.5 group">
            <div class="relative">
              <div
                class="absolute inset-0 bg-rose-400/30 blur-lg rounded-full transition-opacity opacity-60 group-hover:opacity-100"
              ></div>
              <img
                src="/logo.png"
                alt="ThumbGen Logo"
                class="w-8 h-8 relative transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                draggable="false"
              />
            </div>
            <span class="text-xl font-bold tracking-tight text-gray-900">
              Thumb<span class="text-gradient">Gen</span>
            </span>
          </router-link>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-900/5 transition-colors"
            >
              {{ link.label }}
            </router-link>
            <a
              href="https://github.com/Malith-Rukshan/thumb-gen"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary btn-sm ml-2"
            >
              <GithubIcon />
              Star on GitHub
            </a>
          </nav>

          <!-- Mobile menu button -->
          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden btn btn-ghost btn-icon"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
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
        class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden"
        @click="mobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile Menu Panel -->
    <Transition name="slide-right">
      <div
        v-if="mobileMenuOpen"
        class="fixed right-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden flex flex-col"
      >
        <div
          class="p-4 flex items-center justify-between border-b border-gray-100"
        >
          <span class="font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            @click="mobileMenuOpen = false"
            class="btn btn-ghost btn-icon"
            aria-label="Close menu"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <nav class="p-3 space-y-1 flex-1 overflow-y-auto">
          <p
            class="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            Tools
          </p>
          <router-link
            v-for="tool in tools"
            :key="tool.to"
            :to="tool.to"
            class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            active-class="!bg-blue-50 !text-blue-700"
          >
            <component :is="tool.icon" class="w-4 h-4" />
            {{ tool.label }}
          </router-link>
          <p
            class="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            More
          </p>
          <router-link
            v-for="link in [
              ...navLinks.slice(1),
              { to: '/privacy-policy', label: 'Privacy Policy' },
            ]"
            :key="link.to"
            :to="link.to"
            class="block px-3 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {{ link.label }}
          </router-link>
        </nav>
        <div class="p-4 border-t border-gray-100">
          <a
            href="https://github.com/Malith-Rukshan/thumb-gen"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary w-full"
          >
            <GithubIcon />
            Star on GitHub
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { MenuIcon, XIcon } from "@lucide/vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
import { tools } from "@/tools";

const navLinks = [
  { to: "/#tools", label: "Tools" },
  { to: "/#features", label: "Features" },
  { to: "/#faq", label: "FAQ" },
];

const mobileMenuOpen = ref(false);
const scrolled = ref(false);
const route = useRoute();

// Close the drawer whenever navigation happens
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  },
);

// Lock page scroll while the drawer is open
watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") mobileMenuOpen.value = false;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
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
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
