import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DropZone from '@/components/common/DropZone.vue'
import { ImageIcon } from '@lucide/vue'

describe('DropZone', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        subtitle: 'or click to browse'
      }
    })
    expect(wrapper.text()).toContain('Drop files here')
    expect(wrapper.text()).toContain('or click to browse')
  })

  it('shows formats when provided', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        formats: ['PNG', 'JPG', 'WebP']
      }
    })
    expect(wrapper.text()).toContain('PNG')
    expect(wrapper.text()).toContain('JPG')
    expect(wrapper.text()).toContain('WebP')
  })

  it('shows URL input when allowUrl is true', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        allowUrl: true
      }
    })
    expect(wrapper.find('input[type="url"]').exists()).toBe(true)
  })

  it('hides URL input when allowUrl is false', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        allowUrl: false
      }
    })
    expect(wrapper.find('input[type="url"]').exists()).toBe(false)
  })

  it('accepts multiple files when multiple is true', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        multiple: true
      }
    })
    expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined()
  })

  it('accepts only single file when multiple is false', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        multiple: false
      }
    })
    expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeUndefined()
  })

  it('applies correct accept attribute', () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        accept: 'image/*'
      }
    })
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('image/*')
  })

  it('emits files event when files are selected', async () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here'
      }
    })

    const fileInput = wrapper.find('input[type="file"]')
    const mockFiles = [new File(['test'], 'test.png', { type: 'image/png' })]
    
    Object.defineProperty(fileInput.element, 'files', {
      value: mockFiles,
      writable: false
    })

    await fileInput.trigger('change')
    expect(wrapper.emitted('files')).toBeTruthy()
  })

  it('emits url event when URL is submitted', async () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here',
        allowUrl: true
      }
    })

    const urlInput = wrapper.find('input[type="url"]')
    expect(urlInput.exists()).toBe(true)
    
    await urlInput.setValue('https://example.com/image.png')
    await urlInput.trigger('keydown.enter')
    
    expect(wrapper.emitted('url')).toBeTruthy()
    expect(wrapper.emitted('url')?.[0]?.[0]).toBe('https://example.com/image.png')
  })

  it('handles drag and drop events', async () => {
    const wrapper = mount(DropZone, {
      props: {
        icon: ImageIcon,
        title: 'Drop files here'
      }
    })

    const dropZone = wrapper.find('[data-dropzone]')
    
    // Check if element exists, if not use the root element
    const targetElement = dropZone.exists() ? dropZone : wrapper
    
    // Test dragenter sets isDragging
    await targetElement.trigger('dragenter')
    expect((wrapper.vm as any).isDragging).toBe(true)

    // Test drop event with files
    const mockFiles = [new File(['test'], 'test.png', { type: 'image/png' })]
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { files: mockFiles }
    }

    await targetElement.trigger('drop', mockEvent)
    expect(wrapper.emitted('files')).toBeTruthy()
    expect(wrapper.emitted('files')?.[0]?.[0]).toEqual(mockFiles)
  })
})