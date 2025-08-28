export interface FretPosition {
  string: number;
  fret: number;
}

export interface ChordDefinition {
  pianoNotes: string[];
  guitarPositions: FretPosition[];
  guitarFingers?: number[];
}

export const chords: Record<string, ChordDefinition> = {
  C: {
    pianoNotes: ['C4', 'E4', 'G4'],
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 4, fret: 2 },
      { string: 5, fret: 3 },
    ],
    guitarFingers: [1, 2, 3],
  },
  G: {
    pianoNotes: ['G3', 'B3', 'D4'],
    guitarPositions: [
      { string: 1, fret: 3 },
      { string: 5, fret: 2 },
      { string: 6, fret: 3 },
    ],
    guitarFingers: [3, 2, 4],
  },
  D: {
    pianoNotes: ['D4', 'F#4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 2 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
    guitarFingers: [2, 3, 1],
  },
  A: {
    pianoNotes: ['A3', 'C#4', 'E4'],
    guitarPositions: [
      { string: 4, fret: 2 },
      { string: 3, fret: 2 },
      { string: 2, fret: 2 },
    ],
    guitarFingers: [1, 2, 3],
  },
  E: {
    pianoNotes: ['E3', 'G#3', 'B3'],
    guitarPositions: [
      { string: 5, fret: 2 },
      { string: 4, fret: 2 },
      { string: 3, fret: 1 },
    ],
    guitarFingers: [2, 3, 1],
  },
  F: {
    pianoNotes: ['F3', 'A3', 'C4'],
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
    ],
    guitarFingers: [1, 1, 2, 3],
  },
  Bb: {
    pianoNotes: ['Bb3', 'D4', 'F4'],
    guitarPositions: [
      { string: 5, fret: 1 },
      { string: 4, fret: 3 },
      { string: 3, fret: 3 },
      { string: 2, fret: 3 },
      { string: 1, fret: 1 },
    ],
    guitarFingers: [1, 3, 4, 4, 1],
  },
  Eb: {
    pianoNotes: ['Eb4', 'G4', 'Bb4'],
    guitarPositions: [
      { string: 5, fret: 6 },
      { string: 4, fret: 8 },
      { string: 3, fret: 8 },
      { string: 2, fret: 8 },
      { string: 1, fret: 6 },
    ],
    guitarFingers: [1, 3, 4, 4, 1],
  },
  Ab: {
    pianoNotes: ['Ab3', 'C4', 'Eb4'],
    guitarPositions: [
      { string: 6, fret: 4 },
      { string: 5, fret: 6 },
      { string: 4, fret: 6 },
      { string: 3, fret: 5 },
      { string: 2, fret: 4 },
      { string: 1, fret: 4 },
    ],
    guitarFingers: [1, 3, 4, 2, 1, 1],
  },
  Db: {
    pianoNotes: ['Db4', 'F4', 'Ab4'],
    guitarPositions: [
      { string: 5, fret: 4 },
      { string: 4, fret: 6 },
      { string: 3, fret: 6 },
      { string: 2, fret: 6 },
      { string: 1, fret: 4 },
    ],
    guitarFingers: [1, 3, 4, 4, 1],
  },
  'F#': {
    pianoNotes: ['F#3', 'A#3', 'C#4'],
    guitarPositions: [
      { string: 6, fret: 2 },
      { string: 5, fret: 4 },
      { string: 4, fret: 4 },
      { string: 3, fret: 3 },
      { string: 2, fret: 2 },
      { string: 1, fret: 2 },
    ],
    guitarFingers: [1, 3, 4, 2, 1, 1],
  },
  B: {
    pianoNotes: ['B3', 'D#4', 'F#4'],
    guitarPositions: [
      { string: 5, fret: 2 },
      { string: 4, fret: 4 },
      { string: 3, fret: 4 },
      { string: 2, fret: 4 },
      { string: 1, fret: 2 },
    ],
    guitarFingers: [1, 3, 4, 4, 1],
  },
  Am: {
    pianoNotes: ['A3', 'C4', 'E4'],
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
    guitarFingers: [1, 2, 3],
  },
  Em: {
    pianoNotes: ['E3', 'G3', 'B3'],
    guitarPositions: [
      { string: 4, fret: 2 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [2, 3],
  },
  Dm: {
    pianoNotes: ['D4', 'F4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
    guitarFingers: [1, 3, 2],
  },
  Bm: {
    pianoNotes: ['B3', 'D4', 'F#4'],
    guitarPositions: [
      { string: 5, fret: 2 },
      { string: 4, fret: 4 },
      { string: 3, fret: 4 },
      { string: 2, fret: 3 },
      { string: 1, fret: 2 },
    ],
    guitarFingers: [1, 3, 4, 2, 1],
  },
  'F#m': {
    pianoNotes: ['F#3', 'A3', 'C#4'],
    guitarPositions: [
      { string: 6, fret: 2 },
      { string: 5, fret: 4 },
      { string: 4, fret: 4 },
      { string: 3, fret: 2 },
      { string: 2, fret: 2 },
      { string: 1, fret: 2 },
    ],
    guitarFingers: [1, 3, 4, 2, 1, 1],
  },
  'C#m': {
    pianoNotes: ['C#4', 'E4', 'G#4'],
    guitarPositions: [
      { string: 5, fret: 4 },
      { string: 4, fret: 6 },
      { string: 3, fret: 6 },
      { string: 2, fret: 5 },
      { string: 1, fret: 4 },
    ],
    guitarFingers: [1, 3, 4, 2, 1],
  },
  'G#m': {
    pianoNotes: ['G#3', 'B3', 'D#4'],
    guitarPositions: [
      { string: 6, fret: 4 },
      { string: 5, fret: 6 },
      { string: 4, fret: 6 },
      { string: 3, fret: 4 },
      { string: 2, fret: 4 },
      { string: 1, fret: 4 },
    ],
    guitarFingers: [1, 3, 4, 2, 1, 1],
  },
  'D#m': {
    pianoNotes: ['D#4', 'F#4', 'A#4'],
    guitarPositions: [
      { string: 5, fret: 6 },
      { string: 4, fret: 8 },
      { string: 3, fret: 8 },
      { string: 2, fret: 7 },
      { string: 1, fret: 6 },
    ],
    guitarFingers: [1, 3, 4, 2, 1],
  },
  Bbm: {
    pianoNotes: ['Bb3', 'Db4', 'F4'],
    guitarPositions: [
      { string: 5, fret: 1 },
      { string: 4, fret: 3 },
      { string: 3, fret: 3 },
      { string: 2, fret: 2 },
      { string: 1, fret: 1 },
    ],
    guitarFingers: [1, 3, 4, 2, 1],
  },
  Fm: {
    pianoNotes: ['F3', 'Ab3', 'C4'],
    guitarPositions: [
      { string: 6, fret: 1 },
      { string: 5, fret: 3 },
      { string: 4, fret: 3 },
      { string: 3, fret: 1 },
      { string: 2, fret: 1 },
      { string: 1, fret: 1 },
    ],
    guitarFingers: [1, 3, 4, 1, 1, 1],
  },
  Cm: {
    pianoNotes: ['C4', 'Eb4', 'G4'],
    guitarPositions: [
      { string: 5, fret: 3 },
      { string: 4, fret: 5 },
      { string: 3, fret: 5 },
      { string: 2, fret: 4 },
      { string: 1, fret: 3 },
    ],
    guitarFingers: [1, 3, 4, 2, 1],
  },
  Gm: {
    pianoNotes: ['G3', 'Bb3', 'D4'],
    guitarPositions: [
      { string: 6, fret: 3 },
      { string: 5, fret: 5 },
      { string: 4, fret: 5 },
      { string: 3, fret: 3 },
      { string: 2, fret: 3 },
      { string: 1, fret: 3 },
    ],
    guitarFingers: [1, 3, 4, 1, 1, 1],
  },
};

export type ChordName = keyof typeof chords;
