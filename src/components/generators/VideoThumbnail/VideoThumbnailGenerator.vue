<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-4 mb-8">
      <h2 class="text-3xl font-bold text-gray-900">
        Video Thumbnail Generator
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Extract perfect frames from your videos to create engaging thumbnails.
        Capture the exact moment that tells your story.
      </p>

      <!-- Use Cases -->
      <div class="bg-blue-50 rounded-lg p-4 space-y-2">
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
          Perfect for:
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>YouTube video thumbnails with the perfect frame</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Video course preview images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Social media video post covers</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Product demo screenshots</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Movie or video clip posters</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Video portfolio showcases</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Upload Section -->
    <div v-if="!videoFile">
      <DropZone
        accept="video/mp4,video/webm,video/ogg"
        :icon="VideoIcon"
        title="Drop your video here"
        subtitle="or click to browse"
        :formats="['MP4', 'WebM', 'OGG']"
        allow-url
        @files="handleVideoUpload"
        @url="handleVideoUrl"
        @error="errorMessage = $event"
      />
    </div>

    <!-- Video Player Section -->
    <div v-else class="space-y-6">
      <!-- Video Info Bar -->
      <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div class="flex items-center space-x-3">
          <VideoIcon class="w-5 h-5 text-gray-600" />
          <div>
            <p class="text-sm font-medium text-gray-900">
              {{ videoFile.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatFileSize(videoFile.size) }} •
              {{ formatDuration(videoDuration) }}
            </p>
          </div>
        </div>
        <button
          @click="resetVideo"
          class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Video Player -->
      <VideoPlayer
        :src="videoUrl"
        @loaded="handleVideoLoaded"
        @frame-captured="handleFrameCapture"
        @error="errorMessage = $event"
      />

      <!-- Captured Frames -->
      <div v-if="capturedFrames.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">
            Captured Frames ({{ capturedFrames.length }})
          </h3>
          <div class="flex items-center space-x-2">
            <button
              @click="selectAllFrames"
              class="text-sm text-blue-600 hover:underline"
            >
              Select All
            </button>
            <span class="text-gray-400">•</span>
            <button
              @click="deselectAllFrames"
              class="text-sm text-blue-600 hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>

        <!-- Frames Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="frame in capturedFrames"
            :key="frame.id"
            class="relative group"
          >
            <div
              @click="toggleFrameSelection(frame.id)"
              :class="[
                'relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200',
                frame.selected
                  ? 'ring-2 ring-blue-600 transform scale-95'
                  : 'hover:ring-2 hover:ring-gray-300',
              ]"
            >
              <img
                :src="frame.thumbnail"
                :alt="`Frame at ${formatDuration(frame.timestamp)}`"
                class="w-full h-auto"
              />

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div
                  class="absolute bottom-2 left-2 right-2 flex items-center justify-between"
                >
                  <span class="text-xs text-white font-medium">
                    {{ formatDuration(frame.timestamp) }}
                  </span>
                  <button
                    @click.stop="removeFrame(frame.id)"
                    class="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <TrashIcon class="w-3 h-3" />
                  </button>
                </div>
              </div>

              <!-- Selection indicator -->
              <div
                v-if="frame.selected"
                class="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Export Options -->
        <div class="mt-6 p-6 bg-gray-50 rounded-lg space-y-4">
          <h4 class="text-base font-medium text-gray-900">Export Options</h4>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Format -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                v-model="exportOptions.format"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <!-- Quality -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Quality ({{ exportOptions.quality }}%)
              </label>
              <input
                v-model.number="exportOptions.quality"
                type="range"
                min="10"
                max="100"
                step="10"
                class="w-full"
              />
            </div>

            <!-- Size -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                v-model="exportSize"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="original">Original</option>
                <option value="1920x1080">1920×1080 (Full HD)</option>
                <option value="1280x720">1280×720 (HD)</option>
                <option value="854x480">854×480 (SD)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          <!-- Custom dimensions -->
          <div v-if="exportSize === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Width
              </label>
              <input
                v-model.number="customDimensions.width"
                type="number"
                min="1"
                max="4096"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <input
                v-model.number="customDimensions.height"
                type="number"
                min="1"
                max="4096"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Export buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="exportSelectedFrames"
              :disabled="selectedFrames.length === 0 || isExporting"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              <DownloadIcon class="w-4 h-4" />
              Export Selected ({{ selectedFrames.length }})
            </button>
            <button
              @click="exportAllFrames"
              :disabled="capturedFrames.length === 0 || isExporting"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              <DownloadIcon class="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>
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
import { ref, computed, onUnmounted } from "vue";
import {
  VideoIcon,
  XIcon,
  CheckIcon,
  TrashIcon,
  DownloadIcon,
} from "@lucide/vue";
import DropZone from "@/components/common/DropZone.vue";
import VideoPlayer from "./VideoPlayer.vue";
import {
  formatFileSize,
  formatDuration,
  downloadMultipleFiles,
  generateFileName,
} from "@/utils/fileHelpers";
import { canvasToBlob } from "@/utils/canvas";
import type { VideoFrame, ExportOptions, Dimensions } from "@/types";

