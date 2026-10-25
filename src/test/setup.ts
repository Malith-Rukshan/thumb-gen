import { beforeAll, vi } from "vitest";

// Mock canvas and related APIs
beforeAll(() => {
  // Mock HTMLCanvasElement
  // @ts-ignore - Complex canvas context mocking
  global.HTMLCanvasElement.prototype.getContext = vi.fn(function (
    this: HTMLCanvasElement,
  ) {
    return {
      canvas: this,
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Array(4) })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => ({ data: new Array(4) })),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
      filter: "none",
    };
  });

  global.HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
    callback(new Blob(["test"], { type: "image/png" }));
  });

  global.HTMLCanvasElement.prototype.toDataURL = vi.fn(
    () => "data:image/jpeg;base64,test",
  );

  // Mock URL.createObjectURL
  global.URL.createObjectURL = vi.fn(() => "mock-url");
  global.URL.revokeObjectURL = vi.fn();

  // Mock FileReader
  global.FileReader = vi.fn(function () {
    const reader = {
      onload: null as any,
      onerror: null as any,
      readAsDataURL: vi.fn(function () {
        setTimeout(() => {
          if (reader.onload) {
            reader.onload({ target: { result: "data:image/png;base64,test" } });
          }
        }, 0);
      }),
      addEventListener: vi.fn(),
      result: "mock-result",
    };
    return reader;
  }) as any;

  // Mock Image
  global.Image = vi.fn(function () {
    const img = {
      onload: null as any,
      onerror: null as any,
      src: "",
      width: 100,
      height: 100,
      naturalWidth: 100,
      naturalHeight: 100,
      crossOrigin: null,
      addEventListener: vi.fn(),
    };
    // Trigger onload when src is set
    Object.defineProperty(img, "src", {
      set(_value) {
        setTimeout(() => {
          if (img.onload) img.onload();
        }, 0);
      },
      get() {
        return "";
      },
    });
    return img;
  }) as any;

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  // Mock fetch
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      blob: () => Promise.resolve(new Blob()),
    }),
  ) as any;

  // Mock console methods to reduce noise in tests
  console.warn = vi.fn();
  console.error = vi.fn();
});
