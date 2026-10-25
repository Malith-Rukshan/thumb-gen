<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-4">
      <h2 class="text-3xl font-bold text-gray-900">Watermark Tool</h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Protect your images and add professional branding with custom
        watermarks. Support for text and image watermarks with full control over
        positioning, opacity, and style.
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          Perfect for:
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Photography portfolio protection</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Brand logo placement on product images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Copyright text on artwork and designs</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Social media handle branding</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Batch watermarking for multiple images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Document and certificate authentication</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Controls -->
      <div class="space-y-6">
        <!-- Image Upload -->
        <div v-if="!mainImage">
          <DropZone
            accept="image/*"
            :icon="ImageIcon"
            title="Drop your image here"
            subtitle="or click to browse"
            :formats="['PNG', 'JPG', 'WebP']"
            allow-url
            multiple
            @files="handleMainImages"
            @url="handleImageUrl"
            @error="errorMessage = $event"
          />
        </div>

        <!-- Image Info -->
        <div
          v-else
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Uploaded Images</h3>
            <button
              @click="resetImages"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>

          <div class="space-y-2 max-h-40 overflow-y-auto">
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              @click="currentImageIndex = index"
              :class="[
                'flex items-center gap-3 p-2 rounded cursor-pointer transition-colors',
                currentImageIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50',
              ]"
            >
              <img
                :src="image.url"
                :alt="image.name"
                class="w-10 h-10 object-cover rounded"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ image.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(image.size) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Watermark Settings -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DropletIcon class="w-5 h-5" />
            Watermark Settings
          </h3>

          <!-- Watermark Type -->
          <div class="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
            <button
              v-for="type in ['text', 'image']"
              :key="type"
              @click="watermarkType = type as any"
              :class="[
                'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                watermarkType === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900',
              ]"
            >
              {{ type.charAt(0).toUpperCase() + type.slice(1) }} Watermark
            </button>
          </div>

          <!-- Text Watermark Settings -->
          <div v-if="watermarkType === 'text'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Watermark Text</label
              >
              <input
                v-model="watermarkText"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="© Your Name"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Font Size</label
                >
                <input
                  v-model.number="fontSize"
                  type="number"
                  min="10"
                  max="200"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Font Family</label
                >
                <select
                  v-model="fontFamily"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
            </div>

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
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>

          <!-- Image Watermark Settings -->
          <div v-else-if="watermarkType === 'image'" class="space-y-4">
            <div v-if="!watermarkImage">
              <DropZone
                accept="image/*"
                :icon="ImageIcon"
                title="Drop watermark image"
                subtitle="PNG with transparency recommended"
                :formats="['PNG', 'JPG', 'WebP']"
                @files="handleWatermarkImage"
              />
            </div>
            <div
              v-else
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <img
                :src="watermarkImage.url"
                alt="Watermark"
                class="w-12 h-12 object-contain"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ watermarkImage.name }}
                </p>
                <button
                  @click="watermarkImage = null"
                  class="text-xs text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Watermark Size (%)</label
              >
              <input
                v-model.number="watermarkScale"
                type="range"
                min="5"
                max="50"
                class="w-full"
              />
              <span class="text-sm text-gray-500">{{ watermarkScale }}%</span>
            </div>
          </div>

          <!-- Common Settings -->
          <div class="space-y-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Position</label
              >
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="pos in positions"
                  :key="pos.value"
                  @click="position = pos.value"
                  :class="[
                    'py-2 px-3 text-sm rounded-lg transition-colors',
                    position === pos.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                  ]"
                >
                  {{ pos.label }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Opacity: {{ opacity }}%
              </label>
              <input
                v-model.number="opacity"
                type="range"
                min="10"
                max="100"
                step="5"
                class="w-full"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Rotation: {{ rotation }}°
              </label>
              <input
                v-model.number="rotation"
                type="range"
                min="-45"
                max="45"
                step="5"
                class="w-full"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Margin (px)</label
              >
              <input
                v-model.number="margin"
                type="number"
                min="0"
                max="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4">Preview</h3>

          <div class="relative bg-checkerboard rounded-lg overflow-hidden">
            <canvas ref="canvasRef" class="w-full h-auto"></canvas>
          </div>

          <!-- Export Options -->
          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Export Format</label
              >
              <select
                v-model="exportFormat"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="png">PNG (Best for transparency)</option>
                <option value="jpg">JPG (Smaller file size)</option>
                <option value="webp">WebP (Modern format)</option>
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

            <div class="flex gap-3">
              <Button
                @click="downloadCurrentImage"
                variant="primary"
                class="flex-1"
                :disabled="!mainImage || (!watermarkText && !watermarkImage)"
              >
                <DownloadIcon class="w-4 h-4 mr-2" />
                Download Current
              </Button>

              <Button
                v-if="uploadedImages.length > 1"
                @click="downloadAllImages"
                variant="secondary"
                class="flex-1"
                :disabled="!mainImage || (!watermarkText && !watermarkImage)"
              >
                <DownloadIcon class="w-4 h-4 mr-2" />
                Download All (ZIP)
              </Button>
            </div>
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
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { DropletIcon, ImageIcon, DownloadIcon } from "@lucide/vue";
import DropZone from "@/components/common/DropZone.vue";
import Button from "@/components/ui/Button.vue";
import { formatFileSize } from "@/utils/fileHelpers";

interface UploadedImage {
  name: string;
  size: number;
  url: string;
  file: File;
}

interface WatermarkImage {
  name: string;
  url: string;
  element: HTMLImageElement;
}

// State
const canvasRef = ref<HTMLCanvasElement>();
const uploadedImages = ref<UploadedImage[]>([]);
const currentImageIndex = ref(0);
const mainImage = computed(() => uploadedImages.value[currentImageIndex.value]);

// Watermark settings
const watermarkType = ref<"text" | "image">("text");
const watermarkText = ref("© 2025");
const fontSize = ref(24);
const fontFamily = ref("Arial");
const textColor = ref("#ffffff");
const watermarkImage = ref<WatermarkImage | null>(null);
const watermarkScale = ref(20);

// Position and styling
const position = ref("bottom-right");
const opacity = ref(70);
const rotation = ref(0);
const margin = ref(20);

// Export settings
const exportFormat = ref<"png" | "jpg" | "webp">("png");
const exportQuality = ref(90);
const errorMessage = ref("");

// Position options
const positions = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Center", value: "top-center" },
  { label: "Top Right", value: "top-right" },
  { label: "Center Left", value: "center-left" },
  { label: "Center", value: "center" },
  { label: "Center Right", value: "center-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Bottom Right", value: "bottom-right" },
];

