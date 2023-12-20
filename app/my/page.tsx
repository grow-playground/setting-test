import { QuizCard } from '@/components/quiz/quiz-card';
import { getSubmittedQuiz } from '@/hooks/quiz';
import { createClient } from '@/utils/supabase/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  const submittedQuiz = await queryClient.fetchQuery({
    queryKey: ['submitted-quiz', user!.id],
    queryFn: () => getSubmittedQuiz({ userId: user!.id }),
  });

  return (
    <>
      <h1 className="text-right text-3xl font-bold">
        {user?.user_metadata.user_name}
      </h1>
      <h2 className="text-xl font-bold">풀었던 퀴즈</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {submittedQuiz && submittedQuiz.length ? (
          <ul className="flex flex-col gap-6">
            {submittedQuiz.map(
              ({ quiz_id, success, quizzes }) =>
                quizzes && (
                  <QuizCard
                    key={quiz_id}
                    status={success ? 'correct' : 'wrong'}
                    difficulty={quizzes.difficulty}
                    title={quizzes.title}
                    summary={quizzes.summary}
                  />
                )
            )}
          </ul>
        ) : (
          <p>제출한 퀴즈가 없습니다.</p>
        )}
      </HydrationBoundary>
    </>
  );
}
