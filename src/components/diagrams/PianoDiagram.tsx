import { useState, useMemo } from 'react'
import { getChordTheme } from '../../utils/diagramTheme'
import { getChordInversion } from '../../utils/music-theory'

interface PianoKey {
  note: string
  type: 'white' | 'black'
  position: number // Position in the keyboard layout
  isPressed?: boolean
}

interface PianoDiagramProps {
  chordName: string
  notes: string[] // Notes that should be pressed for this chord
  inversion?: 0 | 1 | 2
  hand?: 'left' | 'right'
  showLabels?: boolean // optional note labels under keys
}

const PianoDiagram = ({
  chordName,
  notes,
  inversion = 0,
  hand = 'right',
  showLabels = true,
}: PianoDiagramProps) => {
  const [selectedHand, setSelectedHand] = useState<'left' | 'right'>(hand)
  const theme = getChordTheme(chordName)

  const invertedNotes = useMemo(
    () => getChordInversion(notes, inversion),
    [notes, inversion]
  )

  // Generate piano keys for 2 octaves (C4 to C6)
  const generateKeys = (): PianoKey[] => {
    const keys: PianoKey[] = []
    const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const blackNotes = ['C#', 'D#', 'F#', 'G#', 'A#']

    let position = 0

    for (let octave = 4; octave <= 5; octave++) {
      // Add white keys
      whiteNotes.forEach(note => {
        const fullNote = `${note}${octave}`
        keys.push({
          note: fullNote,
          type: 'white',
          position: position++,
          isPressed: invertedNotes.includes(fullNote),
        })
      })

      // Add black keys (except between E-F and B-C)
      if (octave < 5) {
        // Don't add black keys for the last octave
        blackNotes.forEach(note => {
          // Skip E-F and B-C gaps
          if (!(note === 'E#' || note === 'B#')) {
            const fullNote = `${note}${octave}`
            keys.push({
              note: fullNote,
              type: 'black',
              position: position - 0.5, // Position between white keys
              isPressed: invertedNotes.includes(fullNote),
            })
          }
        })
      }
    }

    return keys
  }

  const keys = generateKeys()

  // Find the pressed keys
  const pressedKeys = keys.filter(key => key.isPressed)
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto" style={{ border: `4px solid ${theme.primary}` }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-gray-900" style={{ letterSpacing: '.3px' }}>{chordName}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedHand('right')}
            className={`px-3 py-1 text-sm rounded ${selectedHand === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Right Hand
          </button>
          <button 
            onClick={() => setSelectedHand('left')}
            className={`px-3 py-1 text-sm rounded ${selectedHand === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Left Hand
          </button>
        </div>
      </div>
      
      <div className="relative h-48 bg-gray-800 rounded-lg p-4">
        <div className="flex relative h-full">
          {keys
            .filter(key => key.type === 'white')
            .map((key) => (
              <div 
                key={key.note}
                className={`relative h-full rounded-b flex items-end justify-center pb-2`}
                style={{ 
                  width: '30px', 
                  background: key.isPressed ? theme.background : '#ffffff',
                  borderLeft: '1px solid #d1d5db',
                  borderRight: '1px solid #d1d5db',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  boxShadow: key.isPressed 
                    ? 'inset 0 -6px 0 rgba(0,0,0,.18)'
                    : 'inset 0 -4px 0 rgba(0,0,0,.10)'
                }}
              >
                {showLabels && (
                  <span className={`text-xs ${key.isPressed ? 'text-gray-800' : 'text-gray-500'}`}>
                    {key.note}
                  </span>
                )}
              </div>
            ))}
          
          {/* Black keys */}
          <div className="absolute top-0 left-0 h-3/5 w-full pointer-events-none">
            <div className="flex relative h-full">
              {keys
                .filter(key => key.type === 'black')
                .map((key) => {
                  // Calculate position based on white key positions
                  const whiteKeyIndex = Math.floor(key.position);
                  const leftPosition = whiteKeyIndex * 30 - 15;
                  
                  return (
                    <div 
                      key={key.note}
                      className={`absolute h-full w-6 rounded-b z-10 pointer-events-auto cursor-pointer`}
                      style={{ 
                        left: `${leftPosition}px`,
                        background: key.isPressed ? theme.primary : '#0f172a',
                        borderLeft: '1px solid #000',
                        borderRight: '1px solid #000',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        boxShadow: key.isPressed 
                          ? 'inset 0 -6px 0 rgba(255,255,255,.12)'
                          : 'inset 0 -4px 0 rgba(255,255,255,.08)'
                      }}
                    >
                      {showLabels && (
                        <div className="h-full flex items-end justify-center pb-2">
                          <span className="text-xs text-white">
                            {key.note}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Notes in chord:</span> {pressedKeys.map(k => k.note).join(', ') || 'None'}
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <button className="px-4 py-2 text-white rounded-lg transition-colors" style={{ background: theme.primary }}>
          Play Chord
        </button>
      </div>
    </div>
  );
};

export default PianoDiagram;
