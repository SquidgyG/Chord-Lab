import { useMemo } from 'react';
import { getChordTheme } from '../../utils/diagramTheme';
import { getChordInversion, getNoteName } from '../../utils/music-theory';

// --- Static Data for Keyboard Layout ---
// This layout matches the printable chart, which shows 11 white keys.
// The range seems to be from F4 to B5.
const KEYBOARD_LAYOUT = {
  whiteKeys: [
    { note: 'F4', position: 0 }, { note: 'G4', position: 1 }, { note: 'A4', position: 2 },
    { note: 'B4', position: 3 }, { note: 'C5', position: 4 }, { note: 'D5', position: 5 },
    { note: 'E5', position: 6 }, { note: 'F5', position: 7 }, { note: 'G5', position: 8 },
    { note: 'A5', position: 9 }, { note: 'B5', position: 10 }
  ],
  blackKeys: [
    { note: 'F#4', position: 1 }, { note: 'G#4', position: 2 }, { note: 'A#4', position: 3 },
    { note: 'C#5', position: 5 }, { note: 'D#5', position: 6 }, { note: 'F#5', position: 8 },
    { note: 'G#5', position: 9 }, { note: 'A#5', position: 10 }
  ],
  totalWhiteKeys: 11,
};

// --- Interfaces ---
interface PianoDiagramProps {
  chordName: string;
  notes: string[]; // Notes with octaves, e.g., ["C4", "E4", "G4"]
  inversion?: 0 | 1 | 2;
}

// --- Helper Components ---
// These are styled to match the printable chart's CSS.

const Sheet = ({ theme, children }: { theme: any; children: React.ReactNode }) => (
  <section
    className="sheet"
    style={{
      padding: '26px',
      border: '16px solid',
      borderColor: theme.primary,
      backgroundColor: theme.background,
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
      fontSize: '46px',
      fontWeight: 800,
      margin: '0 0 20px',
      letterSpacing: '.4px',
      zIndex: 1,
      position: 'relative',
    }}
  >
    {children}
  </h1>
);

const KeyboardWrap = ({ children }: { children: React.ReactNode }) => (
  <div
    className="keyboard-wrap"
    style={{
      position: 'relative',
      zIndex: 1,
      padding: '18px',
      borderRadius: '14px',
      background: '#fff',
      boxShadow: '0 16px 40px rgba(0,0,0,.20), 0 8px 18px rgba(0,0,0,.12)',
    }}
  >
    {children}
  </div>
);

// --- Main Component ---
const PianoDiagram = ({ chordName, notes, inversion = 0 }: PianoDiagramProps) => {
  const theme = getChordTheme(chordName);

  const invertedNotes = useMemo(
    () => getChordInversion(notes, inversion),
    [notes, inversion]
  );

  // Normalize notes to match the layout's format (e.g., C not C4)
  const pressedNoteNames = new Set(invertedNotes.map(note => getNoteName(note)));

  const allKeys = [
    ...KEYBOARD_LAYOUT.whiteKeys.map(k => ({ ...k, type: 'white' as const })),
    ...KEYBOARD_LAYOUT.blackKeys.map(k => ({ ...k, type: 'black' as const })),
  ];

  const pressedKeys = allKeys.filter(key => pressedNoteNames.has(getNoteName(key.note)));

  return (
    <Sheet theme={theme}>
      <Title>{chordName}</Title>
      <KeyboardWrap>
        <div
          className="keyboard"
          role="img"
          aria-label={`${chordName} chord chart`}
          style={{
            position: 'relative',
            border: '2px solid #111',
            height: '370px',
            display: 'grid',
            gridTemplateColumns: `repeat(${KEYBOARD_LAYOUT.totalWhiteKeys}, 1fr)`,
            gap: 0,
            overflow: 'hidden',
            background: '#ffffff',
            borderRadius: '10px',
          }}
        >
          {/* Keyboard background with vertical lines */}
          <div style={{
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background: `repeating-linear-gradient(to right, rgba(0,0,0,.68) 0 2px, transparent 2px calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys}))`
          }}></div>

          {/* White Keys */}
          {KEYBOARD_LAYOUT.whiteKeys.map(({ note, position }) => (
            <div key={note} className="white" style={{ position: 'relative', background: '#fff', zIndex: 1 }}></div>
          ))}

          {/* Black Keys */}
          {KEYBOARD_LAYOUT.blackKeys.map(({ note, position }) => (
            <div
              key={note}
              className="black"
              style={{
                position: 'absolute',
                top: 0,
                width: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .64)`,
                height: '62%',
                background: '#000',
                border: '1px solid #111',
                borderBottomLeftRadius: '6px',
                borderBottomRightRadius: '6px',
                boxShadow: 'inset 0 -5px 0 rgba(255,255,255,.08)',
                zIndex: 5,
                left: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${position} - (100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .32))`,
              }}
            ></div>
          ))}

          {/* Fills for Pressed Keys */}
          {pressedKeys.map(({ note, type, position }) => {
            if (type === 'white') {
              const whiteKeyInfo = KEYBOARD_LAYOUT.whiteKeys.find(k => getNoteName(k.note) === getNoteName(note));
              if (!whiteKeyInfo) return null;
              return (
                <div
                  key={`fill-${note}`}
                  className="fill fill-white"
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    top: 0,
                    height: '100%',
                    zIndex: 3,
                    boxShadow: 'inset 0 0 0 2px #000',
                    background: theme.primary,
                    left: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${whiteKeyInfo.position})`,
                    width: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys})`,
                  }}
                ></div>
              );
            } else { // black
              const blackKeyInfo = KEYBOARD_LAYOUT.blackKeys.find(k => getNoteName(k.note) === getNoteName(note));
              if (!blackKeyInfo) return null;
              return (
                <div
                  key={`fill-${note}`}
                  className="fill fill-black"
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    top: 0,
                    height: '62%',
                    zIndex: 6,
                    boxShadow: 'inset 0 0 0 2px #000',
                    background: theme.primary,
                    width: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .64)`,
                    left: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${blackKeyInfo.position} - (100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .32))`,
                  }}
                ></div>
              );
            }
          })}

          {/* Note Labels */}
          {pressedKeys.map(({ note, type, position }) => {
            const noteName = getNoteName(note);
            const style: React.CSSProperties = {
              position: 'absolute',
              transform: 'translateX(-50%)',
              width: '86px',
              height: '86px',
              borderRadius: '999px',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '30px',
              background: '#fff',
              border: '4px solid #000',
              color: '#000',
              textShadow: 'none',
              zIndex: 7,
            };

            if (type === 'white') {
              const whiteKeyInfo = KEYBOARD_LAYOUT.whiteKeys.find(k => getNoteName(k.note) === getNoteName(note));
              if (!whiteKeyInfo) return null;
              style.bottom = '18px';
              style.left = `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${whiteKeyInfo.position} + 100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .5)`;
            } else { // black
              const blackKeyInfo = KEYBOARD_LAYOUT.blackKeys.find(k => getNoteName(k.note) === getNoteName(note));
              if (!blackKeyInfo) return null;
              style.top = `calc(62% - 10px - 43px)`;
              style.left = `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${blackKeyInfo.position})`;
            }

            return (
              <div key={`note-${note}`} className={`note ${type}`} style={style}>
                {noteName}
              </div>
            );
          })}
        </div>
      </KeyboardWrap>
    </Sheet>
  );
};

export default PianoDiagram;
