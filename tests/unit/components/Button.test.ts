import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/ui/Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary variant by default', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Button' }
    })
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('defaults to type="button" so it never submits forms by accident', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Button' }
    })
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies secondary variant when specified', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Button' }
    })
    expect(wrapper.classes()).toContain('btn-secondary')
  })

  it('applies ghost variant when specified', () => {
    const wrapper = mount(Button, {
      props: { variant: 'ghost' },
      slots: { default: 'Button' }
    })
    expect(wrapper.classes()).toContain('btn-ghost')
  })

  it('applies danger variant when specified', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger' },
      slots: { default: 'Button' }
    })
    expect(wrapper.classes()).toContain('btn-danger')
  })

  it('applies correct size classes', () => {
    const smWrapper = mount(Button, {
      props: { size: 'sm' },
      slots: { default: 'Button' }
    })
    expect(smWrapper.classes()).toContain('btn-sm')

    const lgWrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'Button' }
    })
    expect(lgWrapper.classes()).toContain('btn-lg')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Button' }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Button' }
    })
    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Button' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Button' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})