import React, { useMemo } from 'react';
import './GuitarChordDiagram.css';

export interface GuitarPosition {
  string: number;
  fret: number;
  finger: number;
  isRoot?: boolean;
}

interface GuitarPositionProps {
  positions: GuitarPosition[];
  color?: string;
}

const GuitarChordDiagram: React.FC<GuitarPositionProps> = ({
  positions,
  color = '#ff6b6b',
}) => {
  // Calculate barre chords
  const barreChords = useMemo(() => {
    const barres: Record<number, { fret: number; startString: number; endString: number }> = {};
    positions.forEach(pos => {
      if (pos.finger === 1 && pos.fret > 0) {
        if (!barres[pos.fret]) {
          barres[pos.fret] = { fret: pos.fret, startString: pos.string, endString: pos.string };
        } else {
          if (pos.string < barres[pos.fret].startString) barres[pos.fret].startString = pos.string;
          if (pos.string > barres[pos.fret].endString) barres[pos.fret].endString = pos.string;
        }
      }
    });
    return Object.values(barres).filter(barre => barre.endString - barre.startString >= 1);
  }, [positions]);

  // Calculate open and muted strings
  const openStrings = useMemo(() => {
    const strings = Array(6).fill('');
    positions.forEach(pos => {
      if (pos.fret === 0) {
        strings[6 - pos.string] = 'O';
      }
    });
    return strings;
  }, [positions]);

  const mutedStrings = useMemo(() => {
    const strings = Array(6).fill('');
    const hasFret = positions.some(p => p.fret > 0);
    if (!hasFret) return strings;
    
    for (let i = 0; i < 6; i++) {
      if (!positions.some(p => p.string === 6 - i && p.fret > 0)) {
        strings[i] = 'X';
      }
    }
    return strings;
  }, [positions]);

  return (
    <div className="guitar-chord-diagram" role="img" aria-label="Guitar chord diagram">
      <div className="fretboard">
        {/* Nut */}
        <div className="nut" style={{ top: '0%' }} />
        
        {/* Frets */}
        {[1, 2, 3, 4].map(fret => (
          <div 
            key={fret}
            className="fret-line" 
            style={{ top: `${fret * 20}%` }}
          />
        ))}
        
        {/* Strings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="string-line" 
            style={{ left: `${i * 20}%` }}
          />
        ))}
        
        {/* Barre chords */}
        {barreChords.map((barre, idx) => (
          <div
            key={idx}
            className="barre"
            style={{
              top: `${(barre.fret - 0.5) * 20}%`,
              left: `${(6 - barre.endString) * 20}%`,
              width: `${(barre.endString - barre.startString) * 20}%`,
              height: '10px',
            }}
          />
        ))}
        
        {/* Positions */}
        {positions
          .filter(p => p.fret > 0)
          .map((pos, idx) => (
            <div
              key={idx}
              className={`fret-position ${pos.isRoot ? 'root' : ''}`}
              style={{
                top: `${(pos.fret - 0.5) * 20}%`,
                left: `${(6 - pos.string) * 20}%`,
              }}
            >
              {pos.finger}
            </div>
          ))}
        
        {/* Open and muted strings */}
        {openStrings.map((open, i) => (
          open && (
            <div 
              key={`open-${i}`}
              className="string-indicator open-symbol"
              style={{ left: `${i * 20}%`, top: '-15%' }}
            >
              {open}
            </div>
          )
        ))}
        {mutedStrings.map((muted, i) => (
          muted && (
            <div 
              key={`muted-${i}`}
              className="string-indicator mute-symbol"
              style={{ left: `${i * 20}%`, top: '-15%' }}
            >
              {muted}
            </div>
          )
        ))}
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
          .nut {
            position: absolute;
            width: 100%;
            height: 5px;
            background-color: #000;
            top: 0;
          }
          .fret-line {
            position: absolute;
            width: 100%;
            height: 0;
            border-bottom: 3px solid #000;
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
          .barre {
            position: absolute;
            background-color: #000;
            border-radius: 5px;
          }
          .fret-position {
            position: absolute;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 3px solid #000;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }
          .root {
            background-color: ${color};
          }
        `}
      </style>
    </div>
  );
};

export default GuitarChordDiagram;
