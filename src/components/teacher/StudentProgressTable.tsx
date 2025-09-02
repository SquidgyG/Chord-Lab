import React from 'react';

export interface StudentProgress {
  id: string;
  name: string;
  completedChords: string[];
  lastPracticed: string;
  accuracy: number;
}

interface StudentProgressTableProps {
  students: StudentProgress[];
  currentChord: string;
}

const StudentProgressTable: React.FC<StudentProgressTableProps> = ({ 
  students, 
  currentChord 
}) => {
  return (
    <div className="progress-table">
      <h3>Student Progress - {currentChord}</h3>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Completed</th>
            <th>Last Practiced</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.completedChords.includes(currentChord) ? '✓' : '✗'}</td>
              <td>{student.lastPracticed}</td>
              <td>{student.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentProgressTable;
