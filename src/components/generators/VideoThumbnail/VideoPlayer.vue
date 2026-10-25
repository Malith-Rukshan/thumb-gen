<template>
  <div class="space-y-4">
    <!-- Video Container -->
    <div class="relative bg-black rounded-lg overflow-hidden">
      <video
        ref="videoRef"
        :src="src"
        @loadedmetadata="handleLoadedMetadata"
        @error="handleError"
        @timeupdate="handleTimeUpdate"
        class="w-full h-auto max-h-[500px]"
        crossorigin="anonymous"
        preload="metadata"
      />

      <!-- Loading overlay -->
      <Transition name="fade">
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <LoadingSpinner text="Loading video..." />
        </div>
      </Transition>
    </div>

    <!-- Controls -->
    <div class="space-y-4">
      <!-- Timeline -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>{{ formatDuration(currentTime) }}</span>
          <span>{{ formatDuration(duration) }}</span>
        </div>

        <div class="relative">
          <input
            v-model.number="currentTime"
            type="range"
            :min="0"
            :max="duration"
            :step="0.1"
            @input="handleSeek"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />

          <!-- Frame markers -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              v-for="frame in frames"
              :key="frame.id"
              :style="{ left: `${(frame.timestamp / duration) * 100}%` }"
              class="absolute top-0 w-0.5 h-2 bg-blue-600"
            />
          </div>
        </div>
      </div>

      <!-- Control buttons -->
      <div class="flex items-center justify-center space-x-4">
        <!-- Frame backward -->
        <button
          @click="previousFrame"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Previous frame"
          type="button"
          aria-label="Previous frame"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>

        <!-- Step backward -->
        <button
          @click="stepBackward"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Step backward 1s"
          type="button"
          aria-label="Back"
        >
          <SkipBackIcon class="w-5 h-5" />
        </button>

        <!-- Play/Pause -->
        <button
          @click="togglePlayPause"
          class="btn btn-primary btn-icon !rounded-full p-3"
        >
          <component :is="isPlaying ? PauseIcon : PlayIcon" class="w-6 h-6" />
        </button>

        <!-- Step forward -->
        <button
          @click="stepForward"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Step forward 1s"
          type="button"
          aria-label="Forward"
        >
          <SkipForwardIcon class="w-5 h-5" />
        </button>

        <!-- Frame forward -->
        <button
          @click="nextFrame"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Next frame"
          type="button"
          aria-label="Next frame"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Capture button -->
      <div class="flex justify-center">
        <button
          @click="captureFrame"
          :disabled="!videoRef"
          class="btn btn-success btn-lg"
        >
          <CameraIcon class="w-5 h-5" />
          Capture Frame
        </button>
      </div>

      <!-- Quick capture options -->
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="option in quickCaptureOptions"
          :key="option.label"
          @click="quickCapture(option.count, option.interval)"
          :disabled="isCapturing"
          class="btn btn-secondary btn-sm"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  PlayIcon,
  PauseIcon,
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@lucide/vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { formatDuration } from "@/utils/fileHelpers";
import type { VideoFrame } from "@/types";

withDefaults(
  defineProps<{
    src: string;
    /** Captured frames owned by the parent, used for timeline markers */
    frames?: VideoFrame[];
  }>(),
  { frames: () => [] },
);

const emit = defineEmits<{
  loaded: [duration: number];
  frameCaptured: [frame: VideoFrame];
  error: [error: string];
}>();

const videoRef = ref<HTMLVideoElement>();
const isLoading = ref(true);
const isPlaying = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const isCapturing = ref(false);

const quickCaptureOptions = [
  { label: "Every 5s", count: -1, interval: 5 },
  { label: "Every 10s", count: -1, interval: 10 },
  { label: "First 5 frames", count: 5, interval: 1 },
  { label: "Start, Middle, End", count: 3, interval: -1 },
];

