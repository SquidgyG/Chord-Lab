import { getChordTheme } from '../../utils/diagramTheme';
import React, { useState } from 'react';

// --- Interfaces ---
interface FretPosition {
  string: number; // 1-6 (low E to high E)
  fret: number;   // 0-12 (0 = open string)
  finger?: number; // Optional finger number
}

interface Barre {
  fret: number;
  startString: number;
  endString: number;
  finger?: number;
}

interface GuitarDiagramProps {
  chordName: string;
  positions: FretPosition[];
  noteStrip?: (string | null)[];
  barres?: Barre[];
  onPlayNote?: (string: number, fret: number) => void;
}

// --- Helper Components from 'main' ---
const Sheet = ({ theme, children }: { theme: any; children: React.ReactNode }) => (
  <section
    className="sheet"
    style={{
      padding: '26px',
      border: '16px solid',
      borderColor: theme.primary,
      backgroundColor: theme.background,
      borderRadius: '22px',
      boxShadow: '0 10px 28px rgba(0,0,0,.12)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Readex Pro", system-ui, sans-serif',
    }}
  >
    {children}
  </section>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      textAlign: 'center',
      fontSize: '42px',
      fontWeight: 800,
      margin: '0 0 22px',
      letterSpacing: '.3px',
      color: '#111',
    }}
  >
    {children}
  </h1>
);

const FretboardWrap = ({ children }: { children: React.ReactNode }) => (
  <div
    className="fretboard-wrap"
    style={{
      width: '520px',
      maxWidth: '100%',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '14px',
      padding: '72px 28px 22px',
      boxShadow: '0 16px 40px rgba(0,0,0,.20), 0 8px 18px rgba(0,0,0,.12)',
      position: 'relative',
    }}
  >
    {children}
  </div>
);

// --- New Sub-component for Interactive String ---
const InteractiveString = ({ stringNum, positions, onPlayNote, style, muted }: any) => {
  const [vibrating, setVibrating] = useState(false);

  const handleStringClick = () => {
    if (!onPlayNote) return;

    const position = positions.find((p: FretPosition) => p.string === stringNum);
    const fret = position ? position.fret : 0; // Default to open string if not specified
    onPlayNote(stringNum, fret);

    setVibrating(true);
    setTimeout(() => setVibrating(false), 500);
  };

  return (
    <div
      className={`string ${vibrating ? 'vibrating' : ''}`}
      style={{
        ...style,
        background: muted ? '#bfbfbf' : '#111',
        cursor: onPlayNote ? 'pointer' : 'default',
      }}
      onClick={handleStringClick}
    />
  );
};


