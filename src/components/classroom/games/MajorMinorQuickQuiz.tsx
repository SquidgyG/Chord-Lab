import { useMemo } from 'react'

// Placeholder data for chord quality questions.
// In a real implementation, this would likely be imported
// from elsewhere in the application.
const chordQualityQuestions = [
  'Major',
  'Minor',
]

export default function MajorMinorQuickQuiz() {
  // Memoise the generated question elements so they are only
  // recalculated when the underlying data changes.
  const questionElements = useMemo(
    () => chordQualityQuestions.map((question) => (
      <button key={question}>{question}</button>
    )),
    [chordQualityQuestions],
  )

  return <div>{questionElements}</div>
}
