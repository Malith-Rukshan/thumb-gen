<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404 Icon -->
      <div class="relative inline-block mb-8">
        <div
          class="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
        ></div>
        <div
          class="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-32 h-32 flex items-center justify-center"
        >
          <FileQuestion class="w-16 h-16" />
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Page Not Found
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home class="w-5 h-5" />
          Go to Homepage
        </router-link>
        <button
          @click="goBack"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
          Go Back
        </button>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Helpful Links
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <router-link
            to="/video-thumbnail"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Video Thumbnail
          </router-link>
          <router-link
            to="/lottie-thumbnail"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Lottie Thumbnail
          </router-link>
          <router-link
            to="/text-thumbnail"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Text Thumbnail
          </router-link>
          <router-link
            to="/base64-converter"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Base64 Converter
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileQuestion, Home, ArrowLeft } from "@lucide/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>
