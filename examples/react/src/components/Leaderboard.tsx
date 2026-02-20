import { useLiveQuery } from '@electric-sql/pglite-react'

const LEADERBOARD_QUERY = `
  SELECT
    p.name,
    COUNT(*)::int as games,
    MAX(gs.score)::int as best_score,
    ROUND(AVG(gs.score)::numeric, 1) as avg_score
  FROM game_sessions gs
  JOIN players p ON gs.player_id = p.id
  WHERE gs.completed_at IS NOT NULL
  GROUP BY p.id, p.name
  ORDER BY best_score DESC, avg_score DESC
  LIMIT 10
`

interface LeaderboardRow {
  name: string
  games: number
  best_score: number
  avg_score: number
}

export default function Leaderboard() {
  const result = useLiveQuery<LeaderboardRow>(LEADERBOARD_QUERY)

  if (!result || result.rows.length === 0) return null

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Games</th>
            <th>Best</th>
            <th>Avg</th>
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row, i) => (
            <tr key={row.name}>
              <td>{i + 1}</td>
              <td>{row.name}</td>
              <td>{row.games}</td>
              <td>{row.best_score}</td>
              <td>{row.avg_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
