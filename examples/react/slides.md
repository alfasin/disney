---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
colorSchema: dark
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: PGlite — Postgres in the Browser
mdc: true
---

# PGlite Deep Dive
### Postgres in WASM, for the local-first era

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer hover:bg-white/10 opacity-50">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# What is PGlite?

PGlite is a **WASM build of Postgres** bundled into a TypeScript client.

<v-clicks>

- **Lightweight** — ~3MB gzipped
- **Runs everywhere** — Browser, Node.js, Bun, Deno
- **Persistence** — IndexedDB (browser) or filesystem (Node)
- **Extensible** — pgvector, pgcrypto, live queries, and more
- **Full Postgres** — real SQL, real types, real constraints

</v-clicks>

---

# Demo: Disney Trivia Quiz

A browser-based trivia game backed entirely by PGlite.

<v-clicks>

- 5 normalized tables with foreign keys
- Seeded with 35 trivia questions across 4 categories
- Live leaderboard with reactive queries
- Data persists in IndexedDB — survives refresh
- Toggle between **Game** and **DB Viewer** to see the SQL underneath

</v-clicks>

---

# Initializing PGlite

`src/App.tsx` — one call to spin up a full Postgres in the browser

```ts {all|2|3|5-6}
async function setupDb() {
  dbGlobal ??= await PGlite.create({
    dataDir: 'idb://disney-trivia',
    extensions: { live },
  })
  await initSchema(dbGlobal)
  await seedData(dbGlobal)
}
```

<v-clicks>

- `??=` ensures single initialization (React Strict Mode safe)
- `idb://disney-trivia` persists to IndexedDB — data survives refresh
- `live` extension enables reactive queries that auto-update the UI
- Schema + seed run on every startup, but are idempotent

</v-clicks>

---

# Schema: Real Relational Modeling

`src/schema.ts` — 5 tables with foreign keys, constraints, and timestamps

```sql {all|1-3|5-10|12-16|18-25|27-33}
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY, name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  wrong_answer_1 TEXT, wrong_answer_2 TEXT, wrong_answer_3 TEXT
);

CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id),
  category_id INT REFERENCES categories(id),
  score INT DEFAULT 0, total_questions INT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  session_id INT REFERENCES game_sessions(id),
  question_id INT REFERENCES questions(id),
  selected_answer TEXT NOT NULL, is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

---

# Schema Highlights

This is **real Postgres** — not a toy database.

<v-clicks>

- **SERIAL PRIMARY KEY** — auto-incrementing IDs
- **REFERENCES** — actual foreign key constraints enforced at the DB level
- **UNIQUE** — player names are deduplicated by the database
- **TIMESTAMPTZ** — timezone-aware timestamps with `DEFAULT CURRENT_TIMESTAMP`
- **IF NOT EXISTS** — idempotent creation, safe to re-run on every app load

</v-clicks>

<br>

<v-click>

> All of this runs **in the browser tab**, no server required.

</v-click>

---

# Seeding Data

`src/seed.ts` — idempotent seeding with a guard check

```ts {all|1-3|5-7|9-11}
// Check if already seeded
const existing = await db.query<{ count: number }>(
  'SELECT COUNT(*)::int as count FROM categories'
)
if (existing.rows[0].count > 0) return

// Insert categories
for (const name of categories) {
  await db.query('INSERT INTO categories (name) VALUES ($1)', [name])
}

// Insert questions with parameterized queries
await db.query(
  `INSERT INTO questions
     (category_id, question_text, correct_answer,
      wrong_answer_1, wrong_answer_2, wrong_answer_3)
   VALUES ($1, $2, $3, $4, $5, $6)`,
  [categoryId, q.question_text, q.correct_answer, ...q.wrong_answers]
)
```

<v-clicks>

- Guard prevents re-seeding on subsequent loads
- Parameterized queries (`$1`, `$2`, ...) — safe from SQL injection
- 35 questions across 4 categories seeded on first run

</v-clicks>

---

# Querying with JOINs

`src/screens/GameScreen.tsx` — fetch random questions with a JOIN

```ts {all|1-7|8|9}
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
```

<v-clicks>

- **JOIN** across tables — just like server-side Postgres
- **ORDER BY RANDOM()** — shuffled questions every game
- **LIMIT** — fetch exactly 10 per round
- Dynamic **WHERE** clause for category filtering

</v-clicks>

---

# Recording Game Sessions

`src/screens/GameScreen.tsx` — INSERT with RETURNING, then UPDATE on completion

```ts {all|1-4|6-9}
// Start a session
const session = await db.query<{ id: number }>(
  `INSERT INTO game_sessions (player_id, category_id, total_questions)
   VALUES ($1, $2, $3) RETURNING id`,
  [playerId, categoryId, fetched.length],
)

// Complete the session
await db.query(
  `UPDATE game_sessions
   SET score = $1, completed_at = CURRENT_TIMESTAMP
   WHERE id = $2`,
  [newScore, sessionId],
)
```

<v-clicks>

- **INSERT ... RETURNING** — get the new row's ID in one round-trip
- **UPDATE with CURRENT_TIMESTAMP** — mark completion time
- Every answer is also recorded individually in the `answers` table

</v-clicks>

---

# React Integration

The `@electric-sql/pglite-react` package provides three building blocks:

```tsx
// 1. Provide the db instance to the component tree
<PGliteProvider db={db}>
  <App />
</PGliteProvider>

// 2. Access the db instance from any component
const db = usePGlite()

// 3. Subscribe to live query results — auto-updates on data changes
const leaderboard = useLiveQuery(`
  SELECT p.name, COUNT(*) as games,
         MAX(gs.score) as best, ROUND(AVG(gs.score), 1) as avg
  FROM game_sessions gs
  JOIN players p ON gs.player_id = p.id
  WHERE gs.completed_at IS NOT NULL
  GROUP BY p.id, p.name
  ORDER BY best DESC
`)
```

<v-click>

`useLiveQuery` re-renders automatically when underlying data changes — no polling, no manual refresh.

</v-click>

---
layout: center
class: text-center
---

# Key Takeaways

<v-clicks>

**PGlite gives you real Postgres in the browser.**

No server. No Docker. No setup.

JOINs, foreign keys, constraints, timestamps — it's all there.

Persist to IndexedDB with a single config option.

Reactive UI with `useLiveQuery` — the database drives the view.

</v-clicks>

---
layout: center
class: text-center
---

# Demo Time

<div class="text-2xl mt-4">

Let's play some trivia.

</div>

<style>
.slidev-layout blockquote {
  border-left-color: #63b3ed !important;
}
</style>
