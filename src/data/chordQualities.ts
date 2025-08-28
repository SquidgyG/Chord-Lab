export interface ChordQuality {
  quality: 'Major' | 'Minor'
  notes: string[]
}

export const chordQualities: ChordQuality[] = [
  { quality: 'Major', notes: ['C4', 'E4', 'G4'] },
  { quality: 'Major', notes: ['D4', 'F#4', 'A4'] },
  { quality: 'Major', notes: ['F4', 'A4', 'C5'] },
  { quality: 'Minor', notes: ['A3', 'C4', 'E4'] },
  { quality: 'Minor', notes: ['D4', 'F4', 'A4'] },
  { quality: 'Minor', notes: ['E4', 'G4', 'B4'] },
]
