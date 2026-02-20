import { useState } from 'react'
import { usePGlite, useLiveQuery } from '@electric-sql/pglite-react'

interface PlayerSelectProps {
  onSelect: (playerId: number, playerName: string) => void
}

export default function PlayerSelect({ onSelect }: PlayerSelectProps) {
  const db = usePGlite()
  const [name, setName] = useState('')

  const players = useLiveQuery(
    'SELECT id, name FROM players ORDER BY created_at DESC',
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    // INSERT ON CONFLICT — showcases upsert pattern
    await db.query(
      'INSERT INTO players (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
      [trimmed],
    )
    const result = await db.query<{ id: number; name: string }>(
      'SELECT id, name FROM players WHERE name = $1',
      [trimmed],
    )
    const player = result.rows[0]
    onSelect(player.id, player.name)
  }

  const handlePickExisting = (playerId: number, playerName: string) => {
    onSelect(playerId, playerName)
  }

  return (
    <div className="player-select">
      <h2>Who's playing?</h2>
      <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          autoFocus
          maxLength={30}
        />
        <button type="submit" disabled={!name.trim()}>
          Play
        </button>
      </form>
      {players && players.rows.length > 0 && (
        <div className="existing-players">
          <p>Or pick a returning player:</p>
          <div className="player-chips">
            {players.rows.map((p) => (
              <button
                key={p.id as number}
                className="chip"
                onClick={() =>
                  handlePickExisting(p.id as number, p.name as string)
                }
              >
                {p.name as string}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
