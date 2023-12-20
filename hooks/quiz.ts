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
    .select(`*`)
    .eq('quiz_id', quizId);

  return data;
}

export async function upsertQuizSubmission(params: {
  quizId: number;
  choiceId: number;
  success: boolean;
}) {
  const { quizId, choiceId, success } = params;

  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase
    .from('quizsubmissions')
    .upsert({
      quiz_id: quizId,
      choice_id: choiceId,
      success,
      updated_at: new Date().toISOString(),
    })
    .select();

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
