import React, { useEffect, useCallback } from 'react'

interface Question {
  audio?: string
}

interface QuickQuizProps {
  question: Question
}

const QuickQuiz: React.FC<QuickQuizProps> = ({ question }) => {
  const playAudio = useCallback(() => {
    if (!question.audio) return

    const audio = new Audio(question.audio)
    audio.play().catch(() => {})
  }, [question.audio])

  useEffect(() => {
    playAudio()
  }, [playAudio])

  return (
    <div>
      {/* Quiz content goes here */}
    </div>
  )
}

export default QuickQuiz
