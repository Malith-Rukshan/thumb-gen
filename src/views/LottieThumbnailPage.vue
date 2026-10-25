<template>
  <div class="container mx-auto px-4 py-8">
    <router-link
      to="/"
      class="btn btn-ghost btn-sm -ml-3 mb-6"
    >
      <ArrowLeftIcon class="w-4 h-4" />
      Back to Home
    </router-link>

    <LottieThumbnailGenerator />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@lucide/vue";
import LottieThumbnailGenerator from "@/components/generators/LottieThumbnail/LottieThumbnailGenerator.vue";
</script>
