import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import MarkDown from '@/components/ui/markdown';
import Link from 'next/link';
import ChoiceForm from './choice-form';
import quizOptions from '@/services/quiz/options';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const [quiz] = await Promise.all([
    queryClient.fetchQuery(quizOptions.detail(quizId)),
    queryClient.fetchQuery(quizOptions.choices(quizId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mb-10">
        <h2 className="text-2xl font-bold">출제자</h2>
        {/* TODO: 추후 상세 유저 페이지 라우팅 경로로 변경하기 */}
        <Link className="underline" href={`/users/${quiz?.users?.id}`}>
          {quiz?.users?.name}
        </Link>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold">문제</h2>
        <MarkDown style={dracula}>{quiz?.description ?? ''}</MarkDown>
      </section>

      <section className="mb-10">
        <ChoiceForm quizId={quizId} />
      </section>
    </HydrationBoundary>
  );
}
