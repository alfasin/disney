import { useLiveQuery } from '@electric-sql/pglite-react'

interface CategorySelectProps {
  playerName: string
  onSelect: (categoryId: number | null, categoryName: string) => void
}

export default function CategorySelect({
  playerName,
  onSelect,
}: CategorySelectProps) {
  const categories = useLiveQuery(
    'SELECT id, name FROM categories ORDER BY id',
  )

  if (!categories) return <div>Loading categories...</div>

  return (
    <div className="category-select">
      <h2>Welcome, {playerName}!</h2>
      <p>Pick a category:</p>
      <div className="category-grid">
        <button className="category-btn all" onClick={() => onSelect(null, 'All Categories')}>
          All Categories
        </button>
        {categories.rows.map((c) => (
          <button
            key={c.id as number}
            className="category-btn"
            onClick={() => onSelect(c.id as number, c.name as string)}
          >
            {c.name as string}
          </button>
        ))}
      </div>
    </div>
  )
}
