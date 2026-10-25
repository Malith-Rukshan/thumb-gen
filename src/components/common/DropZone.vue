<template>
  <div
    @drop="handleDrop"
    @dragover.prevent
    @dragenter.prevent="handleDragEnter"
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

    <div
      role="button"
      tabindex="0"
      :aria-label="title"
      @click="fileInput?.click()"
      @keydown.enter.self.prevent="fileInput?.click()"
      @keydown.space.self.prevent="fileInput?.click()"
      class="p-8 lg:p-12 cursor-pointer rounded-xl focus-visible:outline-offset-[-4px]"
    >
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
          <p v-if="paste" class="hidden sm:block text-xs text-gray-400 mt-2">
            You can also paste with
            <kbd
              class="px-1.5 py-0.5 rounded-md bg-gray-100 ring-1 ring-gray-200 font-sans text-[11px] text-gray-600"
              >{{ pasteShortcut }}</kbd
            >
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
        <!-- .stop: typing in the URL box must not open the file picker -->
        <div v-if="allowUrl" class="w-full max-w-md" @click.stop @keydown.stop>
          <div class="relative mt-4">
            <input
              v-model="urlInput"
              @keydown.enter="handleUrlSubmit"
              type="url"
              placeholder="Or paste URL here..."
              class="input pl-10"
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
import { onBeforeUnmount, onMounted, ref } from "vue";
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
    /** Accept files pasted from the clipboard (Ctrl/Cmd+V) anywhere on the page */
    paste?: boolean;
    className?: string;
  }>(),
  {
    subtitle: "or click to browse",
    formats: () => [],
    showFormats: true,
    allowUrl: false,
    paste: false,
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

const pasteShortcut =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.userAgent)
    ? "⌘V"
    : "Ctrl+V";

// dragenter/dragleave fire for every child element, so count them
function handleDragEnter() {
  dragCounter.value++;
  isDragging.value = true;
}

function handleDragLeave(_e: DragEvent) {
  dragCounter.value = Math.max(0, dragCounter.value - 1);
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDragging.value = false;
  dragCounter.value = 0;

  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length > 0) {
    processFiles(files);
  }
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  // Reset so choosing the same file again still fires "change"
  input.value = "";
  if (files.length > 0) {
    processFiles(files);
  }
}

function handlePaste(e: ClipboardEvent) {
  // Don't hijack normal pasting into text fields
  const target = e.target as HTMLElement | null;
  if (target?.closest("input, textarea, select, [contenteditable='true']")) {
    return;
  }

  const files = Array.from(e.clipboardData?.files || []);
  if (files.length > 0) {
    e.preventDefault();
    processFiles(props.multiple ? files : files.slice(0, 1));
    return;
  }

  // A pasted link works like the URL box
  const text = e.clipboardData?.getData("text/plain")?.trim();
  if (props.allowUrl && text && /^https?:\/\//i.test(text)) {
    e.preventDefault();
    urlInput.value = text;
    handleUrlSubmit();
  }
}

function matchesAccept(file: File, acceptedTypes: string[]): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return acceptedTypes.some((accepted) => {
    if (accepted.startsWith(".")) {
      return name.endsWith(accepted);
    }
    if (accepted.endsWith("/*")) {
      return type.startsWith(accepted.slice(0, -1));
    }
    return type === accepted;
  });
}

function processFiles(files: File[]) {
  if (!props.multiple && files.length > 1) {
    emit("error", "Only one file is allowed");
    return;
  }

  // Validate file types if accept is specified
  if (props.accept) {
    const acceptedTypes = props.accept
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const invalidFile = files.find(
      (file) => !matchesAccept(file, acceptedTypes),
    );

    if (invalidFile) {
      emit("error", `Invalid file type: ${invalidFile.name}`);
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

onMounted(() => {
  if (props.paste) window.addEventListener("paste", handlePaste);
});

onBeforeUnmount(() => {
  window.removeEventListener("paste", handlePaste);
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
</style>