const handleMainImages = (files: File[]) => {
  uploadedImages.value = [];
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push({
        name: file.name,
        size: file.size,
        url: e.target?.result as string,
        file,
      });
      if (uploadedImages.value.length === 1) {
        drawCanvas();
      }
    };
    reader.readAsDataURL(file);
  });
};

const handleImageUrl = (url: string) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], "image-from-url.jpg", { type: blob.type });
      handleMainImages([file]);
    })
    .catch(() => {
      errorMessage.value = "Failed to load image from URL";
    });
};

const handleWatermarkImage = (files: File[]) => {
  const file = files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        watermarkImage.value = {
          name: file.name,
          url: e.target?.result as string,
          element: img,
        };
        drawCanvas();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const resetImages = () => {
  uploadedImages.value = [];
  currentImageIndex.value = 0;
  watermarkImage.value = null;
};

const drawCanvas = async () => {
  await nextTick();

  const canvas = canvasRef.value;
  if (!canvas || !mainImage.value) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Apply watermark
    if (watermarkType.value === "text" && watermarkText.value) {
      drawTextWatermark(ctx, canvas);
    } else if (watermarkType.value === "image" && watermarkImage.value) {
      drawImageWatermark(ctx, canvas);
    }
  };
  img.src = mainImage.value.url;
};

