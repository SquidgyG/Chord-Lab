import React from 'react';

interface PianoChordDiagramProps {
  notes: string[];
  fingers?: number[]; 
  chordName?: string; 
  rootNote?: string; 
}

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ 
  notes, 
  fingers = [],
  chordName = '',
  rootNote = ''
}) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  return (
    <div className="piano-chord-diagram w-full overflow-x-auto">
      {chordName && (
        <div className="text-center font-bold text-lg mb-2">
          {chordName}
        </div>
      )}
      <div className="flex min-w-[400px] h-24 border border-gray-300 rounded relative">
        {whiteKeys.map((key) => {
          const isActive = notes.includes(key);
          const fingerIndex = notes.indexOf(key);
          const finger = fingers[fingerIndex];
          const isRoot = key === rootNote;
          
          return (
            <div
              key={`white-${key}`}
              className={`relative flex-1 border-r border-gray-300`}
              style={{
                background: isActive 
                  ? (isRoot 
                      ? 'linear-gradient(to bottom, #e53e3e, #c53030)' 
                      : 'linear-gradient(to bottom, #4F46E5, #3730A3)'
                    )
                  : 'linear-gradient(to bottom, #FFF, #F3F4F6)',
                boxShadow: isActive ? 'inset -2px -2px 5px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-700">
                {key}
              </div>
              {isActive && finger && (
                <div className="absolute top-2 left-0 right-0 text-center text-white font-bold">
                  {finger}
                </div>
              )}
            </div>
          );
        })}
        
        <div className="absolute flex h-16 w-full pointer-events-none">
          {blackKeys.map((key) => {
            const isActive = notes.includes(key);
            const fingerIndex = notes.indexOf(key);
            const finger = fingers[fingerIndex];
            const isRoot = key === rootNote;
            
            return (
              <div
                key={`black-${key}`}
                className={`absolute w-8 h-16 rounded-b z-10`}
                style={{
                  background: isActive 
                    ? (isRoot 
                        ? 'linear-gradient(to bottom, #e53e3e, #c53030)' 
                        : 'linear-gradient(to bottom, #4F46E5, #3730A3)'
                      )
                    : 'linear-gradient(to bottom, #000, #111)',
                  boxShadow: isActive ? 'inset -2px -2px 5px rgba(0,0,0,0.5)' : 'none',
                  left: getBlackKeyPosition(key),
                }}
              >
                <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-white">
                  {key}
                </div>
                {isActive && finger && (
                  <div className="absolute top-2 left-0 right-0 text-center text-white font-bold">
                    {finger}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function getBlackKeyPosition(key: string): string {
  const positions: Record<string, string> = {
    'C#': '7%',
    'D#': '22%',
    'F#': '52%',
    'G#': '67%',
    'A#': '82%',
  };
  return positions[key] || '0%';
}

export default PianoChordDiagram;
