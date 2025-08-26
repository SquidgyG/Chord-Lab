import { useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  duration: string; // e.g., "5 min"
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

const LearningPathway = () => {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  // Sample learning paths
  const learningPaths: Record<string, LearningPath> = {
    beginner: {
      id: 'beginner',
      title: 'Beginner Path',
      description: 'Start your musical journey with the basics',
      lessons: [
        {
          id: 'b1',
          title: 'Introduction to Chords',
          description: 'Learn what chords are and how they work',
          difficulty: 'beginner',
          completed: true,
          duration: '10 min'
        },
        {
          id: 'b2',
          title: 'Basic Open Chords',
          description: 'Master the essential open chords: C, G, Am, F',
          difficulty: 'beginner',
          completed: true,
          duration: '15 min'
        },
        {
          id: 'b3',
          title: 'Chord Transitions',
          description: 'Practice switching between chords smoothly',
          difficulty: 'beginner',
          completed: false,
          duration: '20 min'
        },
        {
          id: 'b4',
          title: 'Simple Songs',
          description: 'Play your first songs with 3-4 chords',
          difficulty: 'beginner',
          completed: false,
          duration: '25 min'
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      title: 'Intermediate Path',
      description: 'Expand your skills with more complex chords',
      lessons: [
        {
          id: 'i1',
          title: 'Barre Chords',
          description: 'Learn movable barre chord shapes',
          difficulty: 'intermediate',
          completed: false,
          duration: '30 min'
        },
        {
          id: 'i2',
          title: 'Chord Inversions',
          description: 'Explore different chord voicings',
          difficulty: 'intermediate',
          completed: false,
          duration: '25 min'
        }
      ]
    },
    advanced: {
      id: 'advanced',
      title: 'Advanced Path',
      description: 'Master complex progressions and techniques',
      lessons: [
        {
          id: 'a1',
          title: 'Jazz Chords',
          description: 'Learn extended and altered chords',
          difficulty: 'advanced',
          completed: false,
          duration: '35 min'
        }
      ]
    }
  };
  
  const currentPath = learningPaths[selectedPath];
  
  // Calculate progress
  const completedLessons = currentPath.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = currentPath.lessons.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Pathway</h2>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.keys(learningPaths).map(pathId => {
          const path = learningPaths[pathId];
          return (
            <button
              key={pathId}
              onClick={() => setSelectedPath(pathId as 'beginner' | 'intermediate' | 'advanced')}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedPath === pathId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {path.title}
            </button>
          );
        })}
      </div>
      
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{currentPath.title}</h3>
        <p className="text-gray-600 mb-4">{currentPath.description}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="text-gray-600">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          {completedLessons} of {totalLessons} lessons completed
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-800 mb-3">Lessons</h4>
        <div className="space-y-3">
          {currentPath.lessons.map(lesson => (
            <div 
              key={lesson.id} 
              className={`p-4 rounded-lg border ${lesson.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-gray-800">{lesson.title}</h5>
                  <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {lesson.duration}
                  </span>
                  {lesson.completed && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          Previous
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Start Next Lesson
        </button>
      </div>
    </div>
  );
};

export default LearningPathway;
