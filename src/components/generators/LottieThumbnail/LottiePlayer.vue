<template>
  <div class="space-y-4">
    <!-- Lottie Container -->
    <div class="relative bg-gray-100 rounded-lg overflow-hidden">
      <div
        ref="lottieContainer"
        class="flex items-center justify-center"
        :style="{
          width: animationWidth + 'px',
          height: animationHeight + 'px',
          maxWidth: '100%',
          margin: '0 auto',
        }"
      />

      <!-- Loading overlay -->
      <Transition name="fade">
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <LoadingSpinner text="Loading animation..." />
        </div>
      </Transition>
    </div>

    <!-- Controls -->
    <div class="space-y-4">
      <!-- Timeline -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>Frame {{ Math.floor(currentFrame) }} / {{ totalFrames }}</span>
          <span
            >{{ formatDuration(currentTime) }} /
            {{ formatDuration(duration) }}</span
          >
        </div>

        <div class="relative">
          <input
            v-model.number="currentFrame"
            type="range"
            :min="0"
            :max="totalFrames"
            :step="1"
            @input="handleSeek"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />

          <!-- Frame markers -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              v-for="frame in capturedFrames"
              :key="frame.id"
              :style="{ left: `${(frame.frame / totalFrames) * 100}%` }"
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
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>

        <!-- Step backward -->
        <button
          @click="stepBackward"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Step backward 10 frames"
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
          title="Step forward 10 frames"
        >
          <SkipForwardIcon class="w-5 h-5" />
        </button>

        <!-- Frame forward -->
        <button
          @click="nextFrame"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Next frame"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Playback speed -->
      <div class="flex items-center justify-center space-x-4">
        <label class="text-sm text-gray-600">Speed:</label>
        <div class="flex items-center space-x-2">
          <button
            v-for="speed in playbackSpeeds"
            :key="speed"
            @click="setPlaybackSpeed(speed)"
            :class="[
              'px-2 py-1 text-sm rounded transition-colors',
              playbackSpeed === speed
                ? 'chip chip-active'
                : 'chip',
            ]"
          >
            {{ speed }}x
          </button>
        </div>
      </div>

      <!-- Capture button -->
      <div class="flex justify-center">
        <button
          @click="captureFrame"
          :disabled="!animation"
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
          class="btn btn-secondary btn-sm"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import lottie, { type AnimationItem } from "lottie-web";
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
import type { LottieFrame } from "@/types";

const props = defineProps<{
  animationData: any;
}>();

const emit = defineEmits<{
  loaded: [frames: number, duration: number];
  frameCaptured: [frame: LottieFrame];
  error: [error: string];
}>();

const lottieContainer = ref<HTMLDivElement>();
const animation = ref<AnimationItem | null>(null);
const isLoading = ref(true);
const isPlaying = ref(false);
const totalFrames = ref(0);
const currentFrame = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const frameRate = ref(30);
const playbackSpeed = ref(1);
const capturedFrames = ref<LottieFrame[]>([]);
const animationWidth = ref(512);
const animationHeight = ref(512);

const playbackSpeeds = [0.25, 0.5, 1, 1.5, 2];

const quickCaptureOptions = [
  { label: "Every 10 frames", count: -1, interval: 10 },
  { label: "Every 30 frames", count: -1, interval: 30 },
  { label: "First 5 frames", count: 5, interval: 1 },
  { label: "Start, Middle, End", count: 3, interval: -1 },
];

