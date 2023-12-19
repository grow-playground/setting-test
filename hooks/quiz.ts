import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';

export async function getQuizzes() {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase.from('quizzes').select('*');

  return data;
}

export async function getQuiz(id: number) {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase.from('quizzes').select('*').eq('id', id);

  return data;
}

export function useGetQuizzes() {
  return useSuspenseQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  });
}

export function useGetQuiz(id: number) {
  return useSuspenseQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(id),
  });
}
