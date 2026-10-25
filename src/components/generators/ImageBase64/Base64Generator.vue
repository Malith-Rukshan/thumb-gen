<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-4 mb-8">
      <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
        Image to Base64 Converter
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Convert images to tiny base64 placeholders for progressive loading.
        Create ultra-light previews that enhance user experience.
      </p>

      <!-- Use Cases -->
      <div
        class="rounded-2xl p-5 space-y-2 bg-linear-to-br from-blue-50 to-indigo-50/70 ring-1 ring-blue-100"
      >
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <svg
            class="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Perfect for:
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Progressive image loading placeholders</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Gatsby and Next.js blur-up effects</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Email HTML image embedding</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>CSS background placeholders</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Offline-first app image caching</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Reducing layout shift in web apps</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Upload Section -->
    <div v-if="!imageFile">
      <DropZone
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        :icon="ImageIcon"
        title="Drop your image here"
        subtitle="or click to browse"
        :formats="['PNG', 'JPG', 'WebP', 'GIF']"
        allow-url
        paste
        @files="handleImageUpload"
        @url="handleImageUrl"
        @error="errorMessage = $event"
      />
    </div>

    <!-- Image Processing Section -->
    <div v-else class="space-y-6">
      <!-- Image Info Bar -->
      <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div class="flex items-center space-x-3">
          <ImageIcon class="w-5 h-5 text-gray-600" />
          <div>
            <p class="text-sm font-medium text-gray-900">
              {{ imageFile.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatFileSize(imageFile.size) }} •
              {{ originalDimensions.width }}×{{ originalDimensions.height }}
            </p>
          </div>
        </div>
        <button
          @click="resetImage"
          class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          type="button"
          aria-label="Remove"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Preview Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Original Image -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Original</h3>
          <div class="relative bg-checkerboard rounded-lg overflow-hidden">
            <img
              :src="imageUrl"
              :alt="imageFile.name"
              class="w-full h-auto"
              @load="handleImageLoad"
            />
          </div>
        </div>

        <!-- Base64 Preview -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Base64 Preview ({{ previewSize }}×{{ previewSize }}px)
          </h3>
          <div class="relative bg-checkerboard rounded-lg overflow-hidden">
            <div
              class="w-full"
              :style="{
                paddingBottom: aspectRatio + '%',
                backgroundImage: `url(${base64Result?.preview.dataUri})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
                transform: 'scale(1.1)',
              }"
            />
          </div>
        </div>
      </div>

      <!-- Options -->
      <div
        class="p-6 bg-gray-50/80 rounded-2xl ring-1 ring-gray-200/70 space-y-4"
      >
        <h4 class="text-base font-medium text-gray-900">Options</h4>

        <div class="space-y-4">
          <!-- Preview Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preview Size: {{ previewSize }}×{{ previewSize }}px
            </label>
            <input
              v-model.number="previewSize"
              type="range"
              min="2"
              max="32"
              step="2"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>2px</span>
              <span>32px</span>
            </div>
          </div>

          <!-- Quality -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Quality: {{ quality }}%
            </label>
            <input
              v-model.number="quality"
              type="range"
              min="10"
              max="100"
              step="10"
              class="w-full"
            />
          </div>
        </div>

        <!-- Stats -->
        <div
          v-if="base64Result"
          class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200"
        >
          <div>
            <p class="text-sm text-gray-600">Original Size</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ formatFileSize(imageFile.size) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Base64 Size</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ formatFileSize(base64Result.preview.dataUri.length) }}
            </p>
            <p class="text-xs text-gray-500">
              {{ base64Result.preview.dataUri.length.toLocaleString() }} bytes
            </p>
          </div>
        </div>
      </div>

      <!-- Code Output -->
      <div v-if="base64Result" class="space-y-4">
        <h4 class="text-lg font-semibold text-gray-900">Generated Code</h4>

        <!-- Code Type Tabs -->
        <div class="flex space-x-2">
          <button
            v-for="tab in codeTabs"
            :key="tab.id"
            @click="activeCodeTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              activeCodeTab === tab.id ? 'chip chip-active' : 'chip',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Code Display -->
        <div class="relative">
          <pre
            class="p-4 bg-gray-950 text-gray-100 rounded-lg overflow-x-auto text-sm"
          ><code>{{ generatedCode }}</code></pre>
          <button
            @click="copyToClipboard"
            class="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
          >
            <CopyIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Copy Feedback -->
        <Transition name="fade">
          <div v-if="copied" class="text-sm text-green-600">
            ✓ Copied to clipboard!
          </div>
        </Transition>
      </div>
    </div>

    <!-- Error Message -->
    <Transition name="fade">
      <div
        v-if="errorMessage"
        class="p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { ImageIcon, XIcon, CopyIcon } from "@lucide/vue";
import DropZone from "@/components/common/DropZone.vue";
import { formatFileSize } from "@/utils/fileHelpers";
import { createCanvas } from "@/utils/canvas";
import type { Base64Result, Dimensions } from "@/types";

const imageFile = ref<File | null>(null);
const imageUrl = ref("");
const originalDimensions = ref<Dimensions>({ width: 0, height: 0 });
const previewSize = ref(6);
const quality = ref(80);
const base64Result = ref<Base64Result | null>(null);
const errorMessage = ref("");
const activeCodeTab = ref("dataUri");
const copied = ref(false);

const aspectRatio = computed(() => {
  if (!originalDimensions.value.width || !originalDimensions.value.height)
    return 100;
  return (
    (originalDimensions.value.height / originalDimensions.value.width) * 100
  );
});

const codeTabs = [
  { id: "dataUri", label: "Data URI" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
];

const generatedCode = computed(() => {
  if (!base64Result.value) return "";

  const { dataUri } = base64Result.value.preview;
  const paddingBottom = `${aspectRatio.value}%`;

  switch (activeCodeTab.value) {
    case "html":
      return `<!-- Placeholder container -->
