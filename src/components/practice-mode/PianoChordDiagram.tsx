import React from 'react';
import './PianoChordDiagram.css';

interface PianoChordDiagramProps {
  notes: string[];
  fingers?: number[]; 
  chordName?: string; 
}

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ 
  notes, 
  fingers = [],
  chordName = ''
}) => {
  const activeNotes = notes || [];

  const whiteKeyPositions: Record<string, string> = {
    'C': '0%',
    'D': '14.28%',
    'E': '28.56%',
    'F': '42.84%',
    'G': '57.12%',
    'A': '71.4%',
    'B': '85.68%',
  };

  const getBlackKeyPosition = (key: string): string => {
    const positions: Record<string, string> = {
      'C#': '7%',
      'D#': '22%',
      'F#': '52%',
      'G#': '67%',
      'A#': '82%',
    };
    return positions[key] || '0%';
  };

  return (
    <div className="piano-chart-container">
      {chordName && (
        <div className="chord-name-display">
          {chordName}
        </div>
      )}
      <div className="keyboard-wrap">
        <div className="keyboard">
          {whiteKeys.map(key => (
            <div 
              key={key}
              className="white-key"
              style={{ 
                position: 'relative',
                backgroundColor: activeNotes.includes(key) ? '#ffd86f' : '#fff',
                background: activeNotes.includes(key) 
                  ? 'linear-gradient(to bottom, #ffd86f, #fcb045)' 
                  : 'linear-gradient(to bottom, #fff, #e0e0e0)',
                boxShadow: activeNotes.includes(key) 
                  ? '0 4px 8px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.2)' 
                  : 'inset 0 -3px 10px rgba(0,0,0,0.1)',
              }}
            >
              <div className="key-label">
                {key}
              </div>
              {activeNotes.includes(key) && fingers[activeNotes.indexOf(key)] && (
                <div className="finger-label">
                  {fingers[activeNotes.indexOf(key)]}
                </div>
              )}
            </div>
          ))}
          {blackKeys.map(key => (
            <div
              key={key}
              className="black-key"
              style={{
                left: getBlackKeyPosition(key),
                backgroundColor: activeNotes.includes(key) ? '#fcb045' : '#333',
                background: activeNotes.includes(key)
                  ? 'linear-gradient(to bottom, #fcb045, #ff8c00)'
                  : 'linear-gradient(to bottom, #333, #000)',
                boxShadow: activeNotes.includes(key)
                  ? '0 4px 8px rgba(0,0,0,0.5), inset 0 -3px 6px rgba(0,0,0,0.5)'
                  : 'inset 0 -3px 6px rgba(0,0,0,0.5)',
              }}
            >
              <div className="key-label">
                {key}
              </div>
              {activeNotes.includes(key) && fingers[activeNotes.indexOf(key)] && (
                <div className="finger-label">
                  {fingers[activeNotes.indexOf(key)]}
                </div>
              )}
            </div>
          ))}
          {activeNotes.map((note, index) => {
            const noteName = note.replace(/\d/, '');
            const isBlack = blackKeys.includes(noteName);
            const left = isBlack ? getBlackKeyPosition(noteName) : whiteKeyPositions[noteName];
            
            return (
              <div 
                key={`${note}-${index}`}
                className={`${isBlack ? 'black-key' : 'white-key'} active-note`}
                style={{ 
                  left,
                  ...(isBlack ? { zIndex: 2 } : {})
                }}
              >
                <div className="active-note-indicator">
                  {noteName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PianoChordDiagram;
