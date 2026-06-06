-- ============================================================
-- Migration: Auth + Complaint Updates
-- Run this in Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. Fix table-level permissions (fixes "permission denied" on complaints)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.complaints TO anon, authenticated;
GRANT UPDATE ON TABLE public.complaints TO authenticated;

-- 2. Create complaint_updates table
--    Users append updates (text + photos) to their own complaints over time.
--    The original complaint record stays immutable.
CREATE TABLE IF NOT EXISTS complaint_updates (
  id          BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  complaint_id BIGINT NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  update_text TEXT,
  file_urls   TEXT[] DEFAULT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_complaint_updates_complaint_id
  ON complaint_updates(complaint_id);

GRANT SELECT, INSERT ON TABLE public.complaint_updates TO anon, authenticated;
GRANT USAGE ON SEQUENCE complaint_updates_id_seq TO authenticated;

-- 3. Row-Level Security on complaint_updates
ALTER TABLE complaint_updates ENABLE ROW LEVEL SECURITY;

-- Anyone can read updates
CREATE POLICY "Public read on complaint_updates"
  ON complaint_updates FOR SELECT USING (true);

-- Only authenticated users can insert updates for complaints they own (matched by email)
CREATE POLICY "Owner insert on complaint_updates"
  ON complaint_updates FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM complaints
      WHERE id = complaint_id
        AND email = (auth.jwt() ->> 'email')
    )
  );

-- 4. Allow complaint owners to update their own complaint (for future edits)
--    The "Disable updates" policy previously blocks this — drop it first.
DROP POLICY IF EXISTS "Disable updates on complaints" ON complaints;

CREATE POLICY "Owner update on complaints"
  ON complaints FOR UPDATE TO authenticated
  USING  (email = (auth.jwt() ->> 'email'))
  WITH CHECK (email = (auth.jwt() ->> 'email'));

-- 5. Storage bucket for evidence photos
--    If you haven't already, create this in Supabase Dashboard:
--    Storage → New bucket → name: "complaints" → Public bucket: ON
--
--    Then run these policies:
INSERT INTO storage.buckets (id, name, public)
  VALUES ('complaints', 'complaints', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read complaint files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'complaints');

CREATE POLICY "Auth upload complaint files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'complaints');

-- ============================================================
-- After running this migration, go to Supabase Dashboard:
--   Authentication → URL Configuration
--   Add your site URL to "Redirect URLs", e.g.:
--     https://ubercheats.info/auth/callback
--     http://localhost:3000/auth/callback
-- ============================================================
