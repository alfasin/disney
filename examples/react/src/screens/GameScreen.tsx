import { useState, useCallback } from 'react'
import { usePGlite } from '@electric-sql/pglite-react'
import PlayerSelect from '../components/PlayerSelect'
import CategorySelect from '../components/CategorySelect'
import QuestionCard from '../components/QuestionCard'
import ScoreCard from '../components/ScoreCard'
import Leaderboard from '../components/Leaderboard'

interface Question {
  id: number
  question_text: string
  correct_answer: string
  wrong_answer_1: string
  wrong_answer_2: string
  wrong_answer_3: string
  category_name: string
}

type GamePhase = 'select-player' | 'select-category' | 'playing' | 'finished'

const QUESTIONS_PER_GAME = 10

export default function GameScreen() {
  const db = usePGlite()

  const [phase, setPhase] = useState<GamePhase>('select-player')
  const [playerId, setPlayerId] = useState<number>(0)
  const [playerName, setPlayerName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [sessionId, setSessionId] = useState<number>(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  const handlePlayerSelect = useCallback(
    (id: number, name: string) => {
      setPlayerId(id)
      setPlayerName(name)
      setPhase('select-category')
    },
    [],
  )

  const handleCategorySelect = useCallback(
    async (categoryId: number | null, catName: string) => {
      setCategoryName(catName)

      // Fetch questions with JOIN
      const whereClause = categoryId !== null ? 'WHERE q.category_id = $1' : ''
      const params = categoryId !== null ? [categoryId] : []
      const result = await db.query<Question>(
        `SELECT q.id, q.question_text, q.correct_answer,
                q.wrong_answer_1, q.wrong_answer_2, q.wrong_answer_3,
                c.name as category_name
         FROM questions q
         JOIN categories c ON q.category_id = c.id
         ${whereClause}
         ORDER BY RANDOM()
         LIMIT ${QUESTIONS_PER_GAME}`,
        params,
      )

      const fetched = result.rows
      setQuestions(fetched)
      setCurrentIndex(0)
      setScore(0)

      // Create game session
      const session = await db.query<{ id: number }>(
        `INSERT INTO game_sessions (player_id, category_id, total_questions)
         VALUES ($1, $2, $3) RETURNING id`,
        [playerId, categoryId, fetched.length],
      )
      setSessionId(session.rows[0].id)
      setPhase('playing')
    },
    [db, playerId],
  )

  const handleAnswer = useCallback(
    async (questionId: number, selectedAnswer: string, isCorrect: boolean) => {
      // Record answer
      await db.query(
        `INSERT INTO answers (session_id, question_id, selected_answer, is_correct)
         VALUES ($1, $2, $3, $4)`,
        [sessionId, questionId, selectedAnswer, isCorrect],
      )

      const newScore = isCorrect ? score + 1 : score
      setScore(newScore)

      if (currentIndex + 1 >= questions.length) {
        // Game finished — update session
        await db.query(
          `UPDATE game_sessions
           SET score = $1, completed_at = CURRENT_TIMESTAMP
           WHERE id = $2`,
          [newScore, sessionId],
        )
        setPhase('finished')
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [db, sessionId, score, currentIndex, questions.length],
  )

  const handlePlayAgain = useCallback(() => {
    setPhase('select-player')
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)
  }, [])

  return (
    <div className="game-screen">
      {phase === 'select-player' && (
        <PlayerSelect onSelect={handlePlayerSelect} />
      )}
      {phase === 'select-category' && (
        <CategorySelect
          playerName={playerName}
          onSelect={handleCategorySelect}
        />
      )}
      {phase === 'playing' && questions[currentIndex] && (
        <QuestionCard
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {phase === 'finished' && (
        <ScoreCard
          playerName={playerName}
          categoryName={categoryName}
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      )}
      <Leaderboard />
    </div>
  )
}
