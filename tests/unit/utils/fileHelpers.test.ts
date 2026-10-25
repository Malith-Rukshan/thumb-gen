import { describe, it, expect } from 'vitest'
import { formatFileSize, formatDuration, stripExtension } from '@/utils/fileHelpers'

describe('fileHelpers', () => {
  describe('formatFileSize', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(500)).toBe('500 B')
      expect(formatFileSize(1023)).toBe('1023 B')
    })

    it('formats kilobytes correctly', () => {
      expect(formatFileSize(1024)).toBe('1.0 KB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(1048575)).toBe('1024.0 KB')
    })

    it('formats megabytes correctly', () => {
      expect(formatFileSize(1048576)).toBe('1.0 MB')
      expect(formatFileSize(1572864)).toBe('1.5 MB')
      expect(formatFileSize(1073741823)).toBe('1024.0 MB')
    })

    it('formats gigabytes correctly', () => {
      expect(formatFileSize(1073741824)).toBe('1.0 GB')
      expect(formatFileSize(1610612736)).toBe('1.5 GB')
    })

    it('handles zero size', () => {
      expect(formatFileSize(0)).toBe('0 B')
    })

    it('handles negative sizes', () => {
      expect(formatFileSize(-1)).toBe('0 B')
    })
  })

  describe('formatDuration', () => {
    it('formats seconds correctly', () => {
      expect(formatDuration(30)).toBe('0:30')
      expect(formatDuration(59)).toBe('0:59')
    })

    it('formats minutes and seconds correctly', () => {
      expect(formatDuration(60)).toBe('1:00')
      expect(formatDuration(90)).toBe('1:30')
      expect(formatDuration(125)).toBe('2:05')
    })

    it('formats hours, minutes and seconds correctly', () => {
      expect(formatDuration(3600)).toBe('1:00:00')
      expect(formatDuration(3661)).toBe('1:01:01')
      expect(formatDuration(7325)).toBe('2:02:05')
    })

    it('handles zero duration', () => {
      expect(formatDuration(0)).toBe('0:00')
    })

    it('handles negative duration', () => {
      expect(formatDuration(-1)).toBe('0:00')
    })

    it('rounds decimal seconds', () => {
      expect(formatDuration(30.7)).toBe('0:31')
      expect(formatDuration(30.3)).toBe('0:30')
    })
  })

  describe('stripExtension', () => {
    it('removes only the last extension', () => {
      expect(stripExtension('photo.png')).toBe('photo')
      expect(stripExtension('my.photo.final.jpg')).toBe('my.photo.final')
    })

    it('keeps names without an extension and dotfiles intact', () => {
      expect(stripExtension('README')).toBe('README')
      expect(stripExtension('.env')).toBe('.env')
    })
  })
})
