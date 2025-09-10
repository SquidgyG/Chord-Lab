import PianoDiagram from '../../diagrams/PianoDiagram'
import type { ChordOption } from '../../../types';

interface AdvancedTechniqueExerciseProps {
  chord: ChordOption;
}

const AdvancedTechniqueExercise = ({ chord }: AdvancedTechniqueExerciseProps) => {
  return (
    <div className="exercise-container">
      <PianoDiagram chord={chord} rootNoteColor="#4CAF50" />
    </div>
  );
};

export default AdvancedTechniqueExercise;
