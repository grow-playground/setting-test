import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';

export async function getQuiz() {
  const supabase: SupabaseClient<Database> = createClient();

  const { data } = await supabase.from('notes').select('*');

  return data;
}

export function useGetQuiz() {
  return useSuspenseQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz,
  });
}
