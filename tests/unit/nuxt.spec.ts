import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, computed } from 'vue'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

describe('Nuxt Configuration File', () => {
  it('should have nuxt.config.ts file', () => {
    const configPath = join(process.cwd(), 'nuxt.config.ts')
    expect(existsSync(configPath)).toBe(true)
  })

  it('should have devtools enabled in config', () => {
    const configPath = join(process.cwd(), 'nuxt.config.ts')
    const content = readFileSync(configPath, 'utf-8')
    expect(content).toContain('devtools')
    expect(content).toContain('enabled: true')
  })

  it('should have prerender route rule for index', () => {
    const configPath = join(process.cwd(), 'nuxt.config.ts')
    const content = readFileSync(configPath, 'utf-8')
    expect(content).toContain("'/': { prerender: true }")
  })
})

describe('Vue Component Basics', () => {
  it('should mount a basic Vue component', () => {
    const TestComponent = defineComponent({
      template: '<div data-testid="test">Hello QA</div>',
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.find('[data-testid="test"]').text()).toBe('Hello QA')
  })

  it('should handle reactive state', () => {
    const TestComponent = defineComponent({
      setup() {
        const count = ref(0)
        const doubled = computed(() => count.value * 2)
        return { count, doubled }
      },
      template: '<div>{{ count }} - {{ doubled }}</div>',
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.text()).toBe('0 - 0')
  })
})

describe('Quality Assurance Setup', () => {
  it('should have vitest config file', () => {
    const configPath = join(process.cwd(), 'vitest.config.ts')
    expect(existsSync(configPath)).toBe(true)
  })

  it('should have tests directory', () => {
    const testsPath = join(process.cwd(), 'tests')
    expect(existsSync(testsPath)).toBe(true)
  })
})
