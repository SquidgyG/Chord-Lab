import React from 'react';
import type { StudentProgress } from './StudentProgressTable';

interface AssessmentToolsProps {
  students: StudentProgress[];
  currentChord: string;
  onStartAssessment: (chord: string) => void;
}

const AssessmentTools: React.FC<AssessmentToolsProps> = ({ 
  students, 
  currentChord, 
  onStartAssessment 
}) => {
  return (
    <div className="assessment-tools">
      <h3>Assessment Tools</h3>
      
      <div className="assessment-controls">
        <button 
          onClick={() => onStartAssessment(currentChord)}
          className="assessment-button"
        >
          Start Chord Test
        </button>
        
        <button 
          onClick={() => onStartAssessment('progression')}
          className="assessment-button"
        >
          Start Progression Test
        </button>
      </div>
      
      <div className="assessment-results">
        <h4>Recent Results</h4>
        {students.map(student => (
          <div key={student.id} className="student-result">
            <span>{student.name}</span>
            <span>Last Score: {student.accuracy}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentTools;
