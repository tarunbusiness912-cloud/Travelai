-- Create Budget Goals Table
CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL, -- e.g., 'Flights', 'Food', 'Accommodation'
    amount_limit NUMERIC(10, 2) NOT NULL CHECK (amount_limit > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT one_scope_only CHECK (
        (user_id IS NOT NULL AND group_id IS NULL) OR 
        (user_id IS NULL AND group_id IS NOT NULL)
    )
);

-- Enable Row Level Security
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their personal budgets" ON public.budgets
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view group budgets they belong to" ON public.budgets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = budgets.group_id 
            AND group_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can modify group budgets they belong to" ON public.budgets
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = budgets.group_id 
            AND group_members.user_id = auth.uid()
        )
    );