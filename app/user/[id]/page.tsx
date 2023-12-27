import QuizTable from '@/app/(main)/quiz-table';
import quizOptions from '@/services/quiz/options';
import { createClient } from '@/utils/supabase/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log(id);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  const submittedQuiz = await queryClient.fetchQuery(
    quizOptions.submitted(id ?? '')
  );

  return (
    <>
      <h1 className="text-right text-3xl font-bold">
        {user?.user_metadata.user_name}
      </h1>
      <h2 className="text-xl font-bold">풀었던 퀴즈</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {submittedQuiz && submittedQuiz.length ? (
          <QuizTable userId={id} />
        ) : (
          <p>제출한 퀴즈가 없습니다.</p>
        )}
      </HydrationBoundary>
    </>
  );
}
