/*
# Create events table

1. New Tables
- `events`: Stores event information (concerts, sports, comedy shows)
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `poster_url` (text)
  - `banner_url` (text)
  - `category` (text) - Event category (Concert, Sports, Comedy, etc.)
  - `event_date` (date)
  - `event_time` (text)
  - `venue` (text)
  - `city` (text)
  - `price` (numeric)
  - `rating` (numeric)
  - `is_live` (boolean)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `events`
- Allow public read access
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  poster_url text,
  banner_url text,
  category text,
  event_date date,
  event_time text,
  venue text,
  city text,
  price numeric DEFAULT 0,
  rating numeric DEFAULT 0,
  is_live boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select_public" ON events;
CREATE POLICY "events_select_public" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "events_insert_admin" ON events;
CREATE POLICY "events_insert_admin" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "events_update_admin" ON events;
CREATE POLICY "events_update_admin" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "events_delete_admin" ON events;
CREATE POLICY "events_delete_admin" ON events FOR DELETE
  TO authenticated USING (true);
