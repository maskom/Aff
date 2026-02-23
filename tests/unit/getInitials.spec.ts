import { describe, expect, it } from 'vitest'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

describe('getInitials', () => {
  it('returns initials from word parts', () => {
    expect(getInitials('EcoGlow')).toBe('E')
    expect(getInitials('FitFuel Pro')).toBe('FP')
    expect(getInitials('One Two Three')).toBe('OT')
  })

  it('handles single word names', () => {
    expect(getInitials('Brand')).toBe('B')
    expect(getInitials('A')).toBe('A')
  })

  it('handles empty string', () => {
    expect(getInitials('')).toBe('')
  })

  it('handles names with multiple spaces', () => {
    expect(getInitials('Test  Name')).toBe('TN')
  })

  it('returns uppercase initials', () => {
    expect(getInitials('lowercase name')).toBe('LN')
  })
})
