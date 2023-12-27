'use client';

import { columns } from '@/components/quiz/table/columns';
import DataTable from '@/components/quiz/table/data-table';
import { useGetQuizzes } from '@/services/quiz/hooks';

type QuizTableProps = {
  userId?: string;
};

export default function QuizTable({ userId }: QuizTableProps) {
  const { data: quizzes } = useGetQuizzes(userId);

  return <div>{quizzes && <DataTable columns={columns} data={quizzes} />}</div>;
}
