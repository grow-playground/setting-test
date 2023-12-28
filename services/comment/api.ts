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

  postCommentOfQuiz: async ({
    userId,
    quizId,
    content,
  }: {
    userId: string;
    quizId: number;
    content: string;
  }) => {
    const supabase: SupabaseClient<Database> = createClient();

    await supabase
      .from('comments')
      .insert({ user_id: userId, quiz_id: quizId, content });
  },
};

export default commentAPI;
