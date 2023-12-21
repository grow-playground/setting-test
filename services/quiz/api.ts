import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const quizAPI = {
  getQuiz: async (id: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('quizzes')
      .select(`*, users!quizzes_user_id_fkey(id, name)`)
      .eq('id', id)
      .limit(1)
      .single();

    return data;
  },

  getChoicesOfQuiz: async (quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('choices')
      .select(`id, quiz_id, description`)
      .eq('quiz_id', quizId);

    return data;
  },

  postQuizSubmission: async (params: { quizId: number; choiceId: number }) => {
    const { quizId, choiceId } = params;

    const res = await fetch('/api/quiz-submission', {
      method: 'POST',
      body: JSON.stringify({
        quizId,
        choiceId,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }

    return json;
  },
};

export default quizAPI;
