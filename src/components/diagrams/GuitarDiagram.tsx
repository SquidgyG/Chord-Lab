import { useState } from 'react';
import { getChordTheme } from '../../utils/diagramTheme';

interface FretPosition {
  string: number;  // 1-6 (low E to high E)
  fret: number;    // 0-12 (0 = open string)
}

interface ChordDiagramProps {
  chordName: string;
  positions: FretPosition[];
  fingers?: number[];  // 1-4 for fretting fingers
  noteStrip?: string[]; // optional per-string note labels (low E -> high E)
}

const GuitarDiagram = ({ chordName, positions, fingers = [], noteStrip }: ChordDiagramProps) => {
  const [orientation, setOrientation] = useState<'normal' | 'left-handed' | 'player-mirrored'>('normal');
  const theme = getChordTheme(chordName);
  
  // Create a 6x5 grid (6 strings, 5 frets)
  const strings = 6;
  const frets = 5;
  
  // Find the minimum fret position to determine starting fret
  const minFret = positions.length ? Math.min(...positions.map(p => p.fret)) : 1;
  const startFret = minFret > 0 ? minFret : 1;
  
  // Check if a string is open (0 fret)
  const isOpen = (string: number) => {
    return positions.some(pos => pos.string === string && pos.fret === 0);
  };
  
  // Check if a string is muted (not in positions)
  const isMuted = (string: number) => {
    return !positions.some(pos => pos.string === string);
  };

  // Helpers for layout (match printable chart proportions)
  const colIndexForString = (stringNum: number) => {
    if (orientation === 'left-handed') return stringNum - 1; // low E at left
    // normal and player-mirrored: low E at right
    return strings - stringNum;
  };

  const leftForCol = (col: number) => `calc((100%/${strings})*${col} + (100%/${strings})/2)`;
  const topForFret = (fretNum: number) => `calc((100%/6) * ${(fretNum - startFret) + 0.5})`;

  // String thicknesses (low E to high E)
  const stringWidths = [18, 12, 8, 6, 4, 3];

  // Barre detection: find contiguous strings on same fret using the same finger (commonly 1)
  interface Barre {
    fret: number
    startString: number
    endString: number
    finger: number
  }
  const barreGroups: Barre[] = (() => {
    const groups: Barre[] = []
    // Map: fret -> list of {string, finger}
    const byFret = new Map<number, { string: number; finger: number }[]>()
    positions.forEach((pos, i) => {
      if (pos.fret > 0) {
        const arr = byFret.get(pos.fret) ?? []
        arr.push({ string: pos.string, finger: fingers[i] ?? 1 })
        byFret.set(pos.fret, arr)
      }
    })
    byFret.forEach((arr, fret) => {
      // sort by string number (low E=1 ... high E=6)
      const sorted = arr.sort((a, b) => a.string - b.string)
      let runStart = 0
      while (runStart < sorted.length) {
        let runEnd = runStart
        const finger = sorted[runStart].finger
        while (
          runEnd + 1 < sorted.length &&
          sorted[runEnd + 1].string === sorted[runEnd].string + 1 &&
          sorted[runEnd + 1].finger === finger
        ) {
          runEnd++
        }
        const span = runEnd - runStart + 1
        if (span >= 2) {
          groups.push({
            fret,
            startString: sorted[runStart].string,
            endString: sorted[runEnd].string,
            finger,
          })
        }
        runStart = runEnd + 1
      }
    })
    return groups
  })()

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"
      style={{ border: `4px solid ${theme.primary}`, background: '#fff' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-gray-900" style={{ letterSpacing: '.3px' }}>
          {chordName}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setOrientation('normal')}
            className={`px-2 py-1 text-xs rounded ${
              orientation === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setOrientation('left-handed')}
            className={`px-2 py-1 text-xs rounded ${
              orientation === 'left-handed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Left
          </button>
          <button
            onClick={() => setOrientation('player-mirrored')}
            className={`px-2 py-1 text-xs rounded ${
              orientation === 'player-mirrored' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Mirror
          </button>
        </div>
      </div>

      <div className="relative mx-auto" style={{ width: '280px', height: '360px' }}>
        {/* Fretboard area */}
        <div className="absolute inset-0" style={{ borderRadius: '10px', background: '#fff' }}>
          {/* Nut and end line */}
          {startFret === 1 && (
            <div
              className="absolute left-0 right-0"
              style={{ top: 0, height: '16px', background: '#000', zIndex: 12 }}
            />
          )}
          <div
            className="absolute left-0 right-0"
            style={{ bottom: 0, height: '6px', background: '#000', zIndex: 11 }}
          />

          {/* Fret lines (1..5) */}
          {Array.from({ length: frets }).map((_, i) => (
            <div
              key={`fret-${i + 1}`}
              className="absolute"
              style={{
                left: 0,
                right: 0,
                height: '2px',
                background: '#111',
                top: `calc((100%/6)*${i + 1})`,
                zIndex: 10,
              }}
            />
          ))}

          {/* Inlays at 2.5 and 4.5 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '16px',
              borderRadius: 999,
              background: 'rgba(0,0,0,.12)',
              top: 'calc((100%/6)*2.5)',
              zIndex: 9,
            }}
          />
          <div
            className="absolute"
            style={{
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '16px',
              borderRadius: 999,
              background: 'rgba(0,0,0,.12)',
              top: 'calc((100%/6)*4.5)',
              zIndex: 9,
            }}
          />

          {/* Strings (columns 0..5) */}
          {Array.from({ length: strings }).map((_, col) => {
            const stringNum = orientation === 'left-handed' ? col + 1 : strings - col
            const widthPx = stringWidths[stringNum - 1]
            return (
              <div
                key={`string-${col}`}
                className="absolute"
                style={{
                  top: 0,
                  bottom: 0,
                  width: `${widthPx}px`,
                  background: '#111',
                  transform: 'translateX(-50%)',
                  left: leftForCol(col),
                  borderRadius: '2px',
                  zIndex: 8,
                }}
              >
                {/* String label */}
                <div
                  className="absolute -top-6 text-xs font-medium text-gray-700"
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  {['E', 'A', 'D', 'G', 'B', 'E'][stringNum - 1]}
                </div>

                {/* XO indicators at top (only if start at nut) */}
                {startFret === 1 && (
                  <div
                    className="absolute font-extrabold"
                    style={{
                      color: theme.primary,
                      top: 0,
                      transform: 'translate(-50%, -100%)',
                      left: '50%',
                      fontSize: '32px',
                      lineHeight: 1,
                      zIndex: 15,
                    }}
                  >
                    {isOpen(stringNum) ? 'O' : isMuted(stringNum) ? 'X' : ''}
                  </div>
                )}
              </div>
            )
          })}

          {/* Finger dots */}
          {positions
            .filter(p => p.fret > 0)
            .map((pos, idx) => {
              const col = colIndexForString(pos.string)
              const finger = fingers[idx]
              return (
                <div
                  key={`dot-${idx}`}
                  className="absolute grid place-items-center text-white font-extrabold"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: 999,
                    background: theme.primary,
                    left: leftForCol(col),
                    top: topForFret(pos.fret),
                    transform: 'translate(-50%, -50%)',
                    textShadow: '0 1px 0 rgba(0,0,0,.25)',
                    zIndex: 20,
                  }}
                >
                  <span style={{ fontSize: '30px' }}>{finger ?? ''}</span>
                </div>
              )
            })}

          {/* Barres */}
          {barreGroups.map((b, i) => {
            const startCol = colIndexForString(b.startString)
            const endCol = colIndexForString(b.endString)
            const leftExpr = `calc((100%/${strings})*${Math.min(
              startCol,
              endCol
            )} + (100%/${strings})*0.12)`
            const widthExpr = `calc((100%/${strings})*${Math.abs(
              endCol - startCol
            )} + (100%/${strings})*0.76)`
            return (
              <div
                key={`barre-${i}`}
                className="absolute grid place-items-center text-white font-extrabold"
                style={{
                  height: '48px',
                  borderRadius: 999,
                  background: theme.primary,
                  left: leftExpr,
                  width: widthExpr,
                  top: topForFret(b.fret),
                  transform: 'translateY(-50%)',
                  textShadow: '0 1px 0 rgba(0,0,0,.25)',
                  zIndex: 19,
                }}
              >
                <span style={{ fontSize: '24px' }}>{b.finger}</span>
              </div>
            )
          })}

          {/* Fret numbers */}
          {Array.from({ length: frets }).map((_, i) => (
            <div
              key={`fnum-${i}`}
              className="absolute text-xs text-gray-500"
              style={{ top: `calc((100%/6)*${i} + (100%/6)*0.5)`, left: '-22px' }}
            >
              {startFret + i}
            </div>
          ))}
        </div>
      </div>

      {/* Optional note strip (low E -> high E) */}
      {noteStrip?.length === 6 && (
        <div
          className="mt-3 grid grid-cols-6 gap-0 font-extrabold"
          style={{ fontSize: '20px', letterSpacing: '.5px' }}
        >
          {noteStrip.map((n, i) => (
            <span key={`ns-${i}`} className="text-center" style={{ color: theme.primary }}>
              {n}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 rounded-lg transition-colors text-white"
          style={{ background: theme.primary }}
        >
          Play Chord
        </button>
      </div>
    </div>
  )
}

export default GuitarDiagram
