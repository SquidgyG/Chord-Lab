import React from 'react';

interface GuitarChordDiagramProps {
  positions: {
    string: number;
    fret: number;
    finger: number;
    isRoot?: boolean; // Optional: if true, this note is the root
  }[];
  openStrings?: string[]; // Array of string numbers that are open, e.g., ['1','2']
  mutedStrings?: string[]; // Array of string numbers that are muted, e.g., ['5','6']
}

const GuitarChordDiagram: React.FC<GuitarChordDiagramProps> = ({ 
  positions, 
  openStrings = [], 
  mutedStrings = [] 
}) => {
  const strings = ['6', '5', '4', '3', '2', '1'];
  const frets = [0, 1, 2, 3, 4];
  const stringWidth = 20;
  const fretHeight = 20;
  const dotRadius = 9;

  return (
    <div className="guitar-chord-diagram">
      <div className="fretboard">
        {[...Array(5)].map((_, fretIndex) => (
          <div 
            key={`fret-${fretIndex}`} 
            className="fret-line" 
            style={{
              top: `${fretHeight * (fretIndex + 1)}px`,
              borderBottom: fretIndex === 0 ? '4px solid #000' : '2px solid #000', // Thicker nut and frets
            }}
          />
        ))}
        {[...Array(6)].map((_, stringIndex) => {
          const stringPositions = positions.filter(p => p.string === 6 - stringIndex);
          const isOpen = openStrings[5 - stringIndex] === 'O';
          const isMuted = mutedStrings[5 - stringIndex] === 'X';
          
          return (
            <React.Fragment key={`string-${stringIndex}`}>
              <div 
                className="string-line" 
                style={{
                  left: `${stringWidth * stringIndex}px`,
                  borderTop: '2px solid #666', // Thicker strings
                }}
              />
              <div 
                className="string-indicator"
                style={{
                  left: `${stringWidth * stringIndex}px`,
                  top: '-25px',
                }}
              >
                {isOpen && (
                  <div className="open-symbol" style={{ fontSize: '18px', fontWeight: 'bold' }}>O</div>
                )}
                {isMuted && (
                  <div className="mute-symbol" style={{ fontSize: '18px', fontWeight: 'bold' }}>X</div>
                )}
              </div>
            </React.Fragment>
          );
        })}
        {positions.map((pos, index) => {
          const stringIndex = strings.indexOf(pos.string.toString());
          if (stringIndex === -1) return null;
          
          const fretIndex = frets.indexOf(pos.fret);
          if (fretIndex === -1) return null;
          
          const stringX = stringWidth * stringIndex + stringWidth / 2;
          const fretY = fretHeight * fretIndex + fretHeight / 2;
          
          return (
            <div
              key={index}
              className="fret-position"
              style={{
                left: `${stringX - dotRadius}px`,
                top: `${fretY - dotRadius}px`,
                width: `${dotRadius * 2}px`,
                height: `${dotRadius * 2}px`,
                backgroundColor: pos.isRoot ? '#ff6b6b' : '#4d9de0',
                border: '2px solid #000', // Add border to dots
              }}
            >
              <span className="finger-number" style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
                {pos.finger}
              </span>
            </div>
          );
        })}
      </div>
      <style>
        {`
          .guitar-chord-diagram {
            margin: 0 auto;
            display: block;
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .fretboard {
            position: relative;
            width: 120px;
            height: 160px;
            background-color: #fff;
            border: 1px solid #ddd;
          }
          .fret-line {
            position: absolute;
            width: 100%;
            height: 0;
            border-bottom: 2px solid #000;
          }
          .string-line {
            position: absolute;
            height: 100%;
            width: 0;
            border-top: 1px solid #666;
          }
          .string-indicator {
            position: absolute;
            width: 20px;
            text-align: center;
          }
          .open-symbol, .mute-symbol {
            font-size: 18px;
            font-weight: bold;
          }
          .fret-position {
            position: absolute;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .finger-number {
            font-size: 14px;
            font-weight: bold;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default GuitarChordDiagram;
