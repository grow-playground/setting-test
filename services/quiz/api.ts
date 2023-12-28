import { QuizTable, QuizTableSchema } from '@/libs/models';
import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { type Inputs as QuizInputs } from '@/app/quizzes/writer/_components/writer-form-schema';

const quizAPI = {
  getQuizzes: async (userId?: string) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('*')
      .order('id', { ascending: true });

    const { data: userquizSubmissions } = userId
      ? await supabase
          .from('quizsubmissions')
          .select('*')
          .eq('user_id', userId ?? '')
      : { data: null };

    const quizzesTable = await QuizTableSchema.transform((quiz) => {
      const success = userquizSubmissions?.find(
        (submission) => submission.quiz_id === quiz.id
      )?.success;

      return { ...quiz, success };
    })
      .array()
      .parseAsync(quizzes);

    return quizzesTable;
  },

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

  getSubmittedQuiz: async (userId: string) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('quizsubmissions')
      .select(`success, ...quizzes!quizsubmissions_quiz_id_fkey(*)`)
      .eq('user_id', userId);

    return data as unknown as QuizTable[];
  },

  getChoicesOfQuiz: async (quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('choices')
      .select(`id, quiz_id, description`)
      .eq('quiz_id', quizId);

    return data;
  },

  getHintsOfQuiz: async (quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('hints')
      .select('*')
      .eq('quiz_id', quizId);

    return data;
  },

  postQuiz: async (params: Omit<QuizInputs, 'hintInput'>) => {
    const supabase: SupabaseClient<Database> = createClient();

    const {
      title,
      summary,
      hints,
      difficulty,
      description,
      choices,
      answer,
      answerDescription,
    } = params;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: quiz } = await supabase
      .from('quizzes')
      .insert({
        title,
        summary,
        description,
        difficulty,
        user_id: session?.user.id,
      })
      .select()
      .limit(1)
      .single();

    if (!quiz) {
      throw new Error('퀴즈 생성 실패');
    }

    await Promise.all([
      supabase.from('hints').insert(
        hints.map((hint) => ({
          quiz_id: quiz.id,
          description: hint.value,
        }))
      ),
      supabase.from('choices').insert(
        choices.map((choice, idx) => ({
          quiz_id: quiz.id,
          description: choice.value,
          answer: idx + 1 === answer ? true : false,
          answer_description: idx + 1 === answer ? answerDescription : null,
        }))
      ),
    ]);

    return quiz;
  },

  getAnswersOfQuiz: async (quizId: number) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('choices')
      .select('description, answer_description')
      .eq('quiz_id', quizId)
      .eq('answer', true)
      .limit(1)
      .single();

    if (!data) {
      throw new Error('정답이 존재하지 않습니다.');
    }

    return data;
  },

  postQuizSubmission: async (params: { quizId: number; choiceId: number }) => {
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

export default quizAPI;
