// Chord diagram theming aligned with printable chart colors
// Provides a primary accent and a soft background for UI blocks

export type DiagramTheme = {
  primary: string;
  background: string;
};

// Base palette from printable charts
const MAJOR_COLORS: Record<string, string> = {
  'C': '#cc39bc',
  'G': '#714faa',
  'D': '#3b8bf9',
  'A': '#02c7f9',
  'E': '#00e3e2',
  'B': '#00d48e',
  'F#': '#37b838',
  'Gb': '#37b838',
  'Db': '#79c505',
  'C#': '#79c505',
  'Ab': '#fdd500',
  'G#': '#fdd500',
  'Eb': '#ff6813',
  'D#': '#ff6813',
  'Bb': '#ff4b2c',
  'A#': '#ff4b2c',
  'F': '#ff2a44',
};

const MINOR_COLORS: Record<string, string> = {
  'A': '#ab369e',
  'E': '#624890',
  'B': '#3777cf',
  'F#': '#08a6cf',
  'Gb': '#08a6cf',
  'C#': '#06bebe',
  'Db': '#06bebe',
  // Fm, Cm, Gm, Dm can derive from related majors if needed
};

function softBg(hex: string, alpha = 0.12): string {
  // Convert hex to rgba soft background (fallback to light tint)
  const m = hex.replace('#', '');
  const r = parseInt(m.substring(0, 2), 16) || 0;
  const g = parseInt(m.substring(2, 4), 16) || 0;
  const b = parseInt(m.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function normalizeChord(chordName: string) {
  const name = (chordName || '').trim();
  // Extract root (with optional accidental) and detect minor
  const match = name.match(/^([A-G](?:#|b)?)(.*)$/i);
  const root = match ? match[1].toUpperCase().replace('B', 'B').replace('H', 'B') : 'C';
  const rest = match ? match[2].toLowerCase() : '';
  const isMinor = /(^|[^a-z])m(?!aj)/.test(rest) || /minor/.test(rest);
  return { root, isMinor };
}

export function getChordTheme(chordName: string): DiagramTheme {
  const { root, isMinor } = normalizeChord(chordName);
  const primary = isMinor
    ? (MINOR_COLORS[root] || MAJOR_COLORS[root] || '#3b8bf9')
    : (MAJOR_COLORS[root] || MINOR_COLORS[root] || '#3b8bf9');
  return {
    primary,
    background: softBg(primary),
  };
}

export function getPrimaryColor(chordName: string): string {
  return getChordTheme(chordName).primary;
}
