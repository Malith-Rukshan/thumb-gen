<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative z-10 container mx-auto px-4 pt-10 pb-12 lg:pt-16 lg:pb-20"
    >
      <div class="text-center max-w-3xl mx-auto">
        <div class="flex items-center justify-center mb-8">
          <div class="relative animate-float">
            <div
              class="absolute inset-4 bg-linear-to-br from-rose-400/40 to-orange-300/40 blur-3xl rounded-full"
            ></div>
            <img
              src="/logo.png"
              alt="ThumbGen Logo"
              class="w-40 h-40 lg:w-48 lg:h-48 relative drop-shadow-xl"
              draggable="false"
            />
          </div>
        </div>

        <div
          class="inline-flex items-center justify-center gap-x-3 px-4 py-1.5 mb-6 rounded-full bg-white/70 ring-1 ring-gray-200 backdrop-blur text-xs font-medium text-gray-600 shadow-sm"
        >
          <span class="inline-flex items-center gap-1.5">
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"
              ></span>
              <span
                class="relative inline-flex size-2 rounded-full bg-emerald-500"
              ></span>
            </span>
            100% in your browser
          </span>
          <span class="text-gray-300">•</span>
          <span>No sign-up</span>
          <span class="hidden sm:inline text-gray-300">•</span>
          <span class="hidden sm:inline">Open source</span>
        </div>

        <h1
          class="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-5 tracking-tight"
        >
          Thumb<span class="text-gradient">Gen</span>
        </h1>
        <p
          class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Generate beautiful thumbnails from videos, animations, images, and
          text — all in your browser.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#tools" class="btn btn-primary btn-lg">
            <SparklesIcon />
            Explore tools
          </a>
          <a
            href="https://github.com/Malith-Rukshan/thumb-gen"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary btn-lg"
          >
            <GithubIcon />
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section id="tools" class="pb-16 pt-4">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900"
          >
            <a href="#tools">Available Tools</a>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Choose from our collection of powerful thumbnail generation tools.
            All processing happens in your browser for maximum privacy.
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          <router-link
            v-for="tool in tools"
            :key="tool.to"
            :to="tool.to"
            class="group card relative block p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)] hover:border-gray-300/70"
          >
            <div
              class="absolute -right-12 -top-12 size-40 rounded-full bg-linear-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
              :class="tool.accent"
            ></div>
            <div class="relative flex items-start gap-4">
              <div
                class="shrink-0 p-3 rounded-xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                :class="tool.accent"
              >
                <component :is="tool.icon" class="w-6 h-6" />
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-gray-900 mb-1.5 flex items-center gap-1"
                >
                  {{ tool.label }}
                  <ArrowRightIcon
                    class="w-4 h-4 text-gray-400 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-600"
                  />
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ tool.description }}
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
import { ArrowRightIcon, SparklesIcon } from "@lucide/vue";
import FeaturesSection from "@/components/sections/FeaturesSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
import { tools } from "@/tools";
</script>
