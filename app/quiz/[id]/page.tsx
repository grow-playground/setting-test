/* eslint-disable react/no-children-prop */
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Quiz } from './quiz';
import { getQuiz } from '@/hooks/quiz';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from 'react-markdown';

export default async function Page() {
  const queryClient = new QueryClient();

  const quiz = await queryClient.fetchQuery({
    queryKey: ['quiz'],
    queryFn: () => getQuiz(1),
  });

  const DUMMY_DATA = `
  ## 이거는 2번 문제@@
  T에서 K 프로퍼티만 선택해 새로운 오브젝트
  타입을 만드는 내장 제네릭 Pick
  이를 사용하지 않고 구현하세요.

  - 일단 이렇게
    - 이건 이렇게
      - 저거 저렇게
    - 이렇게
    - 저렇게
  - 그리고 이렇게

  1. 이렇게
  2. 요렇게
  3. 호호호

  **이렇게**

  ~~이렇게~~

  - [ ] Task list 1
  - [ ] Pending task list 2
  - [x] Completed task list 3
  - [x] Completed task list 4 
  
  \`\`\`tsx
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  \`\`\``;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>나는 서버 컴포넌트에서 불러온 값!</div>
      <div>{JSON.stringify(quiz)}</div>
      <Quiz />
      <div className="text-left">
        <Markdown
          children={DUMMY_DATA}
          components={{
            code({ className, children, ...rest }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={dracula}
                  ref={null}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </HydrationBoundary>
  );
}
