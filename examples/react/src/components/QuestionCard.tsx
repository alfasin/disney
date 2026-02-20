import { useState, useMemo } from 'react'

interface Question {
  id: number
  question_text: string
  correct_answer: string
  wrong_answer_1: string
  wrong_answer_2: string
  wrong_answer_3: string
  category_name: string
}

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (questionId: number, selectedAnswer: string, isCorrect: boolean) => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const answers = useMemo(
    () =>
      shuffleArray([
        question.correct_answer,
        question.wrong_answer_1,
        question.wrong_answer_2,
        question.wrong_answer_3,
      ]),
    [question],
  )

  const handleSelect = (answer: string) => {
    if (selected) return // already answered
    setSelected(answer)
    const isCorrect = answer === question.correct_answer
    // Brief delay to show feedback before moving on
    setTimeout(() => {
      onAnswer(question.id, answer, isCorrect)
      setSelected(null)
    }, 800)
  }

  const getButtonClass = (answer: string) => {
    if (!selected) return 'answer-btn'
    if (answer === question.correct_answer) return 'answer-btn correct'
    if (answer === selected) return 'answer-btn wrong'
    return 'answer-btn dimmed'
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="question-category">{question.category_name}</span>
      </div>
      <h2 className="question-text">{question.question_text}</h2>
      <div className="answers-grid">
        {answers.map((answer) => (
          <button
            key={answer}
            className={getButtonClass(answer)}
            onClick={() => handleSelect(answer)}
            disabled={selected !== null}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}
