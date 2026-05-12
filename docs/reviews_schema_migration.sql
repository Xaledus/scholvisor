-- reviews table: ensure all columns expected by the app exist
-- Safe to run multiple times — ADD COLUMN IF NOT EXISTS is idempotent.
-- Run in Supabase SQL editor.

ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS school_id           uuid REFERENCES schools(id),
  ADD COLUMN IF NOT EXISTS school_slug         text,
  ADD COLUMN IF NOT EXISTS relationship        text,
  ADD COLUMN IF NOT EXISTS child_grade         text,
  ADD COLUMN IF NOT EXISTS attendance_period   text,
  ADD COLUMN IF NOT EXISTS nationality         text,
  ADD COLUMN IF NOT EXISTS display_name        text,
  ADD COLUMN IF NOT EXISTS email               text,
  ADD COLUMN IF NOT EXISTS strengths           text,
  ADD COLUMN IF NOT EXISTS frustrations        text,
  ADD COLUMN IF NOT EXISTS consent_given       boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS status              text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS submitted_at        timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS rejection_reason    text,
  ADD COLUMN IF NOT EXISTS moderated_at        timestamptz,
  ADD COLUMN IF NOT EXISTS academic_quality    numeric,
  ADD COLUMN IF NOT EXISTS communication_admin numeric,
  ADD COLUMN IF NOT EXISTS integration_wellbeing numeric,
  ADD COLUMN IF NOT EXISTS facilities_activities numeric,
  ADD COLUMN IF NOT EXISTS value_for_money     numeric,
  ADD COLUMN IF NOT EXISTS marketing_vs_reality numeric,
  ADD COLUMN IF NOT EXISTS islamic_environment  numeric;

-- Fix existing review with null school_id (run once)
UPDATE reviews
SET
  school_id = (
    SELECT id FROM schools
    WHERE slug LIKE 'alice-smith%' AND status = 'active'
    LIMIT 1
  ),
  school_slug = (
    SELECT slug FROM schools
    WHERE slug LIKE 'alice-smith%' AND status = 'active'
    LIMIT 1
  )
WHERE id = '9470bd1c-2205-4413-9f07-d869e7b155ca';

-- Verify all columns present
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'reviews'
ORDER BY ordinal_position;
