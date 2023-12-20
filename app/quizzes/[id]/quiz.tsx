'use client';

import { useGetQuiz } from '@/hooks/quiz';

export function Quiz({ id }: { id: number }) {
  const { data: quiz } = useGetQuiz(id);

  return (
    <div>
      <div>나는 클라이언트 컴포넌트에서 불러온 값!</div>
      {JSON.stringify(quiz)}
    </div>
  );
}
