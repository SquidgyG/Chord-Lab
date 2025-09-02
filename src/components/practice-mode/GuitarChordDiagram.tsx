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

  // String widths from thinnest (high E, string 1) to thickest (low E, string 6)
  const stringWidths = ['3px', '4px', '6px', '8px', '12px', '18px']; // Index 0 = string 1, Index 5 = string 6
  
  // Get X/O status for each string (1-6, where 6 is low E)
  const getStringStatus = (stringNum: number) => {
    const position = positions.find(p => p.string === stringNum);
    if (!position) return 'X'; // Muted if no position defined
    return position.fret === 0 ? 'O' : null; // Open if fret 0, otherwise null (fretted)
  };
  
  // Add chord name display
  const displayChordName = chordName || 'Unknown';

  return (
    <div className="fretboard-wrap">
      <h3 className="chord-title" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold', color: rootColor }}>
        {displayChordName}
      </h3>
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
        
        {/* Strings - from left to right: 6, 5, 4, 3, 2, 1 */}
        {[6, 5, 4, 3, 2, 1].map((string, index) => {
          const position = positions.find(p => p.string === string);
          const stringWidth = stringWidths[string - 1]; // Use direct string index
          const stringColor = position ? '#111' : '#bfbfbf'; // Active vs muted string color
          
          return (
            <div 
              key={`string-${string}`}
              className="string"
              style={{
                left: `calc((100%/6)*${index} + (100%/6)/2)`, // Position 0-5 from left to right
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
                left: `calc((100%/6)*${index} + (100%/6)/2)`, // Match string positioning
                color: rootColor
              }}
            >
              {status}
            </div>
          );
        })}
        
        {/* Barre chords */}
        {barreChords.map((barre, idx) => {
          // Convert string numbers to position indices
          const minIndex = 6 - barre.maxString; // Left-most position
          const maxIndex = 6 - barre.minString; // Right-most position
          
          return (
            <div 
              key={`barre-${idx}`}
              className="barre"
              style={{
                left: `calc((100%/6)*${minIndex} + (100%/6)*0.12)`,
                width: `calc((100%/6)*${maxIndex - minIndex + 1} + (100%/6)*0.76)`,
                top: `calc((100%/6)*${barre.fret - 0.5})`,
                '--cc': rootColor
              } as React.CSSProperties}
            >
              1
            </div>
          );
        })}
        
        {/* Finger positions */}
        {positions.filter(p => p.fret > 0).map((pos, idx) => {
          // Skip if this position is part of a barre chord
          const isBarrePosition = barreChords.some(b => 
            pos.fret === b.fret && pos.string >= b.minString && pos.string <= b.maxString
          );
          if (isBarrePosition) return null;
          
          // Convert string number to position index (string 6=index 0, string 1=index 5)
          const positionIndex = 6 - pos.string;
          
          return (
            <div 
              key={`dot-${idx}`}
              className="dot"
              style={{
                left: `calc((100%/6)*${positionIndex} + (100%/6)/2)`,
                top: `calc((100%/6)*${pos.fret - 0.5})`,
                '--cc': rootColor
              } as React.CSSProperties}
            >
              {pos.finger || ''}
            </div>
          );
        })}
      </div>
      
      {/* Note strip - from left to right: E A D G B E (strings 6 5 4 3 2 1) */}
      <div className="note-strip">
        {['E', 'A', 'D', 'G', 'B', 'E'].map((note, index) => {
          const stringNumber = 6 - index; // Convert index to string number (0->6, 1->5, etc.)
          const position = positions.find(p => p.string === stringNumber);
          
          return (
            <span 
              key={`note-${stringNumber}`} 
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
