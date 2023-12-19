'use client';

import { useGetQuizzes } from '@/hooks/quiz';

export function Quiz() {
  const { data: quizzes } = useGetQuizzes();

  console.log(quizzes);
  return (
    <div>
      <div>나는 클라이언트 컴포넌트에서 불러온 값!</div>
      {JSON.stringify(quizzes)}
    </div>
  );
}
