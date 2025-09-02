import { useMemo, useState } from 'react';
import { getChordTheme } from '../../utils/diagramTheme';
import { getChordInversion, getNoteName } from '../../utils/music-theory';
import type { ChordOption } from '../../types';

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
  chord: ChordOption;
  rootNoteColor?: string;
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

const PianoKeyMarker = ({ note, root, rootNoteColor }: { note: string; root: boolean; rootNoteColor?: string }) => {
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
    background: root ? rootNoteColor : '#3b82f6',
    border: '4px solid #000',
    color: '#000',
    textShadow: 'none',
    zIndex: 7,
    pointerEvents: 'none',
  };

  return (
    <div style={style}>
      {getNoteName(note)}
    </div>
  );
};

// --- Main Component (Merged) ---
const PianoDiagram: React.FC<PianoDiagramProps> = ({
  chord,
  rootNoteColor,
}) => {
  const theme = getChordTheme(chord.name);
  const [userPressedKeys, setUserPressedKeys] = useState<Set<string>>(new Set());

  const invertedNotes = useMemo(
    () => getChordInversion(chord.notes, 0),
    [chord.notes]
  );

  const handleKeyPress = (note: string) => {
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

  // Black key positioning calculation
  const getBlackKeyPosition = (index: number) => ({
    left: `calc(100%/11*${index} - (100%/11*.32))`
  });

  // Note positioning for white keys
  const getWhiteNotePosition = (index: number) => ({
    left: `calc(100%/11*${index} + 100%/11*.5)`
  });

  // Note positioning for black keys
  const getBlackNotePosition = (index: number) => ({
    left: `calc(100%/11*${index})`
  });

  return (
    <Sheet theme={theme}>
      <Title>{chord.name}</Title>
      <KeyboardWrap>
        <div
          className="keyboard"
          role="img"
          aria-label={`${chord.name} chord chart`}
          style={{
            position: 'relative',
            border: '2px solid #111',
            height: '370px',
            display: 'grid',
            gridTemplateColumns: 'repeat(11, 1fr)',
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
            <div
              key={note}
              className="white"
              style={{
                position: 'relative',
                background: isNotePressed(note) ? theme.background : '#fff',
                zIndex: 1,
                cursor: 'pointer',
                transition: 'background 0.1s ease-in-out',
                ...getWhiteNotePosition(position)
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
                width: 'calc(100%/11 * .64)',
                height: '62%',
                background: isNotePressed(note) ? theme.primary : '#000',
                border: '1px solid #111',
                borderBottomLeftRadius: '6px',
                borderBottomRightRadius: '6px',
                boxShadow: 'inset 0 -5px 0 rgba(255,255,255,.08)',
                zIndex: 5,
                ...getBlackKeyPosition(position),
                cursor: 'pointer',
                transition: 'background 0.1s ease-in-out',
              }}
              onClick={() => handleKeyPress(note)}
            ></div>
          ))}

          {/* Note Labels */}
          {pressedKeysToDisplay.map(({ note, type, position }) => {
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
              background: note === chord.notes[0] ? '#3b82f6' : '#3b82f6',
              border: '4px solid #000',
              color: '#000',
              textShadow: 'none',
              zIndex: 7,
              pointerEvents: 'none',
            };

            if (type === 'white') {
              style.bottom = '18px';
              style.left = `calc(100%/11 * ${position} + 100%/11 * .5)`;
            } else { // black
              style.top = `calc(62% - 10px - 43px)`; // Position above the key
              style.left = `calc(100%/11 * ${position})`;
            }

            return (
              <div key={`note-${note}`} className={`note ${type}`} style={style}>
                {noteName}
              </div>
            );
          })}
          {pressedKeysToDisplay.filter(key => key.type === 'black').map(({ note, position }) => (
            <div 
              key={`black-note-${note}`} 
              style={{
                position: 'absolute',
                transform: 'translateX(-50%)',
                fontSize: '14px',
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 2px 0 #000',
                zIndex: 7,
                pointerEvents: 'none',
                ...getBlackNotePosition(position)
              }}
            >
              {getNoteName(note)}
            </div>
          ))}
          {chord.notes.map((note) => (
            <PianoKeyMarker 
              key={note}
              note={note} 
              root={note === chord.notes[0]}
              rootNoteColor={rootNoteColor}
            />
          ))}
        </div>
      </KeyboardWrap>
    </Sheet>
  );
};

export default PianoDiagram;