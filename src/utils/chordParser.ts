// Chord parser utility to extract notes from chord names
export function parseChord(chordName: string): string[] {
  // Basic chord parsing logic - will expand for complex chords
  const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Extract root note
  const rootRegex = /^[A-G][#b]?/;
  const rootMatch = rootRegex.exec(chordName);
  if (!rootMatch) return [];
  
  const root = rootMatch[0];
  const rootIndex = baseNotes.indexOf(root);
  
  if (rootIndex === -1) return [];
  
  // Basic triad pattern (major)
  return [
    baseNotes[rootIndex],
    baseNotes[(rootIndex + 4) % 12],
    baseNotes[(rootIndex + 7) % 12]
  ];
}
