import React from 'react';

interface PianoChordDiagramProps {
  notes: string[];
}

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ notes }) => {
  // We'll create a simple piano keyboard visualization
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  return (
    <div className="piano-chord-diagram flex h-24 w-full max-w-md border border-gray-300 rounded">
      {whiteKeys.map((key) => {
        const isActive = notes.includes(key);
        return (
          <div
            key={`white-${key}`}
            className={`relative flex-1 border-r border-gray-300 ${isActive ? 'bg-indigo-500' : 'bg-white'}`}
          >
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-700">
              {key}
            </div>
          </div>
        );
      })}
      
      {/* Black keys */}
      <div className="absolute flex h-16 w-full max-w-md pointer-events-none">
        {blackKeys.map((key) => {
          const isActive = notes.includes(key);
          return (
            <div
              key={`black-${key}`}
              className={`absolute w-8 h-16 ${isActive ? 'bg-indigo-700' : 'bg-gray-800'} rounded-b z-10`}
              style={{
                left: getBlackKeyPosition(key),
              }}
            >
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-white">
                {key}
              </div>
            </div>
          );
        })}
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
