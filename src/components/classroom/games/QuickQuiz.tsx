import { useState } from 'react'

export interface QuickQuizQuestion<T extends string> {
  question: string
  answer: T
}

export interface QuickQuizProps<T extends string> {
  questions: QuickQuizQuestion<T>[]
  options: T[]
}

export default function QuickQuiz<T extends string>({ questions, options }: QuickQuizProps<T>) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<T | null>(null)

  const question = questions[current]

  return (
    <div className="flex flex-col gap-4">
      <p>{question.question}</p>
      <div className="flex gap-2">
        {options.map(option => (
          <button
            key={option}
            className={`rounded border px-3 py-1 ${selected === option ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <button
          className="self-start rounded border px-3 py-1"
          onClick={() => {
            setSelected(null)
            setCurrent(i => Math.min(i + 1, questions.length - 1))
          }}
        >
          Next
        </button>
      )}
    </div>
  )
}

