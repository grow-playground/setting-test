'use client';

import Button from '@/components/common/buttons/button';
import { useGetQuiz } from '@/services/quiz/hooks';

export function Quiz({ id }: { id: number }) {
  const { data: quiz } = useGetQuiz(id);
  const openModal = () => {
    open();
  };

  return (
    <div className="w-full break-all">
      <div>나는 클라이언트 컴포넌트에서 불러온 값!</div>
      {JSON.stringify(quiz)}
      <Button onClick={openModal}>모달 테스트</Button>
    </div>
  );
}
