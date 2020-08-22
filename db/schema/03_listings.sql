
DROP TABLE IF EXISTS listings
CASCADE;

CREATE TABLE listings
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  condition VARCHAR(255) NOT NULL,
  time_posted TIMESTAMP NOT NULL,
  description TEXT,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  active BOOLEAN NOT NULL DEFAULT TRUE
  -- simply active to start db
);


