<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <router-link to="/" class="btn btn-ghost btn-sm -ml-3 mb-6">
      <ArrowLeftIcon class="w-4 h-4" />
      Back to Home
    </router-link>

    <div class="prose prose-lg max-w-none">
      <h1
        class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6"
      >
        Privacy Policy
      </h1>

      <p class="text-gray-600 mb-8">Last updated: May 26, 2025</p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Our Commitment to Privacy
        </h2>
        <p class="text-gray-600 mb-4">
          At ThumbGen, we take your privacy seriously. Our tool is designed with
          privacy-first principles, ensuring that your data never leaves your
          browser.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Data Processing
        </h2>
        <div
          class="rounded-2xl p-6 mb-4 bg-linear-to-br from-blue-50 to-indigo-50/70 ring-1 ring-blue-100"
        >
          <h3 class="font-semibold text-gray-900 mb-2">
            100% Client-Side Processing
          </h3>
          <p class="text-gray-700">
            All image, video, and animation processing happens directly in your
            browser. We do not upload, store, or transmit your files to any
            server.
          </p>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          What We Don't Collect
        </h2>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>We don't store your images, videos, or animations</li>
          <li>We don't track individual user behavior</li>
          <li>We don't require registration or login</li>
          <li>We don't use cookies for tracking</li>
          <li>We don't share data with third parties</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          What We Do Use
        </h2>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>
            <strong>Analytics (Optional):</strong> We may use privacy-respecting
            analytics to understand general usage patterns
          </li>
          <li>
            <strong>Local Storage:</strong> We use browser local storage to save
            your preferences (theme, recent settings)
          </li>
          <li>
            <strong>Service Worker:</strong> For offline functionality and
            better performance
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Third-Party Services
        </h2>
        <p class="text-gray-600 mb-4">
          ThumbGen is hosted on [Hosting Provider] which may collect basic
          access logs. These logs may include IP addresses, browser types, and
          access times. Please refer to their privacy policy for more
          information.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Open Source</h2>
        <p class="text-gray-600 mb-4">
          ThumbGen is open source software. You can review our code on
          <a
            href="https://github.com/Malith-Rukshan/thumb-gen"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            GitHub
          </a>
          to verify our privacy practices.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
        <p class="text-gray-600">
          If you have any questions about this Privacy Policy, please open an
          issue on our
          <a
            href="https://github.com/Malith-Rukshan/thumb-gen/issues"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            GitHub repository </a
          >.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@lucide/vue";
</script>
