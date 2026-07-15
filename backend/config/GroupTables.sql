-- Run this file in Supabase Dashboard -> SQL Editor.
-- It creates the group tables and allows authenticated users to manage only their own groups.

CREATE TABLE IF NOT EXISTS public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(trim(name)) > 0),
  description TEXT,
  destination TEXT,
  start_date DATE,
  end_date DATE,
  cover_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS destination TEXT;
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS cover_image TEXT;

CREATE TABLE IF NOT EXISTS public.group_members (
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.group_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view groups" ON public.groups;
DROP POLICY IF EXISTS "Users can create groups" ON public.groups;
DROP POLICY IF EXISTS "Owners can update groups" ON public.groups;
DROP POLICY IF EXISTS "Owners can delete groups" ON public.groups;
CREATE POLICY "Members can view groups" ON public.groups FOR SELECT USING (
  owner_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.group_members WHERE group_members.group_id = groups.id AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "Users can create groups" ON public.groups FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Owners can update groups" ON public.groups FOR UPDATE USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Owners can delete groups" ON public.groups FOR DELETE USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users can view their memberships" ON public.group_members;
DROP POLICY IF EXISTS "Owners can add themselves as members" ON public.group_members;
DROP POLICY IF EXISTS "Owners can remove memberships" ON public.group_members;
CREATE POLICY "Users can view their memberships" ON public.group_members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Owners can add themselves as members" ON public.group_members FOR INSERT WITH CHECK (
  user_id = auth.uid() AND EXISTS (
    SELECT 1 FROM public.groups WHERE groups.id = group_members.group_id AND groups.owner_id = auth.uid()
  )
);
CREATE POLICY "Owners can remove memberships" ON public.group_members FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.groups WHERE groups.id = group_members.group_id AND groups.owner_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Members can view group activity" ON public.group_activity;
DROP POLICY IF EXISTS "Members can add group activity" ON public.group_activity;
CREATE POLICY "Members can view group activity" ON public.group_activity FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.group_members WHERE group_members.group_id = group_activity.group_id AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "Members can add group activity" ON public.group_activity FOR INSERT WITH CHECK (
  user_id = auth.uid() AND EXISTS (
    SELECT 1 FROM public.group_members WHERE group_members.group_id = group_activity.group_id AND group_members.user_id = auth.uid()
  )
);
