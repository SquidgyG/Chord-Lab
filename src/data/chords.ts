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
  color: string; // New color property
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
    color: "#cc39bc"
  },
  G: {
    pianoNotes: ['G3', 'B3', 'D4'],
    guitarPositions: [
      { string: 1, fret: 3, finger: 3 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 4 },
    ],
    level: 1,
    color: "#ff9900"
  },
  D: {
    pianoNotes: ['D4', 'F#4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 1 },
    ],
    level: 1,
    color: "#33cc33"
  },
  A: {
    pianoNotes: ['A3', 'C#4', 'E4'],
    guitarPositions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 3 },
    ],
    level: 1,
    color: "#66ccff"
  },
  E: {
    pianoNotes: ['E3', 'G#3', 'B3'],
    guitarPositions: [
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
      { string: 3, fret: 1, finger: 1 },
    ],
    level: 1,
    color: "#ff33cc"
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
    color: "#ccccff"
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
    color: "#ff66cc"
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
    color: "#33cccc"
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
    color: "#66ffcc"
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
    color: "#ff99cc"
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
    color: "#33ffcc"
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
    color: "#ffccff"
  },
  Am: {
    pianoNotes: ['A3', 'C4', 'E4'],
    guitarPositions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    level: 1,
    color: "#66cccc"
  },
  Em: {
    pianoNotes: ['E3', 'G3', 'B3'],
    guitarPositions: [
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
    ],
    level: 1,
    color: "#ff66ff"
  },
  Dm: {
    pianoNotes: ['D4', 'F4', 'A4'],
    guitarPositions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 2 },
    ],
    level: 1,
    color: "#33ff99"
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
    color: "#ff99ff"
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
    color: "#33cccc"
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
    color: "#66ff99"
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
    color: "#ffcc99"
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
    color: "#33ff66"
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
    color: "#ff99cc"
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
    color: "#66ffcc"
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
    color: "#ff66cc"
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
    color: "#33cccc"
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