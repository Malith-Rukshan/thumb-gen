<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-4">
      <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Text Thumbnail Generator</h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Design stunning text-based thumbnails with custom fonts, colors, and
        backgrounds. Perfect for social media posts, blog headers, and marketing
        materials.
      </p>

      <!-- Use Cases -->
      <div class="rounded-2xl p-5 space-y-2 bg-linear-to-br from-blue-50 to-indigo-50/70 ring-1 ring-blue-100">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          Perfect for:
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>YouTube video thumbnails with eye-catching text</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Instagram posts and story graphics</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Blog post headers and featured images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Quote cards and motivational posters</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Event announcements and banners</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Product promotion graphics</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Controls -->
      <div class="space-y-6">
        <!-- Canvas Settings -->
        <div class="card p-6">
          <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings2Icon class="w-5 h-5" />
            Canvas Settings
          </h3>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Width (px)</label
              >
              <input
                v-model.number="canvasWidth"
                type="number"
                min="100"
                max="2000"
                class="input"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Height (px)</label
              >
              <input
                v-model.number="canvasHeight"
                type="number"
                min="100"
                max="2000"
                class="input"
              />
            </div>
          </div>

          <!-- Preset Sizes -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="preset in presetSizes"
              :key="preset.name"
              @click="applyPresetSize(preset)"
              class="btn btn-secondary btn-sm"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>

        <!-- Background Settings -->
        <div class="card p-6">
          <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PaletteIcon class="w-5 h-5" />
            Background
          </h3>

          <div class="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
            <button
              v-for="type in ['solid', 'gradient', 'image']"
              :key="type"
              @click="backgroundType = type as any"
              :class="[
                'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                backgroundType === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900',
              ]"
            >
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </button>
          </div>

          <!-- Solid Color -->
          <div v-if="backgroundType === 'solid'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Background Color</label
              >
              <div class="flex gap-2">
                <input
                  v-model="backgroundColor"
                  type="color"
                  class="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  v-model="backgroundColor"
                  type="text"
                  class="input flex-1 min-w-0"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <!-- Gradient -->
          <div v-if="backgroundType === 'gradient'" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Start Color</label
                >
                <div class="flex gap-2">
                  <input
                    v-model="gradientStart"
                    type="color"
                    class="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    v-model="gradientStart"
                    type="text"
                    class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >End Color</label
                >
                <div class="flex gap-2">
                  <input
                    v-model="gradientEnd"
                    type="color"
                    class="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    v-model="gradientEnd"
                    type="text"
                    class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Direction</label
              >
              <select
                v-model="gradientDirection"
                class="input"
              >
                <option value="to-bottom">Top to Bottom</option>
                <option value="to-right">Left to Right</option>
                <option value="to-bottom-right">Diagonal</option>
                <option value="radial">Radial</option>
              </select>
            </div>
          </div>

          <!-- Image Background -->
          <div v-if="backgroundType === 'image'" class="space-y-4">
            <DropZone
              accept="image/*"
              :icon="ImageIcon"
              title="Drop background image"
              subtitle="or click to browse"
              :formats="['PNG', 'JPG', 'WebP']"
              @files="handleBackgroundImage"
            />
            <div v-if="backgroundImage">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Blur Effect</label
              >
              <input
                v-model.number="backgroundBlur"
                type="range"
                min="0"
                max="20"
                class="w-full"
              />
              <span class="text-sm text-gray-500">{{ backgroundBlur }}px</span>
            </div>
          </div>
        </div>

        <!-- Text Settings -->
        <div class="card p-6">
          <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TypeIcon class="w-5 h-5" />
            Text Settings
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Text Content</label
              >
              <textarea
                v-model="textContent"
                rows="3"
                class="input"
                placeholder="Enter your text here..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Font Family</label
              >
              <select
                v-model="fontFamily"
                class="input"
              >
                <option
                  v-for="font in availableFonts"
                  :key="font.value"
                  :value="font.value"
                >
                  {{ font.name }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Font Size (px)</label
                >
                <input
                  v-model.number="fontSize"
                  type="number"
                  min="10"
                  max="200"
                  class="input"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Line Height</label
                >
                <input
                  v-model.number="lineHeight"
                  type="number"
                  min="0.5"
                  max="3"
                  step="0.1"
                  class="input"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Text Color</label
                >
                <div class="flex gap-2">
                  <input
                    v-model="textColor"
                    type="color"
                    class="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    v-model="textColor"
                    type="text"
                    class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Font Weight</label
                >
                <select
                  v-model="fontWeight"
                  class="input"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="bolder">Bolder</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Text Alignment</label
              >
              <div class="flex gap-2">
                <button
                  v-for="align in textAlignOptions"
                  :key="align"
                  @click="textAlign = align"
                  :class="[
                    'flex-1 py-2 rounded-lg transition-colors',
                    textAlign === align
                      ? 'chip chip-active'
                      : 'chip',
                  ]"
                >
                  {{ align.charAt(0).toUpperCase() + align.slice(1) }}
                </button>
              </div>
            </div>

            <!-- Text Effects -->
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Text Effects</h4>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input
                    v-model="enableShadow"
                    type="checkbox"
                    class="size-4 rounded border-gray-300"
                  />
                  <span class="text-sm text-gray-700">Text Shadow</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    v-model="enableStroke"
                    type="checkbox"
                    class="size-4 rounded border-gray-300"
                  />
                  <span class="text-sm text-gray-700">Text Stroke</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="space-y-6">
        <div class="card p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Preview</h3>

          <div class="relative bg-checkerboard rounded-lg overflow-hidden">
            <canvas
              ref="canvasRef"
              :width="canvasWidth"
              :height="canvasHeight"
              class="w-full h-auto"
            ></canvas>
          </div>

          <!-- Export Options -->
          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Export Format</label
              >
              <select
                v-model="exportFormat"
                class="input"
              >
                <option value="png">PNG (Transparent)</option>
                <option value="jpg">JPG (No transparency)</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <div v-if="exportFormat !== 'png'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Quality: {{ exportQuality }}%
              </label>
              <input
                v-model.number="exportQuality"
                type="range"
                min="10"
                max="100"
                step="5"
                class="w-full"
              />
            </div>

            <Button
              @click="downloadImage"
              variant="primary"
              class="w-full"
              :disabled="!textContent.trim()"
            >
              <DownloadIcon class="w-4 h-4 mr-2" />
              Download Thumbnail
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import {
  TypeIcon,
  Settings2Icon,
  PaletteIcon,
  ImageIcon,
  DownloadIcon,
} from "@lucide/vue";
import DropZone from "@/components/common/DropZone.vue";
import Button from "@/components/ui/Button.vue";

