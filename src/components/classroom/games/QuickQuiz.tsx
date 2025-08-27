import React, { useEffect, useState, useCallback } from 'react'

interface Question {
  question: string
  answer: string
}

interface QuickQuizProps {
  questions: Question[]
  timeLimit: number // seconds per question
}

const QuickQuiz: React.FC<QuickQuizProps> = ({ questions, timeLimit }) => {
  const maxQuestions = Math.min(questions.length, 10)
  const [current, setCurrent] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [completed, setCompleted] = useState(false)

  const handleNext = useCallback(() => {
    if (current < maxQuestions - 1) {
      setCurrent(c => c + 1)
    } else {
      setCompleted(true)
    }
  }, [current, maxQuestions])

  useEffect(() => {
    if (completed) return
    setTimeLeft(timeLimit)
    setShowAnswer(false)
  }, [current, timeLimit, completed])

  useEffect(() => {
    if (completed) return
    if (timeLimit <= 0) return
    if (timeLeft <= 0) {
      handleNext()
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, timeLimit, completed, handleNext])

  if (completed) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quiz Complete!</h2>
      </div>
    )
  }

  const question = questions[current]

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        Question {current + 1} / {maxQuestions}
      </div>
      <div className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {question?.question}
      </div>
      {showAnswer && (
        <div className="mb-4 text-green-700 dark:text-green-300">
          Answer: {question?.answer}
        </div>
      )}
      {timeLimit > 0 && (
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">Time left: {timeLeft}s</div>
      )}
      <div className="flex gap-2">
        {!showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reveal Answer
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {current < maxQuestions - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  )
}

export default QuickQuiz
