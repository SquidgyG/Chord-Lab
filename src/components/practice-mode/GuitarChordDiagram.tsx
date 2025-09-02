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

  const fretboardStyle = {
    height: '700px',
    width: '520px',
    padding: '72px 28px 22px',
    position: 'relative' as const,
  };

  const stringStyle = {
    width: 'var(--sw, 2px)',
    background: 'var(--sc, #111)',
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    transform: 'translateX(-50%)',
    borderRadius: '2px',
    zIndex: 8,
  };

  const nutStyle = {
    height: '16px',
    background: '#000',
  };

  const fretLineStyle = {
    height: '2px',
    background: '#111',
  };

  const fingerMarkerStyle = {
    width: '72px',
    height: '72px',
    fontSize: '30px',
  };

  const xoIndicatorStyle = {
    fontSize: '38px',
    fontWeight: 800,
  };

  return (
    <div className="guitar-chord-diagram">
      <div className="chord-name">{chordName}</div>
      <div className="fretboard" style={fretboardStyle}>
        {/* Nut */}
        <div className="nut" style={nutStyle} />
        
        {/* Fret lines */}
        {[1, 2, 3, 4, 5].map((fret) => (
          <div 
            key={`fret-line-${fret}`}
            className="fret-line"
            style={{
              top: `${fret * 70}px`,
              ...fretLineStyle
            }}
          />
        ))}
        
        {/* Strings */}
        {[6, 5, 4, 3, 2, 1].map((string, index) => {
          const position = positions.find(p => p.string === string);
          const isRoot = position && chordName.startsWith(chordName.split(' ')[0]);
          const barre = barreChords.find(b => string >= b.minString && string <= b.maxString);
          const xo = position && position.fret === 0 ? 'X' : 'O';
          const chordColor = isRoot ? rootColor : color;
          
          return (
            <div 
              key={`string-${string}`}
              className="string"
              style={{
                left: `${15 + (index * 18)}%`,
                ...stringStyle,
                '--sw': '3px',
                '--sc': color
              } as React.CSSProperties}
            >
              {position && position.fret > 0 && (
                <div 
                  className="fret-position"
                  style={{
                    top: `${(position.fret - 0.5) * 70}px`,
                    ...fingerMarkerStyle,
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
              <div 
                className="xo" 
                style={{
                  ...xoIndicatorStyle,
                  left: `calc((100%/6)*${index} + (100%/6)/2)`,
                  color: chordColor
                }}
              >
                {xo}
              </div>
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
