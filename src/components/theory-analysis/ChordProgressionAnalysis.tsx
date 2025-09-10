import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useChordBuilder } from '../../contexts/ChordBuilderContext';
import { parseChord } from '../../utils/chordParser';
import ChordWheel from '../chord-wheel/ChordWheel';
import ErrorBoundary from '../common/ErrorBoundary';

interface Chord {
  name: string;
}

const ChordProgressionAnalysis: FC = () => {
  const { chords: _chords, selectedKey: _selectedKey } = useChordBuilder();
  const [error, setError] = useState<string | null>(null);

  // Chord tones analysis with error handling
  const chordTones = useCallback(() => {
    try {
      return _chords.flatMap(chord => {
        try {
          const tones = parseChord(chord.name);
          if (!tones || tones.length === 0) {
            console.warn(`No tones found for chord ${chord.name}`);
            return [];
          }
          return tones;
        } catch (e) {
          console.error(`Failed to parse chord ${chord.name}:`, e);
          return [];
        }
      }).filter(Boolean);
    } catch (_e) {
      setError('Failed to analyze chord progression');
      return [];
    }
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
    <ErrorBoundary>
      <div className="bg-white rounded-xl shadow-lg p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
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
    </ErrorBoundary>
  );
};

export default ChordProgressionAnalysis;
