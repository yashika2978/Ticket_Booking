/*
# Create movies table

1. New Tables
- `movies`: Stores movie information for the ticket booking platform
  - `id` (uuid, primary key)
  - `title` (text, not null) - Movie title
  - `poster_url` (text) - Movie poster image URL
  - `banner_url` (text) - Movie banner image URL
  - `rating` (numeric) - Movie rating (0-5)
  - `duration` (text) - Movie duration (e.g., "2h 30m")
  - `genre` (text[]) - Array of genres
  - `language` (text[]) - Array of languages
  - `release_date` (date) - Release date
  - `age_rating` (text) - Age rating (U, UA, A)
  - `synopsis` (text) - Movie description
  - `cast_members` (text[]) - Array of cast members
  - `director` (text) - Director name
  - `trailer_url` (text) - Trailer video URL
  - `gallery` (text[]) - Array of gallery image URLs
  - `is_trending` (boolean) - Whether movie is trending
  - `is_upcoming` (boolean) - Whether movie is upcoming
  - `created_at` (timestamp)

2. Security
- Enable RLS on `movies`
- Allow public read access (no auth required for browsing)
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  poster_url text,
  banner_url text,
  rating numeric DEFAULT 0,
  duration text,
  genre text[] DEFAULT '{}',
  language text[] DEFAULT '{}',
  release_date date,
  age_rating text,
  synopsis text,
  cast_members text[] DEFAULT '{}',
  director text,
  trailer_url text,
  gallery text[] DEFAULT '{}',
  is_trending boolean DEFAULT false,
  is_upcoming boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "movies_select_public" ON movies;
CREATE POLICY "movies_select_public" ON movies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "movies_insert_admin" ON movies;
CREATE POLICY "movies_insert_admin" ON movies FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "movies_update_admin" ON movies;
CREATE POLICY "movies_update_admin" ON movies FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "movies_delete_admin" ON movies;
CREATE POLICY "movies_delete_admin" ON movies FOR DELETE
  TO authenticated USING (true);
