import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getQuiz } from '@/hooks/quiz';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from 'react-markdown';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const quiz = await queryClient.fetchQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => getQuiz(quizId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="text-left">
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
      </div>
    </HydrationBoundary>
  );
}
