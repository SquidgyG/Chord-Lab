import React from 'react';
import type { Chord } from '../../data/chords';
import GuitarChordDiagram from './GuitarChordDiagram';
import PianoChordDiagram from './PianoChordDiagram';

interface ChordDisplayProps {
  chord: Chord | null;
  instrument: 'guitar' | 'piano';
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chord, instrument }) => {
  if (!chord) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-5xl font-bold text-gray-800" data-testid="current-chord-name">
        {chord.name}
      </div>
      
      {instrument === 'guitar' && chord.guitarPositions && (
        <GuitarChordDiagram positions={chord.guitarPositions} />
      )}
      
      {instrument === 'piano' && chord.pianoNotes && (
        <PianoChordDiagram notes={chord.pianoNotes} />
      )}
    </div>
  );
};

export default ChordDisplay;
