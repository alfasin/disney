import { useState } from 'react'
import TableViewer from '../components/TableViewer'

const tables = [
  { key: 'categories', label: 'Categories', query: 'SELECT * FROM categories ORDER BY id' },
  { key: 'questions', label: 'Questions', query: 'SELECT * FROM questions ORDER BY id' },
  { key: 'players', label: 'Players', query: 'SELECT * FROM players ORDER BY id DESC LIMIT 50' },
  {
    key: 'game_sessions',
    label: 'Game Sessions',
    query: 'SELECT * FROM game_sessions ORDER BY id DESC LIMIT 50',
  },
  { key: 'answers', label: 'Answers', query: 'SELECT * FROM answers ORDER BY id DESC LIMIT 50' },
]

export default function DbViewerScreen() {
  const [activeTab, setActiveTab] = useState('categories')
  const active = tables.find((t) => t.key === activeTab)!

  return (
    <div className="db-viewer-screen">
      <h2>Database Viewer</h2>
      <p className="db-viewer-subtitle">
        All queries use <code>useLiveQuery</code> — data updates in real-time as you play
      </p>
      <div className="tab-bar">
        {tables.map((t) => (
          <button
            key={t.key}
            className={`tab-btn ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <TableViewer key={active.key} query={active.query} title={active.label} />
    </div>
  )
}
