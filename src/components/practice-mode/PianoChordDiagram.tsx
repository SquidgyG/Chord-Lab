import React from 'react';
import './PianoChordDiagram.css';
import { KEYBOARD_LAYOUT } from '../diagrams/PianoDiagram';
import { getMidiNumber, getNoteFromMidi, getNoteName } from '../../utils/music-theory';

interface PianoChordDiagramProps {
  notes: string[];
  chordName?: string;
  color?: string; // Hex color code
}

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({
  notes,
  chordName,
  color = '#cc39bc' // Default color
}) => {
  const normalizeNote = (note: string) => {
    const midi = getMidiNumber(note);
    const standardized = midi !== null ? getNoteFromMidi(midi) : note;
    return getNoteName(standardized);
  };
  const activeNotes = (notes || []).map(normalizeNote);

  const allKeys = [
    ...KEYBOARD_LAYOUT.whiteKeys.map(k => ({ ...k, type: 'white' as const, root: getNoteName(k.note) })),
    ...KEYBOARD_LAYOUT.blackKeys.map(k => ({ ...k, type: 'black' as const, root: getNoteName(k.note) })),
  ];

  // Calculate positions
  const whiteKeyWidth = 100 / KEYBOARD_LAYOUT.totalWhiteKeys;

  // For black keys: left = (position * whiteKeyWidth) - (whiteKeyWidth * 0.32)
  const getBlackKeyLeft = (position: number) => {
    return `calc(${position * whiteKeyWidth}% - ${whiteKeyWidth * 0.32}%)`;
  };

  // For fill overlays: left = (position * whiteKeyWidth)% for white keys
  const getFillLeft = (position: number, isBlack: boolean) => {
    if (isBlack) {
      return getBlackKeyLeft(position);
    }
    return `${position * whiteKeyWidth}%`;
  };

  // Update fill styles to use the color prop
  const fillStyle = {
    backgroundColor: color,
    border: `2px solid ${color}`
  };

  const keyboardWrapStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '360px'
  };

  return (
    <div className="piano-chart-container">
      {chordName && (
        <div className="chord-name-display">
          {chordName}
        </div>
      )}
      <div className="keyboard-wrap" style={keyboardWrapStyle}>
        <div
          className="keyboard"
          role="img"
          aria-label={`${chordName} chord`}
          style={{ gridTemplateColumns: `repeat(${KEYBOARD_LAYOUT.totalWhiteKeys}, 1fr)` }}
        >
          {KEYBOARD_LAYOUT.whiteKeys.map(({ note }) => {
            const isActive = activeNotes.includes(getNoteName(note));
            return (
              <div
                key={note}
                className={`white-key ${isActive ? 'active' : ''}`}
                aria-label={note}
              />
            );
          })}

          {KEYBOARD_LAYOUT.blackKeys.map(({ note, position }) => {
            const isActive = activeNotes.includes(getNoteName(note));
            return (
              <div
                key={note}
                className={`black-key ${isActive ? 'active' : ''}`}
                style={{
                  left: getBlackKeyLeft(position),
                  width: `${whiteKeyWidth * 0.64}%`,
                }}
                aria-label={note}
              />
            );
          })}

          {/* Fill overlays with dynamic color */}
          {activeNotes.map((note, index) => {
            const key = allKeys.find(k => k.root === note);
            if (!key) return null;

            const isBlack = key.type === 'black';

            return (
              <div
                key={`fill-${index}`}
                className={`fill ${isBlack ? 'fill-black' : 'fill-white'}`}
                style={{
                  ...fillStyle,
                  left: getFillLeft(key.position, isBlack),
                  width: isBlack
                    ? `${whiteKeyWidth * 0.64}%`
                    : `${whiteKeyWidth}%`,
                }}
              />
            );
          })}

          {/* Note indicators with chord color */}
          {activeNotes.map((note, index) => {
            const key = allKeys.find(k => k.root === note);
            if (!key) return null;

            const isBlack = key.type === 'black';

            return (
              <div
                key={`note-${index}`}
                className={`note ${isBlack ? 'black' : 'white'}`}
                style={{
                  borderColor: color,
                  boxShadow: `0 5px 10px ${color}`,
                  left: `${(key.position + 0.5) * whiteKeyWidth}%`,
                  top: isBlack ? 'calc(62% - 43px)' : 'calc(100% - 18px - 43px)',
                }}
              >
                {note}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PianoChordDiagram;