function handleLoadedMetadata() {
  if (!videoRef.value) return;

  isLoading.value = false;
  duration.value = videoRef.value.duration;
  emit("loaded", duration.value);
}

function handleError() {
  isLoading.value = false;
  emit("error", "Failed to load video");
}

function handleTimeUpdate() {
  if (!videoRef.value) return;
  currentTime.value = videoRef.value.currentTime;
}

function handleSeek() {
  if (!videoRef.value) return;
  videoRef.value.currentTime = currentTime.value;
}

function togglePlayPause() {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }
  isPlaying.value = !isPlaying.value;
}

function stepForward() {
  if (!videoRef.value) return;
  videoRef.value.currentTime = Math.min(
    videoRef.value.currentTime + 1,
    duration.value,
  );
}

function stepBackward() {
  if (!videoRef.value) return;
  videoRef.value.currentTime = Math.max(videoRef.value.currentTime - 1, 0);
}

function nextFrame() {
  if (!videoRef.value) return;
  // Approximate frame step (assuming 30fps)
  videoRef.value.currentTime = Math.min(
    videoRef.value.currentTime + 1 / 30,
    duration.value,
  );
}

function previousFrame() {
  if (!videoRef.value) return;
  // Approximate frame step (assuming 30fps)
  videoRef.value.currentTime = Math.max(videoRef.value.currentTime - 1 / 30, 0);
}

async function captureFrame() {
  if (!videoRef.value) return;

  const video = videoRef.value;

  // Check if video is ready
  if (video.readyState < 2) {
    console.error("Video not ready for capture");
    return;
  }

  // Pause video if playing to ensure stable frame
  const wasPlaying = !video.paused;
  if (wasPlaying) {
    video.pause();
  }

  try {
    // Create canvas and context
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    // Draw the current frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Keep frames lossless; the export step applies the chosen format/quality
    const thumbnail = canvas.toDataURL("image/png");

    const frame: VideoFrame = {
      id: `frame-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: video.currentTime,
      thumbnail,
    };

    emit("frameCaptured", frame);
  } catch (error) {
    console.error("Error capturing frame:", error);
  } finally {
    // Resume playback if it was playing
    if (wasPlaying) {
      video.play();
    }
  }
}

/** Seek and wait for the frame to be decoded (with a timeout so we never hang). */
function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer);
      video.removeEventListener("seeked", done);
      resolve();
    };
    const timer = setTimeout(done, 3000);
    video.addEventListener("seeked", done, { once: true });
    video.currentTime = time;
  });
}

async function quickCapture(count: number, interval: number) {
  if (!videoRef.value || isCapturing.value) return;

  const video = videoRef.value;
  const wasPlaying = !video.paused;
  const lastTime = Math.max(0, duration.value - 0.1);

  let timestamps: number[];
  if (interval === -1 && count === 3) {
    // Special case: Start, Middle, End
    timestamps = [0, duration.value / 2, lastTime];
  } else if (count === -1) {
    // Capture at intervals throughout the video (0, n, 2n, ... up to the end)
    const frameCount = Math.ceil(duration.value / interval);
    timestamps = Array.from({ length: frameCount }, (_, i) => i * interval);
  } else {
    // Capture specific number of frames
    timestamps = Array.from({ length: count }, (_, i) => i * interval);
  }
  // Clamp to the video length and drop duplicates (short videos)
  timestamps = [...new Set(timestamps.map((t) => Math.min(t, lastTime)))];

  isCapturing.value = true;
  if (wasPlaying) {
    video.pause();
  }

  try {
    for (const timestamp of timestamps) {
      await seekTo(video, timestamp);
      await captureFrame();
    }
  } finally {
    isCapturing.value = false;
    if (wasPlaying) {
      video.play();
    }
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener("play", () => (isPlaying.value = true));
    videoRef.value.addEventListener("pause", () => (isPlaying.value = false));
  }
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
});
</script>
