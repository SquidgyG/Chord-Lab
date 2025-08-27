import React, { useState } from 'react'
import QuickQuiz from './QuickQuiz'

const sampleQuestions = [
  { question: 'What is the relative minor of C major?', answer: 'A minor' },
  { question: 'How many sharps are in the key of D major?', answer: 'Two' },
  { question: 'Name the notes of a G major chord.', answer: 'G, B, D' }
]

const TeacherGamesDashboard: React.FC = () => {
  const [startQuiz, setStartQuiz] = useState(false)

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher Games Dashboard</h2>
      {!startQuiz ? (
        <button
          onClick={() => setStartQuiz(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Quick Quiz
        </button>
      ) : (
        <QuickQuiz questions={sampleQuestions} timeLimit={15} />
      )}
    </div>
  )
}

export default TeacherGamesDashboard
