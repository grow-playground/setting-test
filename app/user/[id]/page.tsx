import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import quizOptions from '@/services/quiz/options';
import userOptions from '@/services/user/options';
import { Separator } from '@/components/ui/separator';
import UserInfo from './_components/user-info';
import QuizTable from './_components/quiz-table';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const [userInfo, submittedQuiz] = await Promise.all([
    queryClient.fetchQuery(userOptions.info(id)),
    queryClient.fetchQuery(quizOptions.submitted(id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {userInfo && <UserInfo info={userInfo} />}
      <Separator className="my-4" />

      <h2 className="text-xl font-bold">제출한 퀴즈</h2>
      <QuizTable quiz={submittedQuiz} />
    </HydrationBoundary>
  );
}
