export interface ChordOption {
  name: string;
  positions: {
    fret: number;
    string: number;
    muted?: boolean;
  }[];
  notes: string[];
}

export interface ChordProgression {
  name: string;
  chords: string[];
}
