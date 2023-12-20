import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';

export async function getQuiz(id: number) {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase
    .from('quizzes')
    .select(`*, users (id, name)`)
    .eq('id', id)
    .single();

  return data;
}

export async function getChoicesOfQuiz(quizId: number) {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase
    .from('choices')
    .select(`id, quiz_id, description`)
    .eq('quiz_id', quizId);

  return data;
}

export function useGetQuiz(id: number) {
  return useSuspenseQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(id),
  });
}

export function useGetChoicesOfQuiz(quizId: number) {
  return useSuspenseQuery({
    queryKey: ['quiz', quizId, 'choices'],
    queryFn: () => getChoicesOfQuiz(quizId),
  });
}