const drawTextWatermark = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  ctx.save();

  // Set text properties
  ctx.font = `${fontSize.value}px ${fontFamily.value}`;
  ctx.fillStyle = textColor.value;
  ctx.globalAlpha = opacity.value / 100;

  // Measure text
  const metrics = ctx.measureText(watermarkText.value);
  const textWidth = metrics.width;
  const textHeight = fontSize.value;

  // Calculate position
  const { x, y } = calculatePosition(
    canvas.width,
    canvas.height,
    textWidth,
    textHeight,
  );

  // Apply rotation
  if (rotation.value !== 0) {
    ctx.translate(x + textWidth / 2, y + textHeight / 2);
    ctx.rotate((rotation.value * Math.PI) / 180);
    ctx.translate(-(x + textWidth / 2), -(y + textHeight / 2));
  }

  // Draw text with shadow for better visibility
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillText(watermarkText.value, x, y + textHeight);

  ctx.restore();
};

const drawImageWatermark = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  if (!watermarkImage.value) return;

  ctx.save();

  // Calculate watermark size
  const scale = watermarkScale.value / 100;
  const watermarkWidth = watermarkImage.value.element.width * scale;
  const watermarkHeight = watermarkImage.value.element.height * scale;

  // Calculate position
  const { x, y } = calculatePosition(
    canvas.width,
    canvas.height,
    watermarkWidth,
    watermarkHeight,
  );

  // Set opacity
  ctx.globalAlpha = opacity.value / 100;

  // Apply rotation
  if (rotation.value !== 0) {
    ctx.translate(x + watermarkWidth / 2, y + watermarkHeight / 2);
    ctx.rotate((rotation.value * Math.PI) / 180);
    ctx.translate(-(x + watermarkWidth / 2), -(y + watermarkHeight / 2));
  }

  // Draw watermark
  ctx.drawImage(
    watermarkImage.value.element,
    x,
    y,
    watermarkWidth,
    watermarkHeight,
  );

  ctx.restore();
};

const calculatePosition = (
  canvasWidth: number,
  canvasHeight: number,
  itemWidth: number,
  itemHeight: number,
) => {
  let x = margin.value;
  let y = margin.value;

  switch (position.value) {
    case "top-left":
      break;
    case "top-center":
      x = (canvasWidth - itemWidth) / 2;
      break;
    case "top-right":
      x = canvasWidth - itemWidth - margin.value;
      break;
    case "center-left":
      y = (canvasHeight - itemHeight) / 2;
      break;
    case "center":
      x = (canvasWidth - itemWidth) / 2;
      y = (canvasHeight - itemHeight) / 2;
      break;
    case "center-right":
      x = canvasWidth - itemWidth - margin.value;
      y = (canvasHeight - itemHeight) / 2;
      break;
    case "bottom-left":
      y = canvasHeight - itemHeight - margin.value;
      break;
    case "bottom-center":
      x = (canvasWidth - itemWidth) / 2;
      y = canvasHeight - itemHeight - margin.value;
      break;
    case "bottom-right":
      x = canvasWidth - itemWidth - margin.value;
      y = canvasHeight - itemHeight - margin.value;
      break;
  }

  return { x, y };
};

const downloadCurrentImage = () => {
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
      a.download = `watermarked-${mainImage.value?.name || "image"}.${exportFormat.value}`;
      a.click();
      URL.revokeObjectURL(url);
    },
    `image/${exportFormat.value}`,
    exportQuality.value / 100,
  );
};

const downloadAllImages = async () => {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (let i = 0; i < uploadedImages.value.length; i++) {
    currentImageIndex.value = i;
    await drawCanvas();
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure canvas is drawn

    const canvas = canvasRef.value;
    if (!canvas) continue;

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        `image/${exportFormat.value}`,
        exportQuality.value / 100,
      );
    });

    if (blob) {
      zip.file(`watermarked-${uploadedImages.value[i].name}`, blob);
    }
  }

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "watermarked-images.zip";
  a.click();
  URL.revokeObjectURL(url);

  currentImageIndex.value = 0;
  drawCanvas();
};

// Watch for changes and redraw
watch(
  [
    currentImageIndex,
    watermarkType,
    watermarkText,
    fontSize,
    fontFamily,
    textColor,
    watermarkScale,
    position,
    opacity,
    rotation,
    margin,
  ],
  () => {
    if (mainImage.value) {
      drawCanvas();
    }
  },
);

onMounted(() => {
  if (mainImage.value) {
    drawCanvas();
  }
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
