import { Separator } from '@/components/ui/separator';
import UserInfo from './_components/user-info';
import QuizTable from './_components/quiz-table';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <UserInfo userId={id} />
      <Separator className="my-4" />

      <h2 className="text-xl font-bold">제출한 퀴즈</h2>
      <QuizTable userId={id} />
    </>
  );
}
