import { describe, it, expect } from 'vitest';
import { getChordTheme } from './diagramTheme';

describe('getChordTheme', () => {
  it('should return the correct theme for a major chord', () => {
    const theme = getChordTheme('C');
    expect(theme.primary).toBe('#cc39bc');
    expect(theme.background).toBe('rgba(204, 57, 188, 0.12)');
  });

  it('should return the correct theme for a minor chord', () => {
    const theme = getChordTheme('Am');
    expect(theme.primary).toBe('#ab369e');
    expect(theme.background).toBe('rgba(171, 54, 158, 0.12)');
  });

  it('should return a default theme for an unknown chord', () => {
    const theme = getChordTheme('Unknown');
    expect(theme.primary).toBe('#3b8bf9');
    expect(theme.background).toBe('rgba(59, 139, 249, 0.12)');
  });
});
