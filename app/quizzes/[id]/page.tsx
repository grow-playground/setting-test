import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Quiz } from './quiz';
import { getQuiz } from '@/hooks/quiz';

export default async function Page() {
  const queryClient = new QueryClient();

  const quiz = await queryClient.fetchQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>나는 서버 컴포넌트에서 불러온 값!</div>
      <div>{JSON.stringify(quiz)}</div>
      <Quiz />
    </HydrationBoundary>
  );
}
