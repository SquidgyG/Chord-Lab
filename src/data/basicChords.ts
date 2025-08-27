// Shared basic chord data — kept small for demos and QA
export interface Chord {
  name: string
  guitarPositions: { string: number; fret: number }[]
  guitarFingers: number[]
  pianoNotes: string[]
}

export const chordData: Chord[] = [
  { name: 'C',  guitarPositions: [ { string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 } ], guitarFingers: [1,2,3], pianoNotes: ['C4','E4','G4'] },
  { name: 'G',  guitarPositions: [ { string: 1, fret: 3 }, { string: 2, fret: 0 }, { string: 5, fret: 2 }, { string: 6, fret: 3 } ], guitarFingers: [3,0,2,4], pianoNotes: ['G3','B3','D4'] },
  { name: 'F',  guitarPositions: [ { string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 } ], guitarFingers: [1,1,2,3], pianoNotes: ['F3','A3','C4'] },
  { name: 'Am', guitarPositions: [ { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 } ], guitarFingers: [1,2,3], pianoNotes: ['A3','C4','E4'] },
  { name: 'Em', guitarPositions: [ { string: 4, fret: 2 }, { string: 5, fret: 2 } ], guitarFingers: [2,3], pianoNotes: ['E3','G3','B3'] },
  { name: 'Dm', guitarPositions: [ { string: 1, fret: 1 }, { string: 2, fret: 3 }, { string: 3, fret: 2 } ], guitarFingers: [1,3,2], pianoNotes: ['D4','F4','A4'] },
]

export function titleForArchivedCharts(name: string): string {
  // Map simple names like 'C', 'Am' to the archived HTML titles like 'C Major', 'A Minor'
  const isMinor = name.endsWith('m')
  const base = isMinor ? name.slice(0, -1) : name
  return `${base} ${isMinor ? 'Minor' : 'Major'}`
}
