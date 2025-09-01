export interface FretPosition {
  string: number;
  fret: number;
  finger: number;
  isRoot?: boolean;
}

export interface ChordDefinition {
  pianoNotes: string[];
  guitarPositions: FretPosition[];
  level?: number;
}

export const chords: Record<string, ChordDefinition> = {
  C: {
    pianoNotes: ['C4', 'E4', 'G4'],
    guitarPositions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 3 },
    ],
    level: 1,
  },
  G: {
    pianoNotes: ['G3', 'B3', 'D4'],
    guitarPositions: [
      { string: 1, fret: 3, finger: 3 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 4 },
    ],
    level: 1,
  },
  D: {
    pianoNotes: ['D4', 'F#4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 1 },
    ],
    level: 1,
  },
  A: {
    pianoNotes: ['A3', 'C#4', 'E4'],
    guitarPositions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 3 },
    ],
    level: 1,
  },
  E: {
    pianoNotes: ['E3', 'G#3', 'B3'],
    guitarPositions: [
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
      { string: 3, fret: 1, finger: 1 },
    ],
    level: 1,
  },
  F: {
    pianoNotes: ['F3', 'A3', 'C4'],
    guitarPositions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 3, finger: 3 },
    ],
    level: 1,
  },
  Bb: {
    pianoNotes: ['Bb3', 'D4', 'F4'],
    guitarPositions: [
      { string: 5, fret: 1, finger: 1 },
      { string: 4, fret: 3, finger: 3 },
      { string: 3, fret: 3, finger: 4 },
      { string: 2, fret: 3, finger: 4 },
      { string: 1, fret: 1, finger: 1 },
    ],
    level: 1,
  },
  Eb: {
    pianoNotes: ['Eb4', 'G4', 'Bb4'],
    guitarPositions: [
      { string: 5, fret: 6, finger: 1 },
      { string: 4, fret: 8, finger: 3 },
      { string: 3, fret: 8, finger: 4 },
      { string: 2, fret: 8, finger: 4 },
      { string: 1, fret: 6, finger: 1 },
    ],
    level: 1,
  },
  Ab: {
    pianoNotes: ['Ab3', 'C4', 'Eb4'],
    guitarPositions: [
      { string: 6, fret: 4, finger: 1 },
      { string: 5, fret: 6, finger: 3 },
      { string: 4, fret: 6, finger: 4 },
      { string: 3, fret: 5, finger: 2 },
      { string: 2, fret: 4, finger: 1 },
      { string: 1, fret: 4, finger: 1 },
    ],
    level: 1,
  },
  Db: {
    pianoNotes: ['Db4', 'F4', 'Ab4'],
    guitarPositions: [
      { string: 5, fret: 4, finger: 1 },
      { string: 4, fret: 6, finger: 3 },
      { string: 3, fret: 6, finger: 4 },
      { string: 2, fret: 6, finger: 4 },
      { string: 1, fret: 4, finger: 1 },
    ],
    level: 1,
  },
  'F#': {
    pianoNotes: ['F#3', 'A#3', 'C#4'],
    guitarPositions: [
      { string: 6, fret: 2, finger: 1 },
      { string: 5, fret: 4, finger: 3 },
      { string: 4, fret: 4, finger: 4 },
      { string: 3, fret: 3, finger: 2 },
      { string: 2, fret: 2, finger: 1 },
      { string: 1, fret: 2, finger: 1 },
    ],
    level: 1,
  },
  B: {
    pianoNotes: ['B3', 'D#4', 'F#4'],
    guitarPositions: [
      { string: 5, fret: 2, finger: 1 },
      { string: 4, fret: 4, finger: 3 },
      { string: 3, fret: 4, finger: 4 },
      { string: 2, fret: 4, finger: 4 },
      { string: 1, fret: 2, finger: 1 },
    ],
    level: 1,
  },
  Am: {
    pianoNotes: ['A3', 'C4', 'E4'],
    guitarPositions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    level: 1,
  },
  Em: {
    pianoNotes: ['E3', 'G3', 'B3'],
    guitarPositions: [
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
    ],
    level: 1,
  },
  Dm: {
    pianoNotes: ['D4', 'F4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 2 },
    ],
    level: 1,
  },
  Bm: {
    pianoNotes: ['B3', 'D4', 'F#4'],
    guitarPositions: [
      { string: 5, fret: 2, finger: 1 },
      { string: 4, fret: 4, finger: 3 },
      { string: 3, fret: 4, finger: 4 },
      { string: 2, fret: 3, finger: 2 },
      { string: 1, fret: 2, finger: 1 },
    ],
    level: 1,
  },
  'F#m': {
    pianoNotes: ['F#3', 'A3', 'C#4'],
    guitarPositions: [
      { string: 6, fret: 2, finger: 1 },
      { string: 5, fret: 4, finger: 3 },
      { string: 4, fret: 4, finger: 4 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 1 },
      { string: 1, fret: 2, finger: 1 },
    ],
    level: 1,
  },
  'C#m': {
    pianoNotes: ['C#4', 'E4', 'G#4'],
    guitarPositions: [
      { string: 5, fret: 4, finger: 1 },
      { string: 4, fret: 6, finger: 3 },
      { string: 3, fret: 6, finger: 4 },
      { string: 2, fret: 5, finger: 2 },
      { string: 1, fret: 4, finger: 1 },
    ],
    level: 1,
  },
  'G#m': {
    pianoNotes: ['G#3', 'B3', 'D#4'],
    guitarPositions: [
      { string: 6, fret: 4, finger: 1 },
      { string: 5, fret: 6, finger: 3 },
      { string: 4, fret: 6, finger: 4 },
      { string: 3, fret: 4, finger: 2 },
      { string: 2, fret: 4, finger: 1 },
      { string: 1, fret: 4, finger: 1 },
    ],
    level: 1,
  },
  'D#m': {
    pianoNotes: ['D#4', 'F#4', 'A#4'],
    guitarPositions: [
      { string: 5, fret: 6, finger: 1 },
      { string: 4, fret: 8, finger: 3 },
      { string: 3, fret: 8, finger: 4 },
      { string: 2, fret: 7, finger: 2 },
      { string: 1, fret: 6, finger: 1 },
    ],
    level: 1,
  },
  Bbm: {
    pianoNotes: ['Bb3', 'Db4', 'F4'],
    guitarPositions: [
      { string: 5, fret: 1, finger: 1 },
      { string: 4, fret: 3, finger: 3 },
      { string: 3, fret: 3, finger: 4 },
      { string: 2, fret: 2, finger: 2 },
      { string: 1, fret: 1, finger: 1 },
    ],
    level: 1,
  },
  Fm: {
    pianoNotes: ['F3', 'Ab3', 'C4'],
    guitarPositions: [
      { string: 6, fret: 1, finger: 1 },
      { string: 5, fret: 3, finger: 3 },
      { string: 4, fret: 3, finger: 4 },
      { string: 3, fret: 1, finger: 1 },
      { string: 2, fret: 1, finger: 1 },
      { string: 1, fret: 1, finger: 1 },
    ],
    level: 1,
  },
  Cm: {
    pianoNotes: ['C4', 'Eb4', 'G4'],
    guitarPositions: [
      { string: 5, fret: 3, finger: 1 },
      { string: 4, fret: 5, finger: 3 },
      { string: 3, fret: 5, finger: 4 },
      { string: 2, fret: 4, finger: 2 },
      { string: 1, fret: 3, finger: 1 },
    ],
    level: 1,
  },
  Gm: {
    pianoNotes: ['G3', 'Bb3', 'D4'],
    guitarPositions: [
      { string: 6, fret: 3, finger: 1 },
      { string: 5, fret: 5, finger: 3 },
      { string: 4, fret: 5, finger: 4 },
      { string: 3, fret: 3, finger: 1 },
      { string: 2, fret: 3, finger: 1 },
      { string: 1, fret: 3, finger: 1 },
    ],
    level: 1,
  },
};

export interface Chord extends ChordDefinition {
  name: string;
}

export const chordList: Chord[] = Object.entries(chords).map(
  ([name, data]) => ({
    name,
    ...data,
  })
);

export type ChordName = keyof typeof chords;