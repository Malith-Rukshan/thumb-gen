<template>
  <section id="faq" class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
          <a href="#faq">Frequently Asked Questions</a>
        </h2>
        <p class="text-lg text-gray-600 mt-4">
          Everything you need to know about ThumbGen
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="card overflow-hidden"
        >
          <button
            type="button"
            @click="toggleItem(index)"
            :aria-expanded="openItems.includes(index)"
            class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span class="font-semibold text-gray-900">{{ item.question }}</span>
            <ChevronDownIcon
              class="w-5 h-5 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openItems.includes(index) }"
            />
          </button>

          <Transition name="accordion">
            <div v-if="openItems.includes(index)" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">{{ item.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="https://github.com/Malith-Rukshan/thumb-gen/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-lg"
        >
          <MessageSquareIcon class="w-5 h-5" />
          Ask on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon, MessageSquareIcon } from "@lucide/vue";

const openItems = ref<number[]>([0]); // First item open by default

const faqItems = [
  {
    question: "Is ThumbGen really free?",
    answer:
      "Yes! ThumbGen is completely free to use. There are no hidden fees, no premium tiers, and no limitations. It's open source software that runs entirely in your browser.",
  },
  {
    question: "Do you store my images or videos?",
    answer:
      "No, we don't store any of your files. All processing happens directly in your browser using client-side JavaScript. Your files never leave your device and we have no servers that store user data.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support MP4, WebM, and OGG for videos; PNG, JPG, WebP, and GIF for images; JSON and TGS for Lottie animations. Export formats include PNG, JPG, and WebP with customizable quality settings.",
  },
  {
    question: "Can I use ThumbGen offline?",
    answer:
      "Yes! Once you've visited ThumbGen, it works offline thanks to service worker caching. You can generate thumbnails without an internet connection.",
  },
  {
    question: "How do I extract multiple frames from a video?",
    answer:
      "In the video thumbnail generator, use the player controls to navigate to each desired frame and click 'Capture Frame'. All captured frames appear below the player and can be downloaded individually or as a ZIP file.",
  },
  {
    question: "What's the maximum file size I can process?",
    answer:
      "There's no hard limit set by ThumbGen, but processing is limited by your browser's available memory. Most modern devices can handle files up to several hundred megabytes without issues.",
  },
  {
    question: "Can I use the generated thumbnails commercially?",
    answer:
      "Yes! The thumbnails you create are yours to use however you like, including for commercial purposes. ThumbGen doesn't claim any rights to your generated content.",
  },
  {
    question: "Is the source code available?",
    answer:
      "Yes! ThumbGen is open source software available on GitHub. You can review the code, contribute improvements, or even host your own instance.",
  },
];

const toggleItem = (index: number) => {
  const itemIndex = openItems.value.indexOf(index);
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1);
  } else {
    openItems.value.push(index);
  }
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to {
  opacity: 1;
  max-height: 200px;
}

.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}

.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
