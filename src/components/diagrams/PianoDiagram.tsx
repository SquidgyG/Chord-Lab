import { useMemo, useState } from 'react';
import { getChordTheme } from '../../utils/diagramTheme';
import { getChordInversion, getNoteName } from '../../utils/music-theory';

// --- Static Data for Keyboard Layout (from 'main') ---
export const KEYBOARD_LAYOUT = {
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

// --- Interfaces (Merged) ---
interface PianoDiagramProps {
  chordName: string;
  notes: string[]; // Notes with octaves, e.g., ["C4", "E4", "G4"]
  inversion?: 0 | 1 | 2;
  showLabels?: boolean;
  onPlayNote?: (note: string) => void;
}

// --- Helper Components (from 'main') ---
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

// --- Main Component (Merged) ---
const PianoDiagram = ({
  chordName,
  notes,
  inversion = 0,
  showLabels = true,
  onPlayNote,
}: PianoDiagramProps) => {
  const theme = getChordTheme(chordName);
  const [userPressedKeys, setUserPressedKeys] = useState<Set<string>>(new Set());

  const invertedNotes = useMemo(
    () => getChordInversion(notes, inversion),
    [notes, inversion]
  );

  const handleKeyPress = (note: string) => {
    onPlayNote?.(note);
    setUserPressedKeys(prev => new Set(prev).add(note));
    setTimeout(() => {
      setUserPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    }, 300); // Visual feedback duration
  };

  const allKeys = [
    ...KEYBOARD_LAYOUT.whiteKeys.map(k => ({ ...k, type: 'white' as const })),
    ...KEYBOARD_LAYOUT.blackKeys.map(k => ({ ...k, type: 'black' as const })),
  ];

  // A key is considered "pressed" if it's in the chord or recently clicked by the user.
  const isNotePressed = (note: string) =>
    invertedNotes.includes(note) || userPressedKeys.has(note);

  const pressedKeysToDisplay = allKeys.filter(key => invertedNotes.includes(key.note));

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
            height: '180px',
            minWidth: '600px',
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
          {KEYBOARD_LAYOUT.whiteKeys.map(({ note }) => (
            <div
              key={note}
              className="white"
              style={{
                position: 'relative',
                background: isNotePressed(note) ? theme.background : '#fff',
                zIndex: 1,
                cursor: onPlayNote ? 'pointer' : 'default',
                transition: 'background 0.1s ease-in-out',
              }}
              onClick={() => handleKeyPress(note)}
            ></div>
          ))}

          {/* Black Keys */}
          {KEYBOARD_LAYOUT.blackKeys.map(({ note, position }) => (
            <div
              key={note}
              className="black"
              style={{
                position: 'absolute',
                top: 0,
                width: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * 0.6)`,
                height: '60%',
                background: isNotePressed(note) ? theme.primary : '#000',
                border: '1px solid #111',
                borderBottomLeftRadius: '6px',
                borderBottomRightRadius: '6px',
                boxShadow: 'inset 0 -5px 0 rgba(255,255,255,.08)',
                zIndex: 5,
                left: `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${position} - (100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .3))`,
                cursor: onPlayNote ? 'pointer' : 'default',
                transition: 'background 0.1s ease-in-out',
              }}
              onClick={() => handleKeyPress(note)}
            ></div>
          ))}

          {/* Note Labels */}
          {showLabels && pressedKeysToDisplay.map(({ note, type }) => {
            const noteName = getNoteName(note);
            const style: React.CSSProperties = {
              position: 'absolute',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '999px',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '20px',
              background: '#fff',
              border: '3px solid #000',
              color: '#000',
              textShadow: 'none',
              zIndex: 7,
              pointerEvents: 'none',
            };

            if (type === 'white') {
              const keyInfo = KEYBOARD_LAYOUT.whiteKeys.find(k => k.note === note);
              if (!keyInfo) return null;
              style.bottom = '18px';
              style.left = `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${keyInfo.position} + 100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * .5)`;
            } else { // black
              const keyInfo = KEYBOARD_LAYOUT.blackKeys.find(k => k.note === note);
              if (!keyInfo) return null;
              style.top = `calc(60% - 10px - 43px)`; // Position above the key
              style.left = `calc(100% / ${KEYBOARD_LAYOUT.totalWhiteKeys} * ${keyInfo.position})`;
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