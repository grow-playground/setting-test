import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const quizSubmissionAPI = {
  getSubmissionsOfUser: async (userId: string) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('quizsubmissions')
      .select(`*, quizzes (id, *)`)
      .eq('user_id', userId);

    return data;
  },

  getSubmissionOfUser: async (userId: string, quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('quizsubmissions')
      .select(`*, quizzes (id, *)`)
      .match({ user_id: userId, quiz_id: quizId })
      .limit(1)
      .single();

    return data;
  },

  postSubmission: async (params: { quizId: number; choiceId: number }) => {
    const { quizId, choiceId } = params;

    const res = await fetch('/api/quiz-submission', {
      method: 'POST',
      body: JSON.stringify({ quizId, choiceId }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }

    return json;
  },
};

export default quizSubmissionAPI;
