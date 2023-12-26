import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const commentAPI = {
  getCommentsOfQuiz: async (quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('comments')
      .select('*, users (name)')
      .eq('quiz_id', quizId)
      .order('updated_at', { ascending: false });

    return data;
  },
};

export default commentAPI;
