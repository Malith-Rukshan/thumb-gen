<template>
  <div class="container mx-auto px-4 py-8">
    <router-link
      to="/"
      class="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
    >
      <ArrowLeftIcon class="w-4 h-4" />
      Back to Home
    </router-link>

    <TextThumbnailGenerator />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "lucide-vue-next";
import TextThumbnailGenerator from "@/components/generators/TextThumbnail/TextThumbnailGenerator.vue";
</script>
