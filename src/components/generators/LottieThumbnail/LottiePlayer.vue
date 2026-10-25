<template>
  <div class="space-y-4">
    <!-- Lottie Container -->
    <div class="relative bg-gray-100 rounded-lg overflow-hidden">
      <div
        class="mx-auto"
        :style="{ width: animationWidth + 'px', maxWidth: '100%' }"
      >
        <canvas
          ref="lottieCanvas"
          :width="animationWidth"
          :height="animationHeight"
          class="block w-full h-auto"
        />
      </div>

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
              v-for="frame in frames"
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
          type="button"
          aria-label="Previous frame"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>

        <!-- Step backward -->
        <button
          @click="stepBackward"
          class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="Step backward 10 frames"
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
          title="Step forward 10 frames"
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
              playbackSpeed === speed ? 'chip chip-active' : 'chip',
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
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import lottie, {
  type AnimationConfigWithData,
  type AnimationItem,
} from "lottie-web";
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

const props = withDefaults(
  defineProps<{
    animationData: any;
    /** Captured frames owned by the parent, used for timeline markers */
    frames?: LottieFrame[];
  }>(),
  { frames: () => [] },
);

const emit = defineEmits<{
  loaded: [frames: number, duration: number];
  frameCaptured: [frame: LottieFrame];
  error: [error: string];
}>();

const lottieCanvas = ref<HTMLCanvasElement>();
const animation = ref<AnimationItem | null>(null);
const isLoading = ref(true);
const isPlaying = ref(false);
const totalFrames = ref(0);
const currentFrame = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const frameRate = ref(30);
const playbackSpeed = ref(1);
const isCapturing = ref(false);
const animationWidth = ref(512);
const animationHeight = ref(512);

const playbackSpeeds = [0.25, 0.5, 1, 1.5, 2];

const quickCaptureOptions = [
  { label: "Every 10 frames", count: -1, interval: 10 },
  { label: "Every 30 frames", count: -1, interval: 30 },
  { label: "First 5 frames", count: 5, interval: 1 },
  { label: "Start, Middle, End", count: 3, interval: -1 },
];

async function initializeLottie() {
  if (!lottieCanvas.value || !props.animationData) return;

  try {
    // Clean up previous animation
    if (animation.value) {
      animation.value.destroy();
    }
    isPlaying.value = false;

    // Render into our own canvas at the animation's native size, so captures
    // are full resolution regardless of screen size / devicePixelRatio
    animationWidth.value = props.animationData.w || 512;
    animationHeight.value = props.animationData.h || 512;
    await nextTick();

    const context = lottieCanvas.value.getContext("2d");
    if (!context) throw new Error("Canvas 2D context unavailable");

    // lottie-web's types demand `container`, but passing one makes it create
    // (and auto-size) its own canvas; the canvas renderer accepts a bare context
    const config = {
      renderer: "canvas",
      loop: true,
      autoplay: false,
      animationData: props.animationData,
      rendererSettings: {
        context,
        clearCanvas: true,
        dpr: 1,
        preserveAspectRatio: "xMidYMid meet",
      },
    } as Omit<AnimationConfigWithData<"canvas">, "container">;
    animation.value = lottie.loadAnimation(
      config as AnimationConfigWithData<"canvas">,
    );

    animation.value.addEventListener("DOMLoaded", () => {
      if (!animation.value) return;

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

// goToAndStop pauses playback, so keep the play button in sync
function goToFrame(frame: number) {
  if (!animation.value) return;
  animation.value.goToAndStop(frame, true);
  isPlaying.value = false;
}

function handleSeek() {
  goToFrame(currentFrame.value);
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
  goToFrame(Math.min(currentFrame.value + 10, totalFrames.value - 1));
}

function stepBackward() {
  goToFrame(Math.max(currentFrame.value - 10, 0));
}

function nextFrame() {
  goToFrame(Math.min(currentFrame.value + 1, totalFrames.value - 1));
}

function previousFrame() {
  goToFrame(Math.max(currentFrame.value - 1, 0));
}

function captureFrame() {
  const canvas = lottieCanvas.value;
  if (!animation.value || !canvas) return;

  const thumbnail = canvas.toDataURL("image/png");

  const frame: LottieFrame = {
    id: `frame-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    frame: Math.floor(currentFrame.value),
    timestamp: currentTime.value,
    thumbnail,
  };

  emit("frameCaptured", frame);
}

async function quickCapture(count: number, interval: number) {
  if (!animation.value || isCapturing.value) return;

  const wasPlaying = isPlaying.value;
  const lastFrame = Math.max(0, totalFrames.value - 1);

  let frames: number[];
  if (interval === -1 && count === 3) {
    // Special case: Start, Middle, End
    frames = [0, Math.floor(totalFrames.value / 2), lastFrame];
  } else if (count === -1) {
    // Capture at intervals throughout the animation (0, n, 2n, ... up to the end)
    const frameCount = Math.ceil(totalFrames.value / interval);
    frames = Array.from({ length: frameCount }, (_, i) => i * interval);
  } else {
    // Capture specific number of frames
    frames = Array.from({ length: count }, (_, i) => i * interval);
  }
  frames = [...new Set(frames.map((f) => Math.min(f, lastFrame)))];

  isCapturing.value = true;
  try {
    for (const frame of frames) {
      goToFrame(frame);
      // goToAndStop renders synchronously; yield so the UI stays responsive
      await new Promise((resolve) => requestAnimationFrame(resolve));
      captureFrame();
    }
  } finally {
    isCapturing.value = false;
    if (wasPlaying && animation.value) {
      animation.value.play();
      isPlaying.value = true;
    }
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
