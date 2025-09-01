import React, { useMemo } from 'react';
import './GuitarChordDiagram.css';

interface FingerPosition {
  fret: number;
  string: number;
  finger?: number;
}

interface GuitarPositionProps {
  positions: GuitarPosition[];
  color?: string;
}

interface Barre {
  fret: number;
  startString: number;
  endString: number;
}

const GuitarChordDiagram: React.FC<GuitarPositionProps> = ({
  positions,
  color = '#ff6b6b',
}) => {
  // Calculate barre chords
  const barreChords = useMemo<Barre[]>(() => {
    const barres: Record<number, Barre> = {};
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
  const openStrings = useMemo<string[]>(() => {
    const strings: string[] = Array(6).fill('') as string[];
    positions.forEach(pos => {
      if (pos.fret === 0) {
        strings[6 - pos.string] = 'O';
      }
    });
    return strings;
  }, [positions]);

  const mutedStrings = useMemo<string[]>(() => {
    const strings: string[] = Array(6).fill('') as string[];
    const hasFret = positions.some(p => p.fret > 0);
    if (!hasFret) return strings;
    
    for (let i = 0; i < 6; i++) {
      if (!positions.some(p => p.string === 6 - i && p.fret > 0)) {
        strings[i] = 'X';
      }
    }
    return strings;
  }, [positions]);

  // Find the highest fret to determine diagram offset
  const highestFret = Math.max(...positions.map(p => p.fret), 1);
  const startFret = highestFret > 4 ? highestFret - 3 : 1;

  // Check if there's a barre chord
  const barreChords = useMemo(() => {
    const frets: Record<number, number[]> = {};
    
    positions.forEach(pos => {
      if (pos.fret > 0) {
        if (!frets[pos.fret]) frets[pos.fret] = [];
        frets[pos.fret].push(pos.string);
      }
    });

    return Object.entries(frets)
      .filter(([fret, strings]) => strings.length >= 2)
      .map(([fret, strings]) => ({
        fret: parseInt(fret),
        minString: Math.min(...strings),
        maxString: Math.max(...strings)
      }));
  }, [positions]);

  return (
    <div className="guitar-chord-diagram">
      <div className="chord-name">{chordName}</div>
      <div className="fretboard">
        <div className="open-strings">
          {openStrings.map((marker, i) => (
            <div key={`open-${i}`} className="open-string">{marker}</div>
          ))}
        </div>
        <div className="muted-strings">
          {mutedStrings.map((marker, i) => (
            <div key={`mute-${i}`} className="muted-string">{marker}</div>
          ))}
        </div>
        
        {[...Array(5)].map((_, fretIndex) => {
          const fret = startFret + fretIndex;
          return (
            <div key={`fret-${fret}`} className="fret">
              {[...Array(6)].map((_, stringIndex) => {
                const string = 6 - stringIndex;
                const position = positions.find(p => p.string === string && p.fret === fret);
                const isRoot = position && position.fret > 0 && chordName.startsWith(chordName.split(' ')[0]);
                
                // Check if this position is part of a barre chord
                const barre = barreChords.find(b => b.fret === fret && string >= b.minString && string <= b.maxString);

                return (
                  <div key={`string-${string}`} className="string">
                    {position && position.fret > 0 && (
                      <div 
                        className={`finger-position ${isRoot ? 'root' : ''}`}
                        style={isRoot ? { backgroundColor: rootNoteColor } : {}}
                      >
                        {position.finger}
                      </div>
                    )}
                    {barre && string === barre.minString && (
                      <div 
                        className="barre" 
                        style={{
                          height: `${(barre.maxString - barre.minString) * 20}px`,
                          backgroundColor: rootNoteColor
                        }}
                      />
                    )}
                  </div>
                );
              })}
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
