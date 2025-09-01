import React from 'react';
import type { FretPosition } from '../../data/chords';

interface GuitarChordDiagramProps {
  positions: FretPosition[];
}

const GuitarChordDiagram: React.FC<GuitarChordDiagramProps> = ({ positions }) => {
  // We'll create a simple SVG-based guitar chord diagram
  const strings = [6, 5, 4, 3, 2, 1]; // Standard guitar strings from low to high
  const frets = [0, 1, 2, 3, 4]; // First 5 frets

  return (
    <div className="guitar-chord-diagram">
      <svg viewBox="0 0 120 150" className="w-full max-w-xs">
        {/* Draw strings */}
        {strings.map((string, index) => (
          <line
            key={`string-${string}`}
            x1="20"
            y1={20 + index * 20}
            x2="100"
            y2={20 + index * 20}
            stroke="#333"
            strokeWidth="1"
          />
        ))}

        {/* Draw frets */}
        {frets.map((fret, index) => (
          <line
            key={`fret-${fret}`}
            x1={20 + index * 20}
            y1="20"
            x2={20 + index * 20}
            y2="120"
            stroke="#333"
            strokeWidth={index === 0 ? '3' : '1'}
          />
        ))}

        {/* Draw positions */}
        {positions.map((pos, index) => {
          const stringIndex = strings.indexOf(pos.string);
          if (stringIndex === -1) return null;
          
          const fretIndex = frets.indexOf(pos.fret);
          if (fretIndex === -1) return null;
          
          return (
            <circle
              key={`pos-${index}`}
              cx={20 + fretIndex * 20}
              cy={20 + stringIndex * 20}
              r="8"
              fill="#4F46E5"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default GuitarChordDiagram;
