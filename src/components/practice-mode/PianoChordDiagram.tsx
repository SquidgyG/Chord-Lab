import React from 'react';
import './PianoChordDiagram.css';

interface PianoChordDiagramProps {
  notes: string[];
  chordName?: string;
  color?: string; // Hex color code
}

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ 
  notes, 
  chordName, 
  color = '#cc39bc' // Default color
}) => {
  const activeNotes = notes || [];
  
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

  // Calculate positions
  const whiteKeyWidth = 100 / 11; // 11 white keys in the reference

  // For black keys: left = (index * whiteKeyWidth) - (whiteKeyWidth * 0.32)
  const getBlackKeyLeft = (index: number) => {
    return `calc(${index * whiteKeyWidth}% - ${whiteKeyWidth * 0.32}%)`;
  };

  // For fill overlays: left = (index * whiteKeyWidth)% for white keys
  const getFillLeft = (index: number, isBlack: boolean) => {
    if (isBlack) {
      return getBlackKeyLeft(index);
    }
    return `${index * whiteKeyWidth}%`;
  };

  // Update fill styles to use dynamic color
  const fillStyle = {
    backgroundColor: `${color}33`, // Add alpha transparency
    border: `2px solid ${color}`
  };

  return (
    <div className="piano-chart-container">
      {chordName && (
        <div className="chord-name-display">
          {chordName}
        </div>
      )}
      <div className="keyboard-wrap">
        <div className="keyboard" role="img" aria-label={`${chordName} chord`}>
          {keys.map((key, index) => {
            const isActive = activeNotes.includes(key.note);
            
            if (key.type === 'white') {
              return (
                <div 
                  key={index}
                  className={`white-key ${isActive ? 'active' : ''}`}
                  aria-label={key.note}
                />
              );
            } else {
              return (
                <div
                  key={index}
                  className={`black-key ${isActive ? 'active' : ''}`}
                  style={{
                    left: getBlackKeyLeft(index),
                  }}
                  aria-label={key.note}
                />
              );
            }
          })}
          
          {/* Fill overlays with dynamic color */}
          {activeNotes.map((note, index) => {
            const keyIndex = keys.findIndex(k => k.note === note);
            if (keyIndex === -1) return null;
            
            const key = keys[keyIndex];
            const isBlack = key.type === 'black';
            
            return (
              <div
                key={`fill-${index}`}
                className={`fill ${isBlack ? 'fill-black' : 'fill-white'}`}
                style={{
                  ...fillStyle,
                  left: getFillLeft(keyIndex, isBlack),
                  width: isBlack 
                    ? `calc(${100 / keys.length}% * 0.64)` 
                    : `calc(${100 / keys.length}%)`,
                }}
              />
            );
          })}
          
          {/* Note indicators with chord color */}
          {activeNotes.map((note, index) => {
            const keyIndex = keys.findIndex(k => k.note === note);
            if (keyIndex === -1) return null;
            
            const key = keys[keyIndex];
            const isBlack = key.type === 'black';
            
            return (
              <div
                key={`note-${index}`}
                className={`note ${isBlack ? 'black' : 'white'}`}
                style={{
                  borderColor: color,
                  boxShadow: `0 5px 10px ${color}33`,
                  left: `calc(${(keyIndex + 0.5) * (100 / keys.length)}%)`,
                  top: isBlack ? 'calc(62% - 43px)' : 'calc(100% - 18px - 43px)',
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
