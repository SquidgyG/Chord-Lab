import React, { useMemo } from 'react';
import './GuitarChordDiagram.css';

export interface GuitarPosition {
  string: number;
  fret: number;
  finger: number;
  isRoot?: boolean;
}

interface GuitarChordDiagramProps {
  positions: GuitarPosition[];
  color?: string;
  noteLabels?: string[];
}

const GuitarChordDiagram: React.FC<GuitarChordDiagramProps> = ({ positions, color = '#000', noteLabels = [] }) => {
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
    const strings = Array<string>(6).fill('');
    positions.forEach(pos => {
      if (pos.fret === 0) {
        strings[6 - pos.string] = 'O';
      }
    });
    return strings;
  }, [positions]);

  const mutedStrings = useMemo(() => {
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
        <div className="nut" />
        <div className="endline" />

        {[1, 2, 3, 4, 5].map(fret => (
          <div
            key={fret}
            className="fret-line"
            style={{ top: `calc((100%/6)*${fret})` }}
          />
        ))}

        {[2.5, 4.5].map((fret, idx) => (
          <div
            key={`inlay-${idx}`}
            className="inlay"
            style={{ top: `calc((100%/6)*${fret})` }}
          />
        ))}

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="string"
            style={{
              left: `calc((100%/6)*${i} + (100%/12))`,
              '--sw': `${[18, 12, 8, 6, 4, 3][i]}px`,
              '--sc': ['#bfbfbf', '#111', '#111', '#111', '#111', '#111'][i],
            } as React.CSSProperties}
          />
        ))}

        {barreChords.map((barre, idx) => (
          <div
            key={idx}
            className="barre"
            style={{
              top: `calc((100%/6)*${barre.fret - 0.5})`,
              left: `calc((100%/6)*${6 - barre.endString})`,
              width: `calc((100%/6)*${barre.endString - barre.startString + 1})`,
              '--cc': color,
            } as React.CSSProperties}
          >
            {1}
          </div>
        ))}

        {positions
          .filter(p => p.fret > 0)
          .map((pos, idx) => (
            <div
              key={idx}
              className={`dot ${pos.isRoot ? 'root' : ''}`}
              style={{
                top: `calc((100%/6)*${pos.fret - 0.5})`,
                left: `calc((100%/6)*${6 - pos.string} + (100%/12))`,
                '--cc': color,
              } as React.CSSProperties}
            >
              {pos.finger}
            </div>
          ))}

        {openStrings.map((open, i) => (
          open && (
            <div
              key={`open-${i}`}
              className="xo"
              style={{
                left: `calc((100%/6)*${i} + (100%/12))`,
                color,
              }}
            >
              {open}
            </div>
          )
        ))}
        {mutedStrings.map((muted, i) => (
          muted && (
            <div
              key={`muted-${i}`}
              className="xo"
              style={{
                left: `calc((100%/6)*${i} + (100%/12))`,
                color,
              }}
            >
              {muted}
            </div>
          )
        ))}
      </div>
      {noteLabels.length > 0 && (
        <div className="note-strip">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ color }}>
              {noteLabels[i] || ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuitarChordDiagram;
