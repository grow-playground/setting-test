import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';

export async function getQuiz() {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase.from('quizzes').select('*');

  return data;
}

export async function getSubmittedQuiz({ userId }: { userId: string }) {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase
    .from('quizsubmissions')
    .select(`*, quizzes (id, *)`)
    .eq('user_id', userId);

  return data;
}

export function useGetQuiz() {
  return useSuspenseQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz,
  });
}

export function useGetSubmittedQuiz({ userId }: { userId: string }) {
  return useSuspenseQuery({
    queryKey: ['submitted-quiz', userId],
    queryFn: () => getSubmittedQuiz({ userId }),
  });
}
