export interface Chord {
  name: string;
  guitarPositions: { string: number; fret: number }[];
  guitarFingers: number[];
  pianoNotes: string[];
  level: number;
}

export const CHORDS: Chord[] = [
  {
    name: 'C',
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 4, fret: 2 },
      { string: 5, fret: 3 },
    ],
    guitarFingers: [1, 2, 3],
    pianoNotes: ['C4', 'E4', 'G4'],
    level: 2,
  },
  {
    name: 'G',
    guitarPositions: [
      { string: 1, fret: 3 },
      { string: 2, fret: 0 },
      { string: 5, fret: 2 },
      { string: 6, fret: 3 },
    ],
    guitarFingers: [3, 0, 2, 4],
    pianoNotes: ['G3', 'B3', 'D4'],
    level: 3,
  },
  {
    name: 'F',
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
    ],
    guitarFingers: [1, 1, 2, 3],
    pianoNotes: ['F3', 'A3', 'C4'],
    level: 2,
  },
  {
    name: 'D',
    guitarPositions: [
      { string: 1, fret: 2 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
    guitarFingers: [2, 3, 1],
    pianoNotes: ['D4', 'F#4', 'A4'],
    level: 3,
  },
  {
    name: 'A',
    guitarPositions: [
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
    guitarFingers: [2, 1, 3],
    pianoNotes: ['A3', 'C#4', 'E4'],
    level: 3,
  },
  {
    name: 'E',
    guitarPositions: [
      { string: 3, fret: 1 },
      { string: 4, fret: 2 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [1, 3, 2],
    pianoNotes: ['E3', 'G#3', 'B3'],
    level: 3,
  },
  {
    name: 'B',
    guitarPositions: [
      { string: 1, fret: 2 },
      { string: 2, fret: 4 },
      { string: 3, fret: 4 },
      { string: 4, fret: 4 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [1, 4, 3, 2, 1],
    pianoNotes: ['B3', 'D#4', 'F#4'],
    level: 4,
  },
  {
    name: 'Am',
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
    guitarFingers: [1, 2, 3],
    pianoNotes: ['A3', 'C4', 'E4'],
    level: 3,
  },
  {
    name: 'Em',
    guitarPositions: [
      { string: 4, fret: 2 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [2, 3],
    pianoNotes: ['E3', 'G3', 'B3'],
    level: 4,
  },
  {
    name: 'Dm',
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
    guitarFingers: [1, 3, 2],
    pianoNotes: ['D4', 'F4', 'A4'],
    level: 4,
  },
  {
    name: 'Bm',
    guitarPositions: [
      { string: 1, fret: 2 },
      { string: 2, fret: 3 },
      { string: 3, fret: 4 },
      { string: 4, fret: 4 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [1, 2, 4, 3, 1],
    pianoNotes: ['B3', 'D4', 'F#4'],
    level: 4,
  },
  {
    name: 'F#m',
    guitarPositions: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 4 },
      { string: 5, fret: 4 },
      { string: 6, fret: 2 },
    ],
    guitarFingers: [1, 1, 1, 4, 3, 1],
    pianoNotes: ['F#3', 'A3', 'C#4'],
    level: 4,
  },
  {
    name: 'C#m',
    guitarPositions: [
      { string: 1, fret: 4 },
      { string: 2, fret: 5 },
      { string: 3, fret: 6 },
      { string: 4, fret: 6 },
      { string: 5, fret: 4 },
    ],
    guitarFingers: [1, 2, 4, 3, 1],
    pianoNotes: ['C#4', 'E4', 'G#4'],
    level: 4,
  },
  {
    name: 'G#m',
    guitarPositions: [
      { string: 1, fret: 4 },
      { string: 2, fret: 4 },
      { string: 3, fret: 4 },
      { string: 4, fret: 6 },
      { string: 5, fret: 6 },
      { string: 6, fret: 4 },
    ],
    guitarFingers: [1, 1, 1, 4, 3, 1],
    pianoNotes: ['G#3', 'B3', 'D#4'],
    level: 4,
  },
];

export default CHORDS;
