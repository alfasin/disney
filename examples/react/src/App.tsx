import { useEffect, useState } from 'react'
import './App.css'
import { PGliteProvider } from '@electric-sql/pglite-react'
import { live, PGliteWithLive } from '@electric-sql/pglite/live'
import { PGlite } from '@electric-sql/pglite'
import { initSchema } from './schema'
import { seedData } from './seed'
import GameScreen from './screens/GameScreen'
import DbViewerScreen from './screens/DbViewerScreen'

let dbGlobal: PGliteWithLive | undefined

type Screen = 'game' | 'db-viewer'

function App() {
  const [db, setDb] = useState<PGliteWithLive | undefined>()
  const [screen, setScreen] = useState<Screen>('game')

  useEffect(() => {
    async function setupDb() {
      dbGlobal ??= await PGlite.create({
        dataDir: 'idb://disney-trivia',
        extensions: { live },
      })
      await initSchema(dbGlobal)
      await seedData(dbGlobal)
      setDb(dbGlobal)
    }
    setupDb()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Disney Trivia Quiz</h1>
        <p className="subtitle">Powered by PGlite — Postgres in your browser</p>
        <div className="toggle-bar">
          <button
            className={`toggle-btn ${screen === 'game' ? 'active' : ''}`}
            onClick={() => setScreen('game')}
          >
            Game
          </button>
          <button
            className={`toggle-btn ${screen === 'db-viewer' ? 'active' : ''}`}
            onClick={() => setScreen('db-viewer')}
          >
            DB Viewer
          </button>
        </div>
      </header>
      <main>
        {db ? (
          <PGliteProvider db={db}>
            {screen === 'game' ? <GameScreen /> : <DbViewerScreen />}
          </PGliteProvider>
        ) : (
          <div className="loading">Loading PGlite...</div>
        )}
      </main>
    </div>
  )
}

export default App
