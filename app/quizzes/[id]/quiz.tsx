'use client';

import { useGetQuiz } from '@/hooks/quiz';

export function Quiz() {
  const { data: quiz } = useGetQuiz();

  console.log(quiz);
  return (
    <div className="w-full break-all">
      <div>나는 클라이언트 컴포넌트에서 불러온 값!</div>
      {JSON.stringify(quiz)}
    </div>
  );
}
