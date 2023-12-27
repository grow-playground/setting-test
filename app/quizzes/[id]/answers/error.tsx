'use client';

import Button from '@/components/common/buttons/button';
import { useParams, useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { id: quizId } = useParams();

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-semibold">{error.message}</h2>
      <Button onClick={() => router.push(`/quizzes/${quizId}`)}>
        문제로 이동하기
      </Button>
    </div>
  );
}
