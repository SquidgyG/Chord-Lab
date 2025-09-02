import React, { useMemo } from 'react';
import './GuitarChordDiagram.css';

interface FingerPosition {
  fret: number;
  string: number;
  finger?: number;
}

interface GuitarChordDiagramProps {
  positions: FingerPosition[];
  chordName: string;
  rootNoteColor?: string;
  color?: string;
}

interface BarreChord {
  fret: number;
  minString: number;
  maxString: number;
}

const GuitarChordDiagram: React.FC<GuitarChordDiagramProps> = ({ 
  positions, 
  chordName, 
  rootNoteColor = '#ff6b6b',
  color = rootNoteColor
}) => {
  const rootColor = color || rootNoteColor;
  
  // Find the highest fret to determine diagram offset
  const highestFret = Math.max(...positions.map(p => p.fret), 1);
  const startFret = highestFret > 4 ? highestFret - 3 : 1;

  // Check if there's a barre chord
  const barreChords = useMemo<BarreChord[]>(() => {
    const frets: Record<number, number[]> = {};
    
    positions.forEach(pos => {
      if (pos.fret > 0) {
        if (!frets[pos.fret]) frets[pos.fret] = [];
        frets[pos.fret].push(pos.string);
      }
    });

    return Object.entries(frets)
      .filter(([, strings]) => strings.length >= 2)
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
        {/* Nut */}
        <div className="nut" />
        
        {/* Fret lines */}
        {[1, 2, 3, 4, 5].map((fret) => (
          <div 
            key={`fret-line-${fret}`}
            className="fret-line"
            style={{
              top: `${fret * 60}px`,
              width: '100%'
            }}
          />
        ))}
        
        {/* Strings */}
        {[0, 1, 2, 3, 4, 5].map((stringIndex) => {
          const string = 6 - stringIndex;
          const position = positions.find(p => p.string === string);
          const isRoot = position && chordName.startsWith(chordName.split(' ')[0]);
          const barre = barreChords.find(b => string >= b.minString && string <= b.maxString);
          
          return (
            <div 
              key={`string-${string}`}
              className="string"
              style={{
                left: `${20 + (stringIndex * 20)}%`,
                '--cc': color
              } as React.CSSProperties}
            >
              {position && (
                <div 
                  className="fret-position"
                  style={{
                    top: `${(position.fret - 0.5) * 60}px`,
                    backgroundColor: isRoot ? rootColor : ''
                  }}
                >
                  {position.finger}
                </div>
              )}
              {barre && string === barre.minString && (
                <div 
                  className="barre"
                  style={{
                    top: `${(barre.fret - 0.5) * 60}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${(barre.maxString - barre.minString) * 20}%`,
                    '--cc': color
                  } as React.CSSProperties}
                />
              )}
            </div>
          );
        })}
        
        {/* Note strip */}
        <div className="note-strip">
          {['E', 'A', 'D', 'G', 'B', 'E'].map((note, i) => (
            <span key={`note-${i}`}>
              {positions.some(p => p.string === 6 - i) ? '' : note}
            </span>
          ))}
        </div>
      </div>
      {startFret > 1 && (
        <div className="fret-number">
          {startFret}fr
        </div>
      )}
    </div>
  );
};

export default GuitarChordDiagram;