function initializeLottie() {
  if (!lottieContainer.value || !props.animationData) return;

  try {
    // Clean up previous animation
    if (animation.value) {
      animation.value.destroy();
    }

    animation.value = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: "canvas",
      loop: true,
      autoplay: false,
      animationData: props.animationData,
    });

    animation.value.addEventListener("DOMLoaded", () => {
      if (!animation.value) return;

      // Get animation dimensions from the animation data
      const animData = props.animationData;
      animationWidth.value = animData.w || 512;
      animationHeight.value = animData.h || 512;

      totalFrames.value = animation.value.totalFrames;
      frameRate.value = animation.value.frameRate;
      duration.value = totalFrames.value / frameRate.value;

      isLoading.value = false;
      emit("loaded", totalFrames.value, duration.value);
    });

    animation.value.addEventListener("enterFrame", () => {
      if (!animation.value) return;
      currentFrame.value = animation.value.currentFrame;
      currentTime.value = currentFrame.value / frameRate.value;
    });

    animation.value.addEventListener("error", (error) => {
      console.error("Lottie error:", error);
      emit("error", "Failed to load animation");
      isLoading.value = false;
    });
  } catch (error) {
    console.error("Failed to initialize Lottie:", error);
    emit("error", "Failed to initialize animation");
    isLoading.value = false;
  }
}

function handleSeek() {
  if (!animation.value) return;
  animation.value.goToAndStop(currentFrame.value, true);
}

function togglePlayPause() {
  if (!animation.value) return;

  if (isPlaying.value) {
    animation.value.pause();
  } else {
    animation.value.play();
  }
  isPlaying.value = !isPlaying.value;
}

function setPlaybackSpeed(speed: number) {
  if (!animation.value) return;
  playbackSpeed.value = speed;
  animation.value.setSpeed(speed);
}

function stepForward() {
  if (!animation.value) return;
  const newFrame = Math.min(currentFrame.value + 10, totalFrames.value - 1);
  animation.value.goToAndStop(newFrame, true);
}

function stepBackward() {
  if (!animation.value) return;
  const newFrame = Math.max(currentFrame.value - 10, 0);
  animation.value.goToAndStop(newFrame, true);
}

function nextFrame() {
  if (!animation.value) return;
  const newFrame = Math.min(currentFrame.value + 1, totalFrames.value - 1);
  animation.value.goToAndStop(newFrame, true);
}

function previousFrame() {
  if (!animation.value) return;
  const newFrame = Math.max(currentFrame.value - 1, 0);
  animation.value.goToAndStop(newFrame, true);
}

function captureFrame() {
  if (!animation.value || !lottieContainer.value) return;

  const canvas = lottieContainer.value.querySelector("canvas");
  if (!canvas) return;

  const thumbnail = canvas.toDataURL("image/png");

  const frame: LottieFrame = {
    id: `frame-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    frame: Math.floor(currentFrame.value),
    timestamp: currentTime.value,
    thumbnail,
  };

  capturedFrames.value.push(frame);
  emit("frameCaptured", frame);
}

async function quickCapture(count: number, interval: number) {
  if (!animation.value) return;

  const wasPlaying = isPlaying.value;

  if (wasPlaying) {
    animation.value.pause();
    isPlaying.value = false;
  }

  if (interval === -1 && count === 3) {
    // Special case: Start, Middle, End
    const frames = [
      0,
      Math.floor(totalFrames.value / 2),
      totalFrames.value - 1,
    ];

    for (const frame of frames) {
      animation.value.goToAndStop(frame, true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for render
      captureFrame();
    }
  } else if (count === -1) {
    // Capture at intervals throughout the animation
    const frameCount = Math.floor(totalFrames.value / interval);

    for (let i = 0; i < frameCount; i++) {
      animation.value.goToAndStop(i * interval, true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for render
      captureFrame();
    }
  } else {
    // Capture specific number of frames
    for (let i = 0; i < count; i++) {
      animation.value.goToAndStop(i * interval, true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for render
      captureFrame();
    }
  }

  if (wasPlaying) {
    animation.value.play();
    isPlaying.value = true;
  }
}

watch(
  () => props.animationData,
  () => {
    initializeLottie();
  },
);

onMounted(() => {
  initializeLottie();
});

onUnmounted(() => {
  if (animation.value) {
    animation.value.destroy();
    animation.value = null;
  }
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
