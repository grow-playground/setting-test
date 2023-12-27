import { Separator } from '@/components/ui/separator';
import quizOptions from '@/services/quiz/options';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import UserInfo from './_components/user-info';
import QuizTable from './_components/quiz-table';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log(id);

  const queryClient = new QueryClient();

  const submittedQuiz = await queryClient.fetchQuery(
    quizOptions.submitted(id ?? '')
  );

  return (
    <>
      <UserInfo />
      <Separator className="my-4" />

      <h2 className="text-xl font-bold">제출한 퀴즈</h2>
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
