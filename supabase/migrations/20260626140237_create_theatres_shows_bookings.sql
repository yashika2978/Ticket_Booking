/*
# Create theatres, shows, and bookings tables

1. New Tables
- `theatres`: Theatre/cinema information
  - `id`, `name`, `city`, `address`, `rating`, `screens`, `distance`, `created_at`

- `shows`: Movie show timings at theatres
  - `id`, `movie_id`, `theatre_id`, `screen_type`, `show_time`, `price`, `seats_available`, `total_seats`, `created_at`

- `bookings`: User ticket bookings
  - `id`, `user_id`, `show_id`, `seats`, `total_amount`, `status`, `booking_date`, `created_at`

2. Security
- Enable RLS on all tables
- Public read for theatres and shows
- User-scoped bookings (users can only see their own bookings)
*/

CREATE TABLE IF NOT EXISTS theatres (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text,
  address text,
  rating numeric DEFAULT 0,
  screens integer DEFAULT 1,
  distance text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id uuid REFERENCES movies(id) ON DELETE CASCADE,
  theatre_id uuid REFERENCES theatres(id) ON DELETE CASCADE,
  screen_type text DEFAULT '2D',
  show_time timestamptz,
  price numeric DEFAULT 0,
  seats_available integer DEFAULT 0,
  total_seats integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  show_id uuid REFERENCES shows(id) ON DELETE CASCADE,
  seats text[] DEFAULT '{}',
  total_amount numeric DEFAULT 0,
  status text DEFAULT 'pending',
  booking_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE theatres ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Theatres: public read
DROP POLICY IF EXISTS "theatres_select_public" ON theatres;
CREATE POLICY "theatres_select_public" ON theatres FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "theatres_insert_admin" ON theatres;
CREATE POLICY "theatres_insert_admin" ON theatres FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "theatres_update_admin" ON theatres;
CREATE POLICY "theatres_update_admin" ON theatres FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "theatres_delete_admin" ON theatres;
CREATE POLICY "theatres_delete_admin" ON theatres FOR DELETE
  TO authenticated USING (true);

-- Shows: public read
DROP POLICY IF EXISTS "shows_select_public" ON shows;
CREATE POLICY "shows_select_public" ON shows FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "shows_insert_admin" ON shows;
CREATE POLICY "shows_insert_admin" ON shows FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "shows_update_admin" ON shows;
CREATE POLICY "shows_update_admin" ON shows FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "shows_delete_admin" ON shows;
CREATE POLICY "shows_delete_admin" ON shows FOR DELETE
  TO authenticated USING (true);

-- Bookings: user-scoped
DROP POLICY IF EXISTS "bookings_select_own" ON bookings;
CREATE POLICY "bookings_select_own" ON bookings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_insert_own" ON bookings;
CREATE POLICY "bookings_insert_own" ON bookings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_update_own" ON bookings;
CREATE POLICY "bookings_update_own" ON bookings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_delete_own" ON bookings;
CREATE POLICY "bookings_delete_own" ON bookings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
