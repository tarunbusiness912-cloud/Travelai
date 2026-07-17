-- Drop old tables if they were partially created to ensure a clean slate
DROP TABLE IF EXISTS public.expense_splits CASCADE;
DROP TABLE IF EXISTS public.group_settlements CASCADE;
DROP TABLE IF EXISTS public.group_expenses CASCADE;

-- Create Expense Splitting Tables
CREATE TABLE public.group_expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
    paid_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    split_type VARCHAR(20) NOT NULL CHECK (split_type IN ('equal', 'percentage', 'custom')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.expense_splits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    expense_id UUID REFERENCES public.group_expenses(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    percentage NUMERIC(5, 2),
    UNIQUE(expense_id, profile_id)
);

CREATE TABLE public.group_settlements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.group_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_settlements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view group expenses if they belong to the group" ON public.group_expenses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_expenses.group_id 
            AND group_members.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can create group expenses if they belong to the group" ON public.group_expenses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_expenses.group_id 
            AND group_members.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can view expense splits if they belong to the group" ON public.expense_splits
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_expenses
            JOIN public.group_members ON group_members.group_id = group_expenses.group_id
            WHERE group_expenses.id = expense_splits.expense_id
            AND group_members.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert expense splits if they belong to the group" ON public.expense_splits
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_expenses
            JOIN public.group_members ON group_members.group_id = group_expenses.group_id
            WHERE group_expenses.id = expense_splits.expense_id
            AND group_members.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can view settlements if they belong to the group" ON public.group_settlements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_settlements.group_id 
            AND group_members.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can record settlements if they belong to the group" ON public.group_settlements
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_settlements.group_id 
            AND group_members.profile_id = auth.uid()
        )
    );