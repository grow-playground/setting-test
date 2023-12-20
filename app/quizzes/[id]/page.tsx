import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getQuiz, getChoicesOfQuiz } from '@/hooks/quiz';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from 'react-markdown';
import Link from 'next/link';
import ChoiceForm from './choice-form';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const quiz = await queryClient.fetchQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => getQuiz(quizId),
  });

  await queryClient.fetchQuery({
    queryKey: ['quiz', quizId, 'choices'],
    queryFn: () => getChoicesOfQuiz(quizId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4">
        <section className="mb-10">
          <h2 className="m-0">출제자</h2>
          {/* TODO: 추후 상세 유저 페이지 라우팅 경로로 변경하기 */}
          <Link href={`/users/${quiz?.users?.id}`}>{quiz?.users?.name}</Link>
        </section>

        <section className="mb-10">
          <h2 className="m-0">문제</h2>
          <Markdown
            components={{
              code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={dracula}
                    ref={null}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {quiz?.description}
          </Markdown>
        </section>

        <section className="mb-10">
          <ChoiceForm quizId={quizId} />
        </section>
      </div>
    </HydrationBoundary>
  );
}
