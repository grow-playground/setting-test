import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Quiz } from './quiz';
import { getQuizzes } from '@/hooks/quiz';

export default async function Page() {
  const queryClient = new QueryClient();

  const quizzes = await queryClient.fetchQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>나는 서버 컴포넌트에서 불러온 값!</div>
      <div>{JSON.stringify(quizzes)}</div>
      <Quiz />
    </HydrationBoundary>
  );
}
