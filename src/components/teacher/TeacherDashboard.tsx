import React, { useState } from 'react';
import GuitarChordDiagram from '../practice-mode/GuitarChordDiagram';
import PianoDiagram from '../diagrams/PianoDiagram';
import './TeacherDashboard.css';
import './StudentProgressTable.css';
import StudentProgressTable from './StudentProgressTable';
import ChordAssignment from './ChordAssignment';
import './ChordAssignment.css';
import AssessmentTools from './AssessmentTools';
import './AssessmentTools.css';

type Instrument = 'guitar' | 'piano';

export interface ChordOption {
  name: string;
  positions: {
    fret: number;
    string: number;
    finger?: number;
    muted?: boolean;
  }[];
  notes: string[];
}

interface StudentProgress {
  id: string;
  name: string;
  completedChords: string[];
  lastPracticed: string;
  accuracy: number;
}

const TeacherDashboard: React.FC = () => {
  const [instrument, setInstrument] = useState<Instrument>('guitar');
  const [currentChord, setCurrentChord] = useState<ChordOption>({
    name: 'C Major',
    positions: [
      { fret: 0, string: 1 },
      { fret: 1, string: 2 },
      { fret: 0, string: 3 },
      { fret: 2, string: 4 },
      { fret: 3, string: 5 },
      { fret: 0, string: 6, muted: true }
    ],
    notes: ['C', 'E', 'G'] // Added notes array
  });

  const chordLibrary: ChordOption[] = [
    {
      name: 'C Major',
      positions: [
        { fret: 0, string: 1 },
        { fret: 1, string: 2 },
        { fret: 0, string: 3 },
        { fret: 2, string: 4 },
        { fret: 3, string: 5 },
        { fret: 0, string: 6, muted: true }
      ],
      notes: ['C', 'E', 'G']
    },
    {
      name: 'G Major',
      positions: [
        { fret: 3, string: 1 },
        { fret: 0, string: 2 },
        { fret: 0, string: 3 },
        { fret: 0, string: 4 },
        { fret: 2, string: 5 },
        { fret: 3, string: 6 }
      ],
      notes: ['G', 'B', 'D']
    },
    {
      name: 'D Major',
      positions: [
        { fret: 2, string: 1 },
        { fret: 3, string: 2 },
        { fret: 2, string: 3 },
        { fret: 0, string: 4 },
        { fret: 0, string: 5, muted: true },
        { fret: 0, string: 6, muted: true }
      ],
      notes: ['D', 'F#', 'A']
    },
    {
      name: 'A Minor',
      positions: [
        { fret: 0, string: 1 },
        { fret: 1, string: 2 },
        { fret: 2, string: 3 },
        { fret: 2, string: 4 },
        { fret: 0, string: 5 },
        { fret: 0, string: 6, muted: true }
      ],
      notes: ['A', 'C', 'E']
    },
    {
      name: 'E Minor',
      positions: [
        { fret: 0, string: 1 },
        { fret: 0, string: 2 },
        { fret: 0, string: 3 },
        { fret: 2, string: 4 },
        { fret: 2, string: 5 },
        { fret: 0, string: 6 }
      ],
      notes: ['E', 'G', 'B']
    }
  ];

  const mockStudents: StudentProgress[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      completedChords: ['C Major', 'G Major'],
      lastPracticed: '2025-09-01',
      accuracy: 85
    },
    {
      id: '2',
      name: 'Sam Wilson',
      completedChords: ['C Major'],
      lastPracticed: '2025-08-30',
      accuracy: 72
    },
    {
      id: '3',
      name: 'Taylor Smith',
      completedChords: [],
      lastPracticed: '2025-08-28',
      accuracy: 65
    }
  ];

  const handleAssignChord = (studentId: string, chordName: string) => {
    // In a real app, this would update the backend
    console.log(`Assigned ${chordName} to student ${studentId}`);
  };

  const handleStartAssessment = (chord: string) => {
    console.log(`Starting assessment for ${chord}`);
    // In a real app, this would initiate an assessment flow
  };

  return (
    <div className="teacher-dashboard">
      <div className="controls">
        <select 
          value={instrument}
          onChange={(e) => setInstrument(e.target.value as Instrument)}
        >
          <option value="guitar">Guitar</option>
          <option value="piano">Piano</option>
        </select>

        <select 
          value={currentChord.name}
          onChange={(e) => {
            const selected = chordLibrary.find(c => c.name === e.target.value);
            if (selected) setCurrentChord(selected);
          }}
        >
          {chordLibrary.map(chord => (
            <option key={chord.name} value={chord.name}>{chord.name}</option>
          ))}
        </select>
      </div>

      <div className="content-area">
        <div className="fullscreen-chord">
          {instrument === 'guitar' ? (
            <GuitarChordDiagram 
              chord={currentChord} 
              rootNoteColor="#3b82f6"
            />
          ) : (
            <PianoDiagram 
              chord={currentChord}
              rootNoteColor="#3b82f6"
            />
          )}
        </div>

        <StudentProgressTable 
          students={mockStudents} 
          currentChord={currentChord.name} 
        />
        <ChordAssignment 
          students={mockStudents.map(s => ({ id: s.id, name: s.name }))}
          chords={chordLibrary}
          onAssign={handleAssignChord}
        />
        <AssessmentTools 
          students={mockStudents}
          currentChord={currentChord.name}
          onStartAssessment={handleStartAssessment}
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
