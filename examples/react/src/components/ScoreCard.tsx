interface ScoreCardProps {
  playerName: string
  categoryName: string
  score: number
  totalQuestions: number
  onPlayAgain: () => void
}

export default function ScoreCard({
  playerName,
  categoryName,
  score,
  totalQuestions,
  onPlayAgain,
}: ScoreCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getMessage = () => {
    if (percentage === 100) return 'Perfect score! You are a true Disney expert!'
    if (percentage >= 80) return 'Amazing! You really know your Disney!'
    if (percentage >= 60) return 'Great job! Pretty solid Disney knowledge!'
    if (percentage >= 40) return 'Not bad! Keep watching those Disney movies!'
    return 'Time for a Disney marathon!'
  }

  return (
    <div className="score-card">
      <h2>Game Over!</h2>
      <div className="score-display">
        <span className="score-number">
          {score}/{totalQuestions}
        </span>
        <span className="score-percent">{percentage}%</span>
      </div>
      <p className="score-player">
        {playerName} — {categoryName}
      </p>
      <p className="score-message">{getMessage()}</p>
      <button className="play-again-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}
