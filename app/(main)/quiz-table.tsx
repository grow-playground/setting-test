'use client';

import { columns } from '@/components/quiz/table/columns';
import DataTable from '@/components/quiz/table/data-table';
import { useGetQuizzes } from '@/services/quiz/hooks';

type QuizTableProps = {
  userId?: string;
};

export default function QuizTable({ userId }: QuizTableProps) {
  const { data: quizzes } = useGetQuizzes(userId);

  const quizzesLength = quizzes.length;
  const solvedQuizziesLength = quizzes.filter((quiz) => quiz.success).length;

  return (
    <div>
      <h2 className="text-lg font-bold">전체 퀴즈</h2>
      <p className="text-slate-500">
        수록된 {quizzesLength}개의 문제 중 {solvedQuizziesLength}개를 풀었어요!
        ({Math.round((solvedQuizziesLength / quizzesLength) * 100)}%)
      </p>

      {quizzes && <DataTable columns={columns} data={quizzes} />}
    </div>
  );
}
