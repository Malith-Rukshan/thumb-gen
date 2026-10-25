<template>
  <div
    @drop="handleDrop"
    @dragover.prevent
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="handleDragLeave"
    :class="[
      'relative border-2 border-dashed rounded-xl transition-all duration-300 shadow-[0_0px_4px_rgba(0,0,0,0.1)]',
      isDragging
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-[0_0px_8px_rgba(59,130,246,0.2)]'
        : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 shadow-[0_0px_4px_rgba(0,0,0,0.05)]',
      className,
    ]"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileSelect"
      class="hidden"
    />

    <div @click="fileInput?.click()" class="p-8 lg:p-12 cursor-pointer">
      <div class="flex flex-col items-center justify-center space-y-4">
        <!-- Icon -->
        <div class="relative">
          <div
            class="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"
          ></div>
          <component
            :is="icon"
            class="w-16 h-16 lg:w-20 lg:h-20 text-gray-400 dark:text-gray-600 relative"
          />
        </div>

        <!-- Text -->
        <div class="text-center">
          <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
            {{ title }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {{ subtitle }}
          </p>
        </div>

        <!-- Supported formats -->
        <div
          v-if="showFormats && formats.length > 0"
          class="flex flex-wrap gap-2 justify-center"
        >
          <span
            v-for="format in formats"
            :key="format"
            class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
          >
            {{ format }}
          </span>
        </div>

        <!-- URL Input -->
        <div v-if="allowUrl" class="w-full max-w-md">
          <div class="relative mt-4">
            <input
              v-model="urlInput"
              @keydown.enter="handleUrlSubmit"
              type="url"
              placeholder="Or paste URL here..."
              class="w-full px-4 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <LinkIcon
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
      >
        <LoadingSpinner />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Component } from "vue";
import { LinkIcon } from "@lucide/vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = withDefaults(
  defineProps<{
    accept?: string;
    multiple?: boolean;
    icon: Component;
    title: string;
    subtitle?: string;
    formats?: string[];
    showFormats?: boolean;
    allowUrl?: boolean;
    className?: string;
  }>(),
  {
    subtitle: "or click to browse",
    formats: () => [],
    showFormats: true,
    allowUrl: false,
    multiple: false,
  },
);

const emit = defineEmits<{
  files: [files: File[]];
  url: [url: string];
  error: [error: string];
}>();

const fileInput = ref<HTMLInputElement>();
const isDragging = ref(false);
const isLoading = ref(false);
const urlInput = ref("");
const dragCounter = ref(0);

function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDragging.value = false;
  dragCounter.value = 0;

  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length > 0) {
    processFiles(files);
  }
}

function handleDragLeave(_e: DragEvent) {
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  if (files.length > 0) {
    processFiles(files);
  }
}

function processFiles(files: File[]) {
  if (!props.multiple && files.length > 1) {
    emit("error", "Only one file is allowed");
    return;
  }

  // Validate file types if accept is specified
  if (props.accept) {
    const acceptedTypes = props.accept.split(",").map((t) => t.trim());
    const invalidFiles = files.filter((file) => {
      return !acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.endsWith(type);
        }
        return file.type.match(type);
      });
    });

    if (invalidFiles.length > 0) {
      emit("error", `Invalid file type: ${invalidFiles[0].name}`);
      return;
    }
  }

  emit("files", files);
}

async function handleUrlSubmit() {
  if (!urlInput.value) return;

  try {
    isLoading.value = true;
    const url = new URL(urlInput.value);
    emit("url", url.toString());
    urlInput.value = "";
  } catch (error) {
    emit("error", "Invalid URL");
  } finally {
    isLoading.value = false;
  }
}
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
</style>
