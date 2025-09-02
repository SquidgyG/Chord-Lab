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
      <div className="fretboard" style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        margin: '0 auto',
        padding: '20px 0'
      }}>
        {/* Nut */}
        <div className="nut" style={{ height: '8px' }} />
        
        {/* Fret lines */}
        {[1, 2, 3, 4, 5].map((fret) => (
          <div 
            key={`fret-line-${fret}`}
            className="fret-line"
            style={{
              top: `${fret * 70}px`,
              height: '3px',
              width: '100%'
            }}
          />
        ))}
        
        {/* Strings */}
        {[6, 5, 4, 3, 2, 1].map((string, index) => {
          const position = positions.find(p => p.string === string);
          const isRoot = position && chordName.startsWith(chordName.split(' ')[0]);
          const barre = barreChords.find(b => string >= b.minString && string <= b.maxString);
          
          return (
            <div 
              key={`string-${string}`}
              className="string"
              style={{
                left: `${15 + (index * 18)}%`,
                width: '3px',
                '--cc': color
              } as React.CSSProperties}
            >
              {position && position.fret > 0 && (
                <div 
                  className="fret-position"
                  style={{
                    top: `${(position.fret - 0.5) * 70}px`,
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    fontSize: '16px',
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
                    top: `${(barre.fret - 0.5) * 70}px`,
                    left: `${15 + (6 - barre.maxString) * 18}%`,
                    width: `${(barre.maxString - barre.minString) * 18}%`,
                    '--cc': color
                  } as React.CSSProperties}
                />
              )}
            </div>
          );
        })}
        
        {/* Note strip - shows open string notes from low E (6th) to high E (1st) */}
        <div className="note-strip">
          {['E', 'A', 'D', 'G', 'B', 'E'].map((note, i) => {
            const stringNumber = 6 - i;
            const hasFinger = positions.some(p => p.string === stringNumber);
            return (
              <span key={`note-${stringNumber}`}>
                {hasFinger ? '' : note}
              </span>
            );
          })}
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
