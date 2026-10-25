import type { Dimensions, ExportOptions } from "@/types";

export function createCanvas(
  width: number,
  height: number,
): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  // Enable image smoothing for better quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  return { canvas, ctx };
}

/** Browsers only understand "image/jpeg"; "image/jpg" silently falls back to PNG. */
export function formatToMime(format: ExportOptions["format"]): string {
  return format === "jpg" ? "image/jpeg" : `image/${format}`;
}

export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  options: Pick<ExportOptions, "format" | "quality">,
): Promise<Blob> {
  let source = canvas;

  // JPEG has no alpha channel: flatten onto white so transparent areas don't turn black
  if (options.format === "jpg") {
    const { canvas: flat, ctx } = createCanvas(canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, flat.width, flat.height);
    ctx.drawImage(canvas, 0, 0);
    source = flat;
  }

  return new Promise((resolve, reject) => {
    source.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      },
      formatToMime(options.format),
      options.quality / 100,
    );
  });
}

export function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  dimensions?: Dimensions,
): void {
  const { width, height } = dimensions || {
    width: ctx.canvas.width,
    height: ctx.canvas.height,
  };

  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Simple draw without complex calculations for now
  ctx.drawImage(image, 0, 0, width, height);
}

export function resizeCanvas(
  sourceCanvas: HTMLCanvasElement,
  targetDimensions: Dimensions,
): HTMLCanvasElement {
  const { canvas, ctx } = createCanvas(
    targetDimensions.width,
    targetDimensions.height,
  );
  drawImageToCanvas(ctx, sourceCanvas, targetDimensions);
  return canvas;
}

export function applyCanvasFilter(
  ctx: CanvasRenderingContext2D,
  filter: string,
): void {
  ctx.filter = filter;
}

export function resetCanvasFilter(ctx: CanvasRenderingContext2D): void {
  ctx.filter = "none";
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function captureVideoFrame(
  video: HTMLVideoElement,
  dimensions?: Dimensions,
): HTMLCanvasElement {
  const { canvas, ctx } = createCanvas(
    dimensions?.width || video.videoWidth,
    dimensions?.height || video.videoHeight,
  );

  drawImageToCanvas(ctx, video, dimensions);
  return canvas;
}

export function createGradient(
  ctx: CanvasRenderingContext2D,
  type: "linear" | "radial",
  colors: string[],
  positions?: number[],
  angle?: number,
): CanvasGradient {
  let gradient: CanvasGradient;

  if (type === "linear") {
    const angleRad = ((angle || 0) * Math.PI) / 180;
    const x1 =
      ctx.canvas.width / 2 - (Math.cos(angleRad) * ctx.canvas.width) / 2;
    const y1 =
      ctx.canvas.height / 2 - (Math.sin(angleRad) * ctx.canvas.height) / 2;
    const x2 =
      ctx.canvas.width / 2 + (Math.cos(angleRad) * ctx.canvas.width) / 2;
    const y2 =
      ctx.canvas.height / 2 + (Math.sin(angleRad) * ctx.canvas.height) / 2;
    gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  } else {
    gradient = ctx.createRadialGradient(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      0,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      Math.max(ctx.canvas.width, ctx.canvas.height) / 2,
    );
  }

  colors.forEach((color, index) => {
    const position = positions?.[index] ?? index / (colors.length - 1);
    gradient.addColorStop(position, color);
  });

  return gradient;
}

export function createCheckerboardCanvas(
  width: number,
  height: number,
  cellSize: number = 10,
): HTMLCanvasElement {
  const { canvas, ctx } = createCanvas(width, height);

  const rows = Math.ceil(height / cellSize);
  const cols = Math.ceil(width / cellSize);

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#E5E5E5";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ((row + col) % 2 === 0) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  return canvas;
}
