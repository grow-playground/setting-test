import quizOptions from '@/services/quiz/options';
import quizSubmissionOptions from '@/services/quiz-submission/options';
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
import Link from 'next/link';
import Button from '@/components/common/buttons/button';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const [submission] = await Promise.all([
    queryClient.fetchQuery(
      quizSubmissionOptions.detailOfQuiz(session?.user.id ?? '', quizId)
    ),
    queryClient.prefetchQuery(quizOptions.answers(quizId)),
    queryClient.prefetchQuery(commentOptions.quiz(quizId)),
  ]);

  if (submission?.success) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuizAnswer quizId={quizId} />
        <Separator className="my-4" />
        <Comments
          disable={!session}
          quizId={quizId}
          userId={session?.user.id}
        />
      </HydrationBoundary>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-xl font-semibold">퀴즈를 먼저 맞춰주세요!</h2>
        <Link replace href={`/quizzes/${quizId}`}>
          <Button>퀴즈로 이동하기</Button>
        </Link>
      </div>
    );
  }
}
