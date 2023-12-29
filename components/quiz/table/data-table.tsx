'use client';

import Button from '@/components/common/buttons/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { useState } from 'react';
import SearchIcon from '@/assets/images/search-icon.png';
import { useRouter } from 'next/navigation';
import { QuizTable } from '@/libs/models';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export default function DataTable<TData extends QuizTable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    initialState: { pagination: { pageSize: 5 } },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const router = useRouter();

  return (
    <div className="mt-3.5">
      <div className="relative mb-2.5">
        <Image
          src={SearchIcon}
          alt="검색"
          className="absolute left-2.5 top-1/2 -translate-y-1/2"
          width={20}
          height={20}
        />
        <input
          type="text"
          className="h-full w-full border py-3 pl-10 pr-2"
          placeholder="퀴즈를 검색해 보세요!"
          onChange={(e) => {
            table.getColumn('title')?.setFilterValue(e.target.value);
          }}
        />
      </div>

      <div className="min-h-[450px]">
        <Table className="mb-4 border bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => router.push(`/quizzes/${row.original.id}`)}
                  data-state={row.getIsSelected() && 'selected'}
                  className="h-10 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  해당되는 퀴즈가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
