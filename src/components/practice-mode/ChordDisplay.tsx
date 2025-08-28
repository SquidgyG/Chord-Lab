import React from 'react';
import type { Chord } from '../../data/chords';

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
        <div className="flex flex-wrap justify-center gap-2">
          {chord.guitarPositions.map((pos, idx) => (
            <div key={idx} className="text-lg text-gray-700">
              {pos.string}弦{pos.fret}品
            </div>
          ))}
        </div>
      )}
      {instrument === 'piano' && chord.pianoNotes && (
        <div className="text-lg text-gray-700">
          {chord.pianoNotes.join(', ')}
        </div>
      )}
    </div>
  );
};

export default ChordDisplay;
