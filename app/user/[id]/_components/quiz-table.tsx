import { columns } from '@/components/quiz/table/columns';
import DataTable from '@/components/quiz/table/data-table';
import { QuizTable } from '../../../../libs/models';

type QuizTableProps = {
  quiz: QuizTable[];
};

export default function QuizTable({ quiz }: QuizTableProps) {
  return (
    <div>
      <DataTable columns={columns} data={quiz} />
    </div>
  );
}
