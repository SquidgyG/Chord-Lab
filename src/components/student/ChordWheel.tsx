import React from 'react';
import type { ChordOption } from '../../types';

interface ChordWheelProps {
  chords: ChordOption[];
  selectedChord: ChordOption | null;
  onSelectChord: (chord: ChordOption) => void;
  instrument: 'guitar' | 'piano';
  onSelectInstrument: (instrument: 'guitar' | 'piano') => void;
}

interface ChordProgression {
  name: string;
  chords: string[];
}

const commonProgressions: ChordProgression[] = [
  { name: 'Pop Progression', chords: ['C Major', 'G Major', 'A Minor', 'F Major'] },
  { name: 'Blues Progression', chords: ['C Major', 'F Major', 'G Major'] },
  { name: 'Rock Progression', chords: ['E Minor', 'C Major', 'G Major', 'D Major'] },
  { name: 'Jazz Progression', chords: ['D Minor', 'G Major', 'C Major', 'A Major'] }
];

export const ChordWheel: React.FC<ChordWheelProps> = ({
  chords,
  selectedChord,
  onSelectChord,
  instrument,
  onSelectInstrument
}) => {
  return (
    <div className="chord-wheel">
      <div className="instrument-selector">
        <button 
          onClick={() => onSelectInstrument('guitar')}
          className={instrument === 'guitar' ? 'active' : ''}
        >
          Guitar
        </button>
        <button
          onClick={() => onSelectInstrument('piano')}
          className={instrument === 'piano' ? 'active' : ''}
        >
          Piano
        </button>
      </div>
      
      <div className="chord-options">
        {chords.map((chord) => (
          <div 
            key={chord.name}
            onClick={() => onSelectChord(chord)}
            className={`chord-option ${selectedChord?.name === chord.name ? 'selected' : ''}`}
          >
            {chord.name}
          </div>
        ))}
      </div>

      <div className="progressions">
        <h3>Suggested Progressions</h3>
        <div className="progression-list">
          {commonProgressions.map((prog) => (
            <div 
              key={prog.name}
              className="progression"
              onClick={() => prog.chords.forEach(c => {
                const chord = chords.find(ch => ch.name === c);
                if (chord) onSelectChord(chord);
              })}
            >
              <div className="progression-name">{prog.name}</div>
              <div className="progression-chords">{prog.chords.join(' - ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