// Canvas settings
const canvasRef = ref<HTMLCanvasElement>();
const canvasWidth = ref(1200);
const canvasHeight = ref(630);

// Background settings
const backgroundType = ref<"solid" | "gradient" | "image">("solid");
const backgroundColor = ref("#1e40af");
const gradientStart = ref("#1e40af");
const gradientEnd = ref("#7c3aed");
const gradientDirection = ref("to-bottom");
const backgroundImage = ref<string | null>(null);
const backgroundBlur = ref(0);

// Text settings
const textContent = ref("Your Text Here");
const fontFamily = ref("Inter");
const fontSize = ref(72);
const lineHeight = ref(1.2);
const textColor = ref("#ffffff");
const fontWeight = ref("bold");
type TextAlign = "left" | "center" | "right";
const textAlignOptions: TextAlign[] = ["left", "center", "right"];
const textAlign = ref<TextAlign>("center");
const enableShadow = ref(true);
const enableStroke = ref(false);

// Export settings
const exportFormat = ref<"png" | "jpg" | "webp">("png");
const exportQuality = ref(90);
const errorMessage = ref("");

// Preset sizes
const presetSizes = [
  { name: "YouTube", width: 1280, height: 720 },
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Twitter", width: 1200, height: 675 },
  { name: "Facebook", width: 1200, height: 630 },
  { name: "LinkedIn", width: 1200, height: 627 },
];