const videoFile = ref<File | null>(null);
const videoUrl = ref("");
const videoDuration = ref(0);
const capturedFrames = ref<VideoFrame[]>([]);
const errorMessage = ref("");
const isExporting = ref(false);

const exportOptions = ref<ExportOptions>({
  format: "png",
  quality: 90,
});

const exportSize = ref("original");
const customDimensions = ref<Dimensions>({ width: 1920, height: 1080 });

const selectedFrames = computed(() =>
  capturedFrames.value.filter((frame) => frame.selected),
);

function handleVideoUpload(files: File[]) {
  videoFile.value = files[0];
  videoUrl.value = URL.createObjectURL(files[0]);
  errorMessage.value = "";
}

async function handleVideoUrl(url: string) {
  try {
    // Validate URL
    new URL(url);

    // Set the URL directly - browser will handle CORS
    videoUrl.value = url;
    videoFile.value = new File([], url.split("/").pop() || "video-from-url");
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = "Invalid video URL";
    console.error(error);
  }
}

function handleVideoLoaded(duration: number) {
  videoDuration.value = duration;
}

function handleFrameCapture(frame: VideoFrame) {
  capturedFrames.value.push({
    ...frame,
    selected: false,
  });
}

function toggleFrameSelection(frameId: string) {
  const frame = capturedFrames.value.find((f) => f.id === frameId);
  if (frame) {
    frame.selected = !frame.selected;
  }
}

function selectAllFrames() {
  capturedFrames.value.forEach((frame) => {
    frame.selected = true;
  });
}

function deselectAllFrames() {
  capturedFrames.value.forEach((frame) => {
    frame.selected = false;
  });
}

function removeFrame(frameId: string) {
  capturedFrames.value = capturedFrames.value.filter((f) => f.id !== frameId);
}

function resetVideo() {
  if (videoUrl.value) {
    URL.revokeObjectURL(videoUrl.value);
  }
  videoFile.value = null;
  videoUrl.value = "";
  videoDuration.value = 0;
  capturedFrames.value = [];
  errorMessage.value = "";
}

async function exportFrames(frames: VideoFrame[]) {
  isExporting.value = true;

  try {
    const files = await Promise.all(
      frames.map(async (frame, index) => {
        // Load the thumbnail image
        const img = new Image();
        img.src = frame.thumbnail;
        await new Promise((resolve) => (img.onload = resolve));

        // Create canvas with export dimensions
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        let dimensions = { width: img.width, height: img.height };

        if (exportSize.value !== "original") {
          if (exportSize.value === "custom") {
            dimensions = customDimensions.value;
          } else {
            const [width, height] = exportSize.value.split("x").map(Number);
            dimensions = { width, height };
          }
        }

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Draw image maintaining aspect ratio
        const scale = Math.min(
          dimensions.width / img.width,
          dimensions.height / img.height,
        );
        const x = (dimensions.width - img.width * scale) / 2;
        const y = (dimensions.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Convert to blob
        const blob = await canvasToBlob(canvas, exportOptions.value);

        return {
          blob,
          name: generateFileName(
            `thumbnail_${formatDuration(frame.timestamp).replace(/:/g, "-")}`,
            index,
            exportOptions.value.format,
          ),
        };
      }),
    );

    await downloadMultipleFiles(files);
  } catch (error) {
    errorMessage.value = "Failed to export frames";
    console.error(error);
  } finally {
    isExporting.value = false;
  }
}

function exportSelectedFrames() {
  exportFrames(selectedFrames.value);
}

function exportAllFrames() {
  exportFrames(capturedFrames.value);
}

onUnmounted(() => {
  resetVideo();
});
</script>
