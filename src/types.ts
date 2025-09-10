export interface ChordOption {
  name: string;
  positions: {
    fret: number;
    string: number;
    muted?: boolean;
  }[];
  notes: string[];
}

export interface FretPosition {
  fret: number;
  string: number;
  muted?: boolean;
}

export interface ChordProgression {
  name: string;
  chords: string[];
}

export interface ChordDefinition {
  chordName: string;
  guitarPositions: FretPosition[];
  pianoNotes: string[];
  level?: number;
  color: string;
  noteLabels?: string[];
}
