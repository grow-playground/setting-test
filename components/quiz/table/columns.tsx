'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Column, ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

/**
 *@todo zod 사용 예정
 */

export type Quiz = {
  id: string;
  content: { title: string; summary: string };
  difficulty: string;
  created_at: string;
  updated_at: string;
  success?: boolean;
};

export const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: 'success',
    header: () => <div className="text-left">상태</div>,
  },
  {
    accessorKey: 'content',
    header: '제목',
    cell: ({ row }) => {
      const { title, summary } = row.getValue<{
        title: string;
        summary: string;
      }>('content');

      return (
        <div className="max-w-[13rem]">
          <h3 className="truncate">
            <Link
              className="text-base font-semibold"
              href={`/quizzes/${row.id}`}
            >
              {title}
            </Link>
          </h3>
          <p className="truncate text-blue-500">{summary}</p>
        </div>
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
    (difficulty: '하' | '중' | '상') =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(e.currentTarget);
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

  const filterValue = (column.getFilterValue() as ['하' | '중' | '상']) ?? [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Checkbox
          id="easy-check"
          checked={filterValue.includes('하')}
          onClick={onClickToggle('하')}
        />
        <label htmlFor="easy-check">쉬움</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="medium-check"
          checked={filterValue.includes('중')}
          onClick={onClickToggle('중')}
        />
        <label htmlFor="medium-check">보통</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="hard-check"
          checked={filterValue.includes('상')}
          onClick={onClickToggle('상')}
        />
        <label htmlFor="hard-check">어려움</label>
      </div>
    </div>
  );
}
