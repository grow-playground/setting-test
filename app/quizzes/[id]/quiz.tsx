'use client';

import Button from '@/components/common/buttons/button';
import useTempModal from '@/components/common/modals/use-temp-modal';
import { useGetQuiz } from '@/hooks/quiz';

export function Quiz() {
  const { data: quiz } = useGetQuiz();
  const { open } = useTempModal();

  const openModal = () => {
    open();
  };

  return (
    <div>
      {/* <div>나는 클라이언트 컴포넌트에서 불러온 값!</div> */}
      {JSON.stringify(quiz)}
      <Button onClick={openModal}>모달 테스트</Button>
    </div>
  );
}
