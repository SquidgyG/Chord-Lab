import QuickQuiz, { QuickQuizQuestion } from './QuickQuiz'

const questions: QuickQuizQuestion<'Major' | 'Minor'>[] = [
  { question: 'C', answer: 'Major' },
  { question: 'Am', answer: 'Minor' },
]

export default function MajorMinorQuickQuiz() {
  return (
    <QuickQuiz<'Major' | 'Minor'>
      questions={questions}
      options={['Major', 'Minor']}
    />
  )
}

