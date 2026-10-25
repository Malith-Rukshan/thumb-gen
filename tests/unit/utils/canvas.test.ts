import { describe, it, expect } from 'vitest'
import { createCanvas, resizeCanvas, drawImageToCanvas, formatToMime } from '@/utils/canvas'

describe('canvas utilities', () => {
  describe('createCanvas', () => {
    it('creates a canvas with specified dimensions', () => {
      const { canvas } = createCanvas(800, 600)
      expect(canvas.width).toBe(800)
      expect(canvas.height).toBe(600)
    })

    it('returns both canvas and context', () => {
      const { canvas, ctx } = createCanvas(100, 100)
      expect(canvas).toBeTruthy()
      expect(canvas.width).toBe(100)
      expect(canvas.height).toBe(100)
      expect(ctx).toBeTruthy()
    })
  })

  describe('resizeCanvas', () => {
    it('resizes canvas to specified dimensions', () => {
      const { canvas: sourceCanvas } = createCanvas(1000, 800)
      const resizedCanvas = resizeCanvas(sourceCanvas, { width: 500, height: 400 })
      expect(resizedCanvas.width).toBe(500)
      expect(resizedCanvas.height).toBe(400)
    })

    it('handles square dimensions correctly', () => {
      const { canvas: sourceCanvas } = createCanvas(400, 400)
      const resizedCanvas = resizeCanvas(sourceCanvas, { width: 200, height: 200 })
      expect(resizedCanvas.width).toBe(200)
      expect(resizedCanvas.height).toBe(200)
    })

    it('handles very small dimensions', () => {
      const { canvas: sourceCanvas } = createCanvas(1000, 1000)
      const resizedCanvas = resizeCanvas(sourceCanvas, { width: 2, height: 2 })
      expect(resizedCanvas.width).toBe(2)
      expect(resizedCanvas.height).toBe(2)
    })
  })

  describe('drawImageToCanvas', () => {
    it('draws image to canvas context', () => {
      const { ctx } = createCanvas(100, 100)
      const mockImage = document.createElement('img')
      mockImage.width = 50
      mockImage.height = 50
      
      // This should not throw
      expect(() => drawImageToCanvas(ctx, mockImage)).not.toThrow()
    })
  })

  describe('formatToMime', () => {
    it('maps jpg to the real image/jpeg MIME type', () => {
      expect(formatToMime('jpg')).toBe('image/jpeg')
    })

    it('passes png and webp through', () => {
      expect(formatToMime('png')).toBe('image/png')
      expect(formatToMime('webp')).toBe('image/webp')
    })
  })
})