// --- Main Merged Component ---
const GuitarDiagram = ({ chordName, positions, noteStrip, barres = [], onPlayNote }: GuitarDiagramProps) => {
  const theme = getChordTheme(chordName);

  const TOTAL_STRINGS = 6;
  const TOTAL_FRETS = 5; // Number of visible frets

  // Find the minimum and maximum frets to determine the fret window (from 'main')
  const allFrets = positions.filter(p => p.fret > 0).map(p => p.fret);
  const minFret = allFrets.length > 0 ? Math.min(...allFrets) : 1;
  const maxFret = allFrets.length > 0 ? Math.max(...allFrets) : TOTAL_FRETS;

  // Determine the starting fret for the diagram (from 'main')
  let startFret = 1;
  if (maxFret > TOTAL_FRETS) {
    startFret = minFret;
  }

  const isOpen = (stringNum: number) => positions.some(p => p.string === stringNum && p.fret === 0);
  const isMuted = (stringNum: number) => !positions.some(p => p.string === stringNum) && !barres.some(b => stringNum >= b.startString && stringNum <= b.endString);

  // Layout helpers (from 'main')
  const stringPos = (stringNum: number) => `calc((100% / ${TOTAL_STRINGS - 1}) * ${stringNum - 1})`;
  const fretPos = (fretNum: number) => `calc((100% / ${TOTAL_FRETS}) * ${fretNum - startFret + 0.5})`;

  // String thicknesses (from 'main')
  const stringWidths = [18, 12, 8, 6, 4, 3];

  return (
    <Sheet theme={theme}>
      <Title>{chordName}</Title>
      <FretboardWrap>
        <div
          className="fretboard"
          style={{ position: 'relative', height: '700px' }}
        >
          {/* Nut or Fret Number Indicator (from 'main') */}
          {startFret > 1 ? (
             <div style={{ position: 'absolute', top: '-20px', left: '-40px', fontSize: '24px', fontWeight: 600, color: '#666' }}>
               {startFret}fr
             </div>
           ) : (
             <div className="nut" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16px', background: '#000', zIndex: 12 }} />
           )}

          {/* Fret Lines (from 'main') */}
          {Array.from({ length: TOTAL_FRETS + 1 }).map((_, i) => (
            <div key={`fret-${i}`} className="fret-line" style={{ position: 'absolute', left: 0, right: 0, height: i === 0 ? '0' : '2px', background: '#111', top: `calc((100% / ${TOTAL_FRETS}) * ${i})`, zIndex: 10 }} />
          ))}
          <div className="endline" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#000', zIndex: 11 }} />
          
          {/* Inlays (from 'main') */}
          {[3, 5, 7, 9].map(fret => {
             const displayFret = fret - startFret + 1;
             if (displayFret > 0 && displayFret <= TOTAL_FRETS) {
                 return <div key={`inlay-${fret}`} className="inlay" style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', borderRadius: '999px', background: 'rgba(0,0,0,.12)', zIndex: 9, top: `calc((100% / ${TOTAL_FRETS}) * ${displayFret - 0.5})` }} />
             }
             return null;
          })}

          {/* Strings (Merged) */}
          {Array.from({ length: TOTAL_STRINGS }).map((_, i) => {
            const stringNum = i + 1;
            return (
              <InteractiveString
                key={`string-${stringNum}`}
                stringNum={stringNum}
                positions={positions}
                onPlayNote={onPlayNote}
                muted={isMuted(stringNum)}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: `${stringWidths[i] / 2}px`,
                  transform: 'translateX(-50%)',
                  left: stringPos(stringNum),
                  zIndex: 8,
                }}
              />
            );
          })}

          {/* XO Indicators (from 'main') */}
          {Array.from({ length: TOTAL_STRINGS }).map((_, i) => {
            const stringNum = i + 1;
            const indicator = isOpen(stringNum) ? 'O' : isMuted(stringNum) ? 'X' : null;
            if (!indicator) return null;

            return (
              <div key={`xo-${stringNum}`} className="xo" style={{
                position: 'absolute',
                transform: 'translate(-50%, -100%)',
                textAlign: 'center',
                fontWeight: 800,
                top: 0,
                paddingBottom: '10px',
                zIndex: 15,
                fontSize: '32px',
                lineHeight: 1,
                color: theme.primary,
                left: stringPos(stringNum),
              }}>
                {indicator}
              </div>
            );
          })}

          {/* Barres (from 'main') */}
          {barres.map((barre, i) => (
            <div key={`barre-${i}`} className="barre" style={{
              position: 'absolute',
              transform: 'translateY(-50%)',
              height: '48px',
              borderRadius: '999px',
              background: theme.primary,
              color: '#fff',
              zIndex: 19,
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '24px',
              textShadow: '0 1px 0 rgba(0,0,0,.25)',
              left: stringPos(barre.startString),
              width: `calc(${stringPos(barre.endString)} - ${stringPos(barre.startString)})`,
              top: fretPos(barre.fret),
            }}>
              {barre.finger}
            </div>
          ))}

          {/* Dots (from 'main') */}
          {positions.filter(p => p.fret > 0).map((pos, i) => (
            <div key={`dot-${i}`} className="dot" style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: '72px',
              height: '72px',
              borderRadius: '999px',
              background: theme.primary,
              color: '#fff',
              zIndex: 20,
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '30px',
              textShadow: '0 1px 0 rgba(0,0,0,.25)',
              left: stringPos(pos.string),
              top: fretPos(pos.fret),
            }}>
              {pos.finger}
            </div>
          ))}
        </div>

        {/* Note Strip (from 'main') */}
        {noteStrip && (
          <div className="note-strip" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${TOTAL_STRINGS}, 1fr)`,
            gap: 0,
            marginTop: '12px',
            fontWeight: 800,
            fontSize: '32px',
            letterSpacing: '.5px',
          }}>
            {noteStrip.map((note, i) => (
              <span key={`note-${i}`} style={{ textAlign: 'center', minHeight: '1.1em', color: note ? theme.primary : 'transparent' }}>
                {note || ''}
              </span>
            ))}
          </div>
        )}
      </FretboardWrap>
    </Sheet>
  );
};

export default GuitarDiagram;