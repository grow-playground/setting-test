import Link from 'next/link';
import Button from '@/components/common/buttons/button';

export default function Page({ params }: { params: { id: string } }) {
  const quizId = Number(params.id) ?? 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-semibold">준비중인 기능이에요!</h2>
      <Link replace href={`/quizzes/${quizId}`}>
        <Button>퀴즈로 이동하기</Button>
      </Link>
    </div>
  );
}
