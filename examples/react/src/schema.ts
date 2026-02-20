import type { PGliteWithLive } from '@electric-sql/pglite/live'

const schema = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  wrong_answer_1 TEXT NOT NULL,
  wrong_answer_2 TEXT NOT NULL,
  wrong_answer_3 TEXT NOT NULL
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
  score INT DEFAULT 0,
  total_questions INT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  session_id INT REFERENCES game_sessions(id),
  question_id INT REFERENCES questions(id),
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`

export async function initSchema(db: PGliteWithLive) {
  await db.exec(schema)
}