<div class="image-placeholder" style="
  position: relative;
  width: 100%;
  padding-bottom: ${paddingBottom};
  background-image: url('${dataUri}');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  overflow: hidden;
">
  <!-- Lazy load actual image -->
  <img
    src="your-image.jpg"
    alt="Description"
    loading="lazy"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    "
    onload="this.parentElement.style.filter = 'none'"
  />
</div>`;

    case "css":
      return `.image-placeholder {
  position: relative;
  width: 100%;
  padding-bottom: ${paddingBottom};
  background-image: url('${dataUri}');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transition: filter 0.3s ease;
  overflow: hidden;
}

.image-placeholder.loaded {
  filter: none;
}

.image-placeholder img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}`;

    case "react":
      return `import { useState } from 'react';

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div
      className="image-placeholder"
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '${paddingBottom}',
        backgroundImage: \`url('${dataUri}')\`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: loaded ? 'none' : 'blur(8px)',
        transition: 'filter 0.3s ease',
        overflow: 'hidden'
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}`;

    case "vue":
      return `<template>
  <div
    class="image-placeholder"
    :style="{
      position: 'relative',
      width: '100%',
      paddingBottom: '${paddingBottom}',
      backgroundImage: \`url('${dataUri}')\`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: loaded ? 'none' : 'blur(8px)',
      transition: 'filter 0.3s ease',
      overflow: 'hidden'
    }"
  >
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      @load="loaded = true"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      "
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: String,
  alt: String
})

const loaded = ref(false)
<\/script>`;

    case "dataUri":
      return dataUri;

    default:
      return "";
  }
});

function handleImageUpload(files: File[]) {
  resetImage();
  imageFile.value = files[0];
  imageUrl.value = URL.createObjectURL(files[0]);
  errorMessage.value = "";
}

async function handleImageUrl(url: string) {
  try {
    // For external URLs, we'll create an image element to handle CORS
    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });

    // Create a blob from the loaded image
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        imageFile.value = new File([blob], "image-from-url.png", {
          type: "image/png",
        });
        imageUrl.value = URL.createObjectURL(blob);
        errorMessage.value = "";
      } else {
        errorMessage.value = "Failed to process image";
      }
    }, "image/png");
  } catch (error) {
    errorMessage.value =
      "Failed to load image from URL. The image may be protected by CORS policy.";
    console.error(error);
  }
}

async function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  originalDimensions.value = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
  generateBase64();
}

async function generateBase64() {
  if (!imageUrl.value) return;

  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl.value;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Calculate the canvas size maintaining aspect ratio
    const aspectRatio = img.width / img.height;
    let canvasWidth = previewSize.value;
    let canvasHeight = previewSize.value;

    if (aspectRatio > 1) {
      // Landscape
      canvasHeight = Math.max(1, Math.round(previewSize.value / aspectRatio));
    } else {
      // Portrait
      canvasWidth = Math.max(1, Math.round(previewSize.value * aspectRatio));
    }

    // Create small canvas
    const { canvas, ctx } = createCanvas(canvasWidth, canvasHeight);

    // JPEG has no alpha: give transparent images a white backdrop instead of black
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw image to fit canvas
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    // Convert to data URI
    const dataUri = canvas.toDataURL("image/jpeg", quality.value / 100);
    const base64 = dataUri.split(",")[1];

    base64Result.value = {
      original: {
        width: originalDimensions.value.width,
        height: originalDimensions.value.height,
        size: imageFile.value?.size || 0,
      },
      preview: {
        width: canvasWidth,
        height: canvasHeight,
        dataUri,
        base64,
      },
    };
  } catch (error) {
    errorMessage.value = "Failed to generate Base64 preview";
    console.error(error);
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedCode.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    errorMessage.value =
      "Couldn't copy to clipboard. Please copy the code manually.";
  }
}

function resetImage() {
  if (imageUrl.value && imageUrl.value.startsWith("blob:")) {
    URL.revokeObjectURL(imageUrl.value);
  }
  imageFile.value = null;
  imageUrl.value = "";
  originalDimensions.value = { width: 0, height: 0 };
  base64Result.value = null;
  errorMessage.value = "";
}

// Regenerate when options change
watch([previewSize, quality], () => {
  if (imageUrl.value && originalDimensions.value.width) {
    generateBase64();
  }
});

// Release the object URL when leaving the page
onUnmounted(resetImage);
</script>

<style scoped>
.bg-checkerboard {
  background-image:
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
