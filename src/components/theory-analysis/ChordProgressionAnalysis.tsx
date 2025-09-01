import type { FC } from 'react';
import { useCallback } from 'react';
import { useChordBuilder } from '../../contexts/ChordBuilderContext';
import { parseChord } from '../../utils/chordParser';
import ChordWheel from '../chord-wheel/ChordWheel';

interface Chord {
  name: string;
}

const ChordProgressionAnalysis: FC = () => {
  const { chords: _chords, selectedKey: _selectedKey } = useChordBuilder();

  // Chord tones analysis
  const chordTones = useCallback(() => {
    return _chords.flatMap(chord => parseChord(chord.name));
  }, [_chords]);

  // Placeholder for other functions
  const scaleNotes = useCallback(() => {
    // TODO: Implement scale notes analysis
    return [];
  }, []);

  const harmonicAnalysis = useCallback(() => {
    // TODO: Implement harmonic function analysis
    return [];
  }, []);

  const songSuggestions = useCallback(() => {
    // TODO: Implement song suggestions
    return [];
  }, []);

  const analyzeChord = useCallback((chord: Chord) => {
    console.log(chord);
  }, []);

  const handleChordSelect = (chordName: string) => {
    analyzeChord({ name: chordName } as Chord);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chord Progression Analysis</h2>
      
      <div className="theory-section">
        <h3>Chord Wheel Visualization</h3>
        <ChordWheel 
          chords={_chords.map(chord => chord.name)} 
          onChordSelect={handleChordSelect}
        />
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Chord Tones</h3>
          <div className="flex flex-wrap gap-2">
            {chordTones().map((tone, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg">
                {tone}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Scale Notes in {_selectedKey}</h3>
          <div className="flex flex-wrap gap-2">
            {scaleNotes().map((note, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg">
                {note}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Harmonic Function</h3>
          <div className="flex flex-wrap gap-2">
            {harmonicAnalysis().map((func, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg">
                {func}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Song Suggestions</h3>
          <ul className="list-disc pl-6">
            {songSuggestions().map((song, index) => (
              <li key={index} className="text-gray-700">{song}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChordProgressionAnalysis;