// Available fonts
const availableFonts = [
  { name: "Inter", value: "Inter" },
  { name: "Arial", value: "Arial" },
  { name: "Helvetica", value: "Helvetica" },
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Georgia", value: "Georgia" },
  { name: "Verdana", value: "Verdana" },
  { name: "Courier New", value: "Courier New" },
  { name: "Impact", value: "Impact" },
  { name: "Comic Sans MS", value: "Comic Sans MS" },
];

const applyPresetSize = (preset: { width: number; height: number }) => {
  canvasWidth.value = preset.width;
  canvasHeight.value = preset.height;
  drawCanvas();
};

const handleBackgroundImage = (files: File[]) => {
  const file = files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.value = e.target?.result as string;
      drawCanvas();
    };
    reader.readAsDataURL(file);
  }
};

const drawCanvas = async () => {
  await nextTick();

  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  if (backgroundType.value === "solid") {
    ctx.fillStyle = backgroundColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (backgroundType.value === "gradient") {
    let gradient;
    if (gradientDirection.value === "radial") {
      gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      );
    } else {
      const coords = {
        "to-bottom": [0, 0, 0, canvas.height],
        "to-right": [0, 0, canvas.width, 0],
        "to-bottom-right": [0, 0, canvas.width, canvas.height],
      };
      const [x1, y1, x2, y2] =
        coords[gradientDirection.value as keyof typeof coords];
      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    }
    gradient.addColorStop(0, gradientStart.value);
    gradient.addColorStop(1, gradientEnd.value);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (backgroundType.value === "image" && backgroundImage.value) {
    const img = new Image();
    img.onload = () => {
      // Save context state
      ctx.save();

      // Apply blur if needed
      if (backgroundBlur.value > 0) {
        ctx.filter = `blur(${backgroundBlur.value}px)`;
      }

      // Calculate scaling to cover canvas
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height,
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Restore context state
      ctx.restore();

      // Draw text after image loads
      drawText(ctx);
    };
    img.src = backgroundImage.value;
    return; // Exit early, text will be drawn after image loads
  }

  // Draw text
  drawText(ctx);
};

const drawText = (ctx: CanvasRenderingContext2D) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Set font
  ctx.font = `${fontWeight.value} ${fontSize.value}px ${fontFamily.value}`;
  ctx.fillStyle = textColor.value;
  ctx.textAlign = textAlign.value;
  ctx.textBaseline = "middle";

  // Text effects
  if (enableShadow.value) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
  }

  if (enableStroke.value) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
  }

  // Calculate text position
  const lines = textContent.value.split("\n");
  const lineHeightPx = fontSize.value * lineHeight.value;
  const totalHeight = lines.length * lineHeightPx;
  const startY = (canvas.height - totalHeight) / 2 + lineHeightPx / 2;

  let x = canvas.width / 2;
  if (textAlign.value === "left") x = 50;
  if (textAlign.value === "right") x = canvas.width - 50;

  // Draw each line
  lines.forEach((line, index) => {
    const y = startY + index * lineHeightPx;

    if (enableStroke.value) {
      ctx.strokeText(line, x, y);
    }
    ctx.fillText(line, x, y);
  });
};

const downloadImage = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        errorMessage.value = "Failed to generate image";
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `text-thumbnail.${exportFormat.value}`;
      a.click();
      URL.revokeObjectURL(url);
    },
    `image/${exportFormat.value}`,
    exportQuality.value / 100,
  );
};

// Watch for changes and redraw
watch(
  [
    canvasWidth,
    canvasHeight,
    backgroundType,
    backgroundColor,
    gradientStart,
    gradientEnd,
    gradientDirection,
    backgroundBlur,
    textContent,
    fontFamily,
    fontSize,
    lineHeight,
    textColor,
    fontWeight,
    textAlign,
    enableShadow,
    enableStroke,
  ],
  () => {
    drawCanvas();
  },
);

onMounted(() => {
  drawCanvas();
});
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
</style>
