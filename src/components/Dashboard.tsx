import { useState } from 'react';
import ChordProgressionBuilder from './chord-builder/ChordProgressionBuilder';
import PracticeMode from './practice-mode/PracticeMode';
import Metronome from './practice-mode/Metronome';
import LearningPathway from './learning-path/LearningPathway';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'progression' | 'practice' | 'learn' | 'metronome'>('progression');
  
  // Sample data for quick practice
  const quickChords = [
    { name: 'C', guitar: [{ string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 }], piano: ['C4', 'E4', 'G4'] },
    { name: 'G', guitar: [{ string: 1, fret: 3 }, { string: 5, fret: 2 }, { string: 6, fret: 3 }], piano: ['G3', 'B3', 'D4'] },
    { name: 'Am', guitar: [{ string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 }], piano: ['A3', 'C4', 'E4'] },
    { name: 'F', guitar: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 }], piano: ['F3', 'A3', 'C4'] }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🎵 Chord Master</h1>
              <p className="text-gray-600 mt-1">Your interactive chord learning companion</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">Alex Guitarist</p>
                <p className="text-sm text-gray-600">Guitar • Intermediate</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                AG
              </div>
            </div>
          </div>
        </header>
        
        {/* Quick Practice */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Practice</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickChords.map((chord, index) => (
              <button
                key={index}
                className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all"
              >
                <div className="font-bold text-gray-800 text-lg">{chord.name}</div>
                <div className="text-xs text-gray-600 mt-1">Click to practice</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-6 bg-white rounded-2xl shadow-lg p-2">
          <button
            onClick={() => setActiveTab('progression')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'progression' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Chord Builder
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'learn' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Learning Path
          </button>
          <button
            onClick={() => setActiveTab('metronome')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'metronome' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Metronome
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'progression' && (
            <ChordProgressionBuilder />
          )}
          
          {activeTab === 'practice' && (
            <PracticeMode />
          )}
          
          {activeTab === 'learn' && (
            <LearningPathway />
          )}
          
          {activeTab === 'metronome' && (
            <Metronome />
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <span className="text-2xl">🎸</span>
              </div>
              <div>
                <p className="text-gray-600">Chords Learned</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <p className="text-gray-600">Practice Time</p>
                <p className="text-2xl font-bold text-gray-800">12.5h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
