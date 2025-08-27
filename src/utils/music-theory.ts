const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteMap: { [key: string]: number } = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
  'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
  'A#': 10, 'Bb': 10, 'B': 11
};

export function getNoteParts(note: string): { root: string, octave: number } | null {
  const match = note.match(/^([A-Ga-g][#b]?)(\d)$/);
  if (!match) return null;
  return { root: match[1], octave: parseInt(match[2], 10) };
}

export function getMidiNumber(note: string): number | null {
  const parts = getNoteParts(note);
  if (!parts) return null;
  const noteIndex = noteMap[parts.root];
  if (noteIndex === undefined) return null;
  return 12 * (parts.octave + 1) + noteIndex;
}

export function getNoteFromMidi(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  const noteName = noteOrder[noteIndex];
  return `${noteName}${octave}`;
}

export function getChordInversion(notes: string[], inversion: number): string[] {
  if (inversion === 0) return notes;

  const sortedNotes = notes.map(getMidiNumber).filter(n => n !== null).sort((a, b) => a! - b!) as number[];
  if (sortedNotes.length === 0) return [];

  const invertedMidi = [...sortedNotes];
  for (let i = 0; i < inversion; i++) {
    if (invertedMidi.length > 0) {
      const firstNote = invertedMidi.shift();
      if (firstNote !== undefined) {
        invertedMidi.push(firstNote + 12); // Move up an octave
      }
    }
  }

  return invertedMidi.map(getNoteFromMidi);
}

export function getDiatonicChords(key: string): string[] {
  const keyIndex = noteMap[key];
  if (keyIndex === undefined) return [];

  const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
  const chordQualities = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'];

  const chords = majorScaleIntervals.map((interval, i) => {
    const rootIndex = (keyIndex + interval) % 12;
    const rootName = noteOrder[rootIndex];
    const quality = chordQualities[i];
    if (quality === 'maj') return rootName;
    if (quality === 'min') return `${rootName}m`;
    return `${rootName}dim`;
  });

  return chords;
}
