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

const GuitarChordDiagram: React.FC<GuitarPositionProps> = ({ positions, color = '#000' }) => {
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
  const openStrings = useMemo((): string[] => {
    const strings = Array<string>(6).fill('');
    positions.forEach(pos => {
      if (pos.fret === 0) {
        strings[6 - pos.string] = 'O';
      }
    });
    return strings;
  }, [positions]);

  const mutedStrings = useMemo((): string[] => {
    const strings = Array<string>(6).fill('');
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
            style={{ left: `${(i + 0.5) * (100 / 6)}%` }}
          />
        ))}
        
        {/* Barre chords */}
        {barreChords.map((barre, idx) => {
          const segment = 100 / 6;
          const left = (6 - barre.endString + 0.5) * segment;
          const width = (barre.endString - barre.startString) * segment;
          return (
            <div
              key={idx}
              className="barre"
              style={{
                top: `${(barre.fret - 0.5) * 20}%`,
                left: `${left}%`,
                width: `${width}%`,
                '--cc': color,
              } as React.CSSProperties}
            >
              1
            </div>
          );
        })}
        
        {/* Positions */}
        {positions
          .filter(p =>
            p.fret > 0 &&
            !barreChords.some(
              barre =>
                p.finger === 1 &&
                p.fret === barre.fret &&
                p.string >= barre.startString &&
                p.string <= barre.endString
            )
          )
          .map((pos, idx) => {
            const segment = 100 / 6;
            return (
              <div
                key={idx}
                className="dot"
                style={{
                  top: `${(pos.fret - 0.5) * 20}%`,
                  left: `${(6 - pos.string + 0.5) * segment}%`,
                  '--cc': color,
                } as React.CSSProperties}
              >
                {pos.finger}
              </div>
            );
          })}
        
        {/* Open and muted strings */}
        {openStrings.map((open, i) => (
          open && (
            <div
              key={`open-${i}`}
              className="string-indicator open-symbol"
              style={{ left: `${(i + 0.5) * (100 / 6)}%`, top: '-15%' }}
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
              style={{ left: `${(i + 0.5) * (100 / 6)}%`, top: '-15%' }}
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
            width: 360px;
            height: 360px;
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
            top: 0;
            height: 100%;
            width: 0;
            border-left: 2px solid #666;
            transform: translateX(-50%);
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
            transform: translateY(-50%);
            height: 48px;
            border-radius: 999px;
            background: var(--cc);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 800;
            font-size: 24px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }
          .dot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 72px;
            height: 72px;
            border-radius: 999px;
            background: var(--cc);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 800;
            font-size: 30px;
            text-shadow: 0 1px 0 rgba(0,0,0,0.25);
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </div>
  );
};

export default GuitarChordDiagram;
