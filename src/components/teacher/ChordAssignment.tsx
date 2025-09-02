import React, { useState } from 'react';
import type { ChordOption } from './TeacherDashboard';

interface ChordAssignmentProps {
  students: { id: string; name: string }[];
  chords: ChordOption[];
  onAssign: (studentId: string, chordName: string) => void;
}

const ChordAssignment: React.FC<ChordAssignmentProps> = ({ 
  students, 
  chords, 
  onAssign 
}) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedChord, setSelectedChord] = useState('');

  const handleAssign = () => {
    if (selectedStudent && selectedChord) {
      onAssign(selectedStudent, selectedChord);
      setSelectedStudent('');
      setSelectedChord('');
    }
  };

  return (
    <div className="assignment-panel">
      <h3>Assign Chords</h3>
      <div className="assignment-controls">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>

        <select
          value={selectedChord}
          onChange={(e) => setSelectedChord(e.target.value)}
        >
          <option value="">Select Chord</option>
          {chords.map(chord => (
            <option key={chord.name} value={chord.name}>{chord.name}</option>
          ))}
        </select>

        <button 
          onClick={handleAssign}
          disabled={!selectedStudent || !selectedChord}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default ChordAssignment;
