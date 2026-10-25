import type { FileUpload } from "@/types";

export const SUPPORTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const SUPPORTED_LOTTIE_TYPES = ["application/json", ".json", ".tgs"];

export function createObjectURL(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url);
}

export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getFileType(file: File): FileUpload["type"] | null {
  if (SUPPORTED_VIDEO_TYPES.includes(file.type)) {
    return "video";
  }
  if (SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return "image";
  }
  if (file.name.endsWith(".tgs")) {
    return "tgs";
  }
  if (file.type === "application/json" || file.name.endsWith(".json")) {
    return "lottie";
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0:00";

  const roundedSeconds = Math.round(seconds);
  const hrs = Math.floor(roundedSeconds / 3600);
  const mins = Math.floor((roundedSeconds % 3600) / 60);
  const secs = roundedSeconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export async function downloadFile(
  blob: Blob,
  filename: string,
): Promise<void> {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoking synchronously can cancel the download in Safari/Firefox
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** "photo.final.png" -> "photo.final" */
export function stripExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot > 0 ? filename.slice(0, dot) : filename;
}

/** Copy an image blob to the system clipboard (PNG is the only widely supported type). */
export async function copyImageToClipboard(blob: Blob): Promise<void> {
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    throw new Error("Clipboard images are not supported in this browser");
  }
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
}

export async function downloadMultipleFiles(
  files: Array<{ blob: Blob; name: string }>,
): Promise<void> {
  if (files.length === 1) {
    return downloadFile(files[0].blob, files[0].name);
  }

  // Use JSZip for multiple files
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  files.forEach(({ blob, name }) => {
    zip.file(name, blob);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadFile(zipBlob, "thumbnails.zip");
}

export function generateFileName(
  baseName: string,
  index: number,
  extension: string,
): string {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${baseName}_${index + 1}_${timestamp}.${extension}`;
}
