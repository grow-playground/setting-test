'use client';

import { columns } from '@/components/quiz/table/columns';
import DataTable from '@/components/quiz/table/data-table';
import { useGetQuizzes } from '@/services/quiz/hooks';

export default function QuizTable() {
  const { data: quizzes } = useGetQuizzes();

  return (
    <div>
      <DataTable columns={columns} data={quizzes} />
    </div>
  );
}
