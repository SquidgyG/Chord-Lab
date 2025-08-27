import { useState, useEffect } from 'react'
import { learningPath } from '../../data/learning-path'
import { useAchievements } from '../../contexts/AchievementContext'
import NameTheNoteQuiz from './quizzes/NameTheNoteQuiz'
import RhythmExercise from './exercises/RhythmExercise'
import ChordSwitchingExercise from './exercises/ChordSwitchingExercise'
import TheoryQuiz from './quizzes/TheoryQuiz'
import AdvancedTechniqueExercise from './exercises/AdvancedTechniqueExercise'
import CreatorMode from './CreatorMode'

const lessonComponents: Record<string, () => React.ReactElement> = {
  '1-e1': () => <NameTheNoteQuiz />,
  '1-s2': () => <RhythmExercise />,
  '2-s1': () => <ChordSwitchingExercise progression={['C', 'F']} />,
  '3-s1': () => <ChordSwitchingExercise progression={['C', 'G', 'Am', 'F']} />,
  '4-s1': () => <ChordSwitchingExercise progression={['G', 'D', 'Em', 'C']} />,
  '4-e1': () => (
    <TheoryQuiz
      question="Why is Em the 'vi' chord in the key of G major?"
      options={[
        'E is the 6th note of the G major scale.',
        'It sounds good.',
        'It has the same notes as G major.',
        'It is the relative minor of G major.',
      ]}
      correctAnswer="E is the 6th note of the G major scale."
    />
  ),
  '5-s1': () => <AdvancedTechniqueExercise />,
  '6-k1': () => <CreatorMode />,
}

const LearningPathway = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedLessonIds')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })
  const { unlockAchievement } = useAchievements()

  useEffect(() => {
    localStorage.setItem('completedLessonIds', JSON.stringify(Array.from(completedLessonIds)))
  }, [completedLessonIds])

  const handleCompleteLesson = (lessonId: string) => {
    const newCompletedLessonIds = new Set(completedLessonIds)
    newCompletedLessonIds.add(lessonId)
    setCompletedLessonIds(newCompletedLessonIds)

    if (newCompletedLessonIds.size === 1) {
      unlockAchievement('FIRST_LESSON')
    }
  }

  const levelData = learningPath.find(level => level.id === currentLevel)

  if (!levelData) {
    return <div>Level not found!</div>
  }

  const completedLessons = levelData.lessons.filter(lesson => completedLessonIds.has(lesson.id)).length
  const totalLessons = levelData.lessons.length
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Learning Pathway
      </h2>

      <div className="mb-6 flex flex-wrap gap-2 border-b pb-4 border-gray-200 dark:border-gray-700">
        {learningPath.map(level => (
          <button
            key={level.id}
            onClick={() => setCurrentLevel(level.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentLevel === level.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Level {level.id}: {level.subtitle}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          {levelData.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{levelData.subtitle}</p>

        <div className="mb-4">
          <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
            Learning Intentions
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            {levelData.learningIntentions.map((intention, i) => (
              <li key={i}>{intention}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Lessons & Tasks</h4>
        <div className="space-y-3">
          {levelData.lessons.map(lesson => {
            const lessonComponent = lessonComponents[lesson.id]
            const isCompleted = completedLessonIds.has(lesson.id)
            return (
              <div
                key={lesson.id}
                className={`p-4 rounded-lg border ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-gray-100">{lesson.title}</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${
                        lesson.type === 'knowledge'
                          ? 'bg-blue-500'
                          : lesson.type === 'skill'
                          ? 'bg-purple-500'
                          : lesson.type === 'evidence'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {lesson.type}
                    </span>
                    {isCompleted && <span className="text-green-500">✓</span>}
                  </div>
                </div>
                {lessonComponent && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {lessonComponent()}
                  </div>
                )}
                {!isCompleted && (
                  <button
                    onClick={() => handleCompleteLesson(lesson.id)}
                    className="mt-4 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <button
          onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
          disabled={currentLevel === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Previous Level
        </button>
        <button
          onClick={() => setCurrentLevel(Math.min(learningPath.length, currentLevel + 1))}
          disabled={currentLevel === learningPath.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Level
        </button>
      </div>
    </div>
  )
}

export default LearningPathway
