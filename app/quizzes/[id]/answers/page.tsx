import quizOptions from '@/services/quiz/options';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import QuizAnswer from './_components/quiz-answer';
import Comments from './_components/comments';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Separator } from '@/components/ui/separator';
import commentOptions from '@/services/comment/options';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery(quizOptions.answers(quizId));
  await queryClient.prefetchQuery(commentOptions.quiz(quizId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizAnswer quizId={quizId} />
      <Separator className="my-4" />
      <Comments disable={session} quizId={quizId} />
    </HydrationBoundary>
  );
}
