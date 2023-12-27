'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Quiz, QuizTable } from '@/libs/models';
import { Column, ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<QuizTable>[] = [
  {
    accessorKey: 'success',
    header: () => <div className="text-left">상태</div>,
    cell: ({ row }) => {
      const { success } = row.original;

      return <div>{JSON.stringify(success)}</div>;
    },
  },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => {
      const { title, summary, id } = row.original;

      return (
        <div className="max-w-[13rem]">
          <h3 className="truncate">
            <Link className="text-base font-semibold" href={`/quizzes/${id}`}>
              {title}
            </Link>
          </h3>
          <p className="truncate text-blue-500">{summary}</p>
        </div>
      );
    },
    /**
     * @description 참고 코드
     * https://github.com/TanStack/table/blob/a334f66a82a9b3b0b4e99e7a0cc99ba077aaf167/packages/table-core/src/filterFns.ts#L3-L16
     */
    filterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();

      return Boolean(
        row.getValue<string | null>(columnId)?.toLowerCase().includes(search)
      );
    },
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">난이도</DropdownMenuTrigger>
        <DropdownMenuContent>
          <Filter column={column} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const difficulty = String(row.getValue('difficulty'));

      return <div className="text-center">{difficulty}</div>;
    },
    filterFn: 'arrIncludesSome',
  },
];

function Filter({ column }: { column: Column<Quiz> }) {
  const onClickToggle =
    (difficulty: '쉬움' | '보통' | '어려움') =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.dataset.state === 'checked') {
        column.setFilterValue((olds: string[]) =>
          olds.filter((old) => old !== difficulty)
        );
      } else {
        column.setFilterValue((olds: string[]) => [
          ...(olds ?? []),
          difficulty,
        ]);
      }
    };

  const filterValue =
    (column.getFilterValue() as ['쉬움' | '보통' | '어려움']) ?? [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Checkbox
          id="easy-check"
          checked={filterValue.includes('쉬움')}
          onClick={onClickToggle('쉬움')}
        />
        <label htmlFor="easy-check">쉬움</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="medium-check"
          checked={filterValue.includes('보통')}
          onClick={onClickToggle('보통')}
        />
        <label htmlFor="medium-check">보통</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="hard-check"
          checked={filterValue.includes('어려움')}
          onClick={onClickToggle('어려움')}
        />
        <label htmlFor="hard-check">어려움</label>
      </div>
    </div>
  );
}
