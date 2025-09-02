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
      .filter(([, strings]) => strings.length >= 3) // Require at least 3 strings for barre
      .map(([fret, strings]) => ({
        fret: parseInt(fret),
        minString: Math.min(...strings),
        maxString: Math.max(...strings)
      }));
  }, [positions]);

  // String widths from thickest (low E) to thinnest (high E)
  const stringWidths = ['18px', '12px', '8px', '6px', '4px', '3px'];
  
  // Get X/O status for each string (1-6, where 6 is low E)
  const getStringStatus = (stringNum: number) => {
    const position = positions.find(p => p.string === stringNum);
    if (!position) return 'X'; // Muted if no position defined
    return position.fret === 0 ? 'O' : null; // Open if fret 0, otherwise null (fretted)
  };

  return (
    <div className="fretboard-wrap">
      <div className="fretboard">
        {/* Nut */}
        <div className="nut"></div>
        <div className="endline"></div>
        
        {/* Fret lines */}
        {[1, 2, 3, 4, 5].map((fret) => (
          <div 
            key={`fret-line-${fret}`}
            className="fret-line"
            style={{
              top: `calc((100%/6)*${fret})`
            }}
          />
        ))}
        
        {/* Inlays at 3rd and 5th frets */}
        <div className="inlay" style={{ top: 'calc((100%/6)*2.5)' }}></div>
        <div className="inlay" style={{ top: 'calc((100%/6)*4.5)' }}></div>
        
        {/* Strings */}
        {[6, 5, 4, 3, 2, 1].map((string, index) => {
          const position = positions.find(p => p.string === string);
          const stringWidth = stringWidths[string - 1]; // string-1 because array is 0-indexed
          const stringColor = position ? '#111' : '#bfbfbf'; // Active vs muted string color
          
          return (
            <div 
              key={`string-${string}`}
              className="string"
              style={{
                left: `calc((100%/6)*${index} + (100%/6)/2)`,
                '--sw': stringWidth,
                '--sc': stringColor
              } as React.CSSProperties}
            />
          );
        })}
        
        {/* X/O Indicators */}
        {[6, 5, 4, 3, 2, 1].map((string, index) => {
          const status = getStringStatus(string);
          if (!status) return null;
          
          return (
            <div 
              key={`xo-${string}`}
              className="xo"
              style={{
                left: `calc((100%/6)*${index} + (100%/6)/2)`,
                color: rootColor
              }}
            >
              {status}
            </div>
          );
        })}
        
        {/* Barre chords */}
        {barreChords.map((barre, idx) => (
          <div 
            key={`barre-${idx}`}
            className="barre"
            style={{
              left: `calc((100%/6)*${6 - barre.maxString} + (100%/6)*0.12)`,
              width: `calc((100%/6)*${barre.maxString - barre.minString + 1} + (100%/6)*0.76)`,
              top: `calc((100%/6)*${barre.fret - 0.5})`,
              '--cc': rootColor
            } as React.CSSProperties}
          >
            1
          </div>
        ))}
        
        {/* Finger positions */}
        {positions.filter(p => p.fret > 0).map((pos, idx) => {
          // Skip if this position is part of a barre chord
          const isBarrePosition = barreChords.some(b => 
            pos.fret === b.fret && pos.string >= b.minString && pos.string <= b.maxString
          );
          if (isBarrePosition) return null;
          
          return (
            <div 
              key={`dot-${idx}`}
              className="dot"
              style={{
                left: `calc((100%/6)*${6 - pos.string} + (100%/6)/2)`,
                top: `calc((100%/6)*${pos.fret - 0.5})`,
                '--cc': rootColor
              } as React.CSSProperties}
            >
              {pos.finger || ''}
            </div>
          );
        })}
      </div>
      
      {/* Note strip */}
      <div className="note-strip">
        {[6, 5, 4, 3, 2, 1].map((string) => {
          const position = positions.find(p => p.string === string);
          const stringNotes = ['E', 'A', 'D', 'G', 'B', 'E'];
          const note = stringNotes[6 - string];
          
          return (
            <span 
              key={`note-${string}`} 
              style={{ color: position ? rootColor : 'transparent' }}
            >
              {position && position.fret === 0 ? note : ''}
            </span>
          );
        })}
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
