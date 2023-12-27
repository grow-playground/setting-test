'use client';

import { columns } from '@/components/quiz/table/columns';
import DataTable from '@/components/quiz/table/data-table';
import { useGetSubmittedQuiz } from '@/services/quiz/hooks';

type QuizTableProps = {
  userId: string;
};

export default function QuizTable({ userId }: QuizTableProps) {
  const { data } = useGetSubmittedQuiz(userId);

  return <div>{data && <DataTable columns={columns} data={data} />}</div>;
}
