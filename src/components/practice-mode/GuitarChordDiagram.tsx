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

  return (
    <div className="guitar-chord-diagram">
      <svg width="120" height="160" viewBox="0 0 120 160" className="w-full max-w-xs">
        {/* Draw strings */}
        {strings.map((_, index) => (
          <line
            key={`string-${index}`}
            x1="20"
            y1={20 + index * 20}
            x2="100"
            y2={20 + index * 20}
            stroke="#333"
            strokeWidth="1"
          />
        ))}

        {/* Draw frets */}
        {frets.map((_, index) => (
          <line
            key={`fret-${index}`}
            x1={20 + index * 20}
            y1="20"
            x2={20 + index * 20}
            y2="140"
            stroke="#333"
            strokeWidth={index === 0 ? '3' : '1'}
          />
        ))}

        {/* Draw open and muted indicators */}
        {strings.map((string, index) => {
          if (openStrings.includes(string)) {
            return (
              <text
                key={`open-${string}`}
                x="10"
                y={20 + index * 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontSize="12"
                fontWeight="bold"
              >
                O
              </text>
            );
          } else if (mutedStrings.includes(string)) {
            return (
              <text
                key={`muted-${string}`}
                x="10"
                y={20 + index * 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontSize="12"
                fontWeight="bold"
              >
                X
              </text>
            );
          }
          return null;
        })}

        {/* Draw positions with finger numbers */}
        {positions.map((pos, index) => {
          const stringIndex = strings.indexOf(pos.string.toString());
          if (stringIndex === -1) return null;
          
          const fretIndex = frets.indexOf(pos.fret);
          if (fretIndex === -1) return null;
          
          return (
            <g key={`pos-${index}`}>
              <circle
                cx={20 + fretIndex * 20}
                cy={20 + stringIndex * 20}
                r="9"
                fill={pos.isRoot ? '#e53e3e' : '#4F46E5'}
                stroke="#333"
                strokeWidth="1"
              />
              <text
                x={20 + fretIndex * 20}
                y={20 + stringIndex * 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {pos.finger}
              </text>
            </g>
          );
        })}
      </svg>
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
        `}
      </style>
    </div>
  );
};

export default GuitarChordDiagram;
