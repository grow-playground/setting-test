import quizOptions from '@/services/quiz/options';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import QuizAnswer from './quiz-answer';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  await queryClient.prefetchQuery(quizOptions.answers(quizId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizAnswer quizId={quizId} />
    </HydrationBoundary>
  );
}
