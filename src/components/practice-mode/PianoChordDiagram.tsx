import React from 'react';
import './PianoChordDiagram.css';

type PianoChordDiagramProps = {
  notes: string[];
  chordName?: string;
};

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ notes, chordName }) => {
  const activeNotes = notes || [];
  
  // Define the keys in order
  const keys = [
    { type: 'white', note: 'C' },
    { type: 'black', note: 'C#' },
    { type: 'white', note: 'D' },
    { type: 'black', note: 'D#' },
    { type: 'white', note: 'E' },
    { type: 'white', note: 'F' },
    { type: 'black', note: 'F#' },
    { type: 'white', note: 'G' },
    { type: 'black', note: 'G#' },
    { type: 'white', note: 'A' },
    { type: 'black', note: 'A#' },
    { type: 'white', note: 'B' },
  ];

  return (
    <div className="piano-chart-container">
      {chordName && (
        <div className="chord-name-display">
          {chordName}
        </div>
      )}
      <div className="keyboard-wrap">
        <div className="keyboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
          {keys.map((key, index) => {
            const isActive = activeNotes.includes(key.note);
            const KeyComponent = key.type === 'white' ? 'div' : 'div';
            
            return (
              <KeyComponent
                key={index}
                className={`key ${key.type}-key ${isActive ? 'active' : ''}`}
                style={{ gridColumn: `${index + 1}` }}
              />
            );
          })}
          {activeNotes.map((note, index) => {
            const keyIndex = keys.findIndex(k => k.note === note);
            if (keyIndex === -1) return null;
            
            const key = keys[keyIndex];
            const isBlack = key.type === 'black';
            
            return (
              <div
                key={`note-${index}`}
                className={`note ${isBlack ? 'black-note-indicator' : 'white-note-indicator'} active-note-indicator`}
                style={{
                  gridColumn: `${keyIndex + 1}`,
                  gridRow: isBlack ? '1' : '2',
                  alignSelf: isBlack ? 'end' : 'start',
                }}
              >
                {note.replace(/\d/, '')}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PianoChordDiagram;
