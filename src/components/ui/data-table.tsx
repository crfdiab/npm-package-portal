
import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  onPageChange,
  currentPage = 0,
  totalPages = 1,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex: currentPage,
      },
    },
    manualPagination: true, // We'll handle pagination ourselves
    pageCount: totalPages,
  });

  // The pagination that's shown to the user
  const displayedPage = currentPage + 1;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="table-wrapper">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t border-border transition-colors hover:bg-muted/30",
                    i % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing items {displayedPage === 1 ? 1 : (displayedPage - 1) * pageSize + 1} to{" "}
          {Math.min(displayedPage * pageSize, 1000)} of 1000
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="h-8 w-8 transition-all duration-200 ease-in-out"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageIndex: number;
              if (totalPages <= 5) {
                pageIndex = i;
              } else if (currentPage < 3) {
                pageIndex = i;
              } else if (currentPage > totalPages - 4) {
                pageIndex = totalPages - 5 + i;
              } else {
                pageIndex = currentPage - 2 + i;
              }
              
              const isActive = pageIndex === currentPage;
              
              return (
                <Button
                  key={pageIndex}
                  variant="ghost"
                  size="icon"
                  onClick={() => onPageChange && onPageChange(pageIndex)}
                  className={cn(
                    "h-8 w-8 mx-0.5 transition-all duration-200 ease-in-out",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="h-8 w-8 transition-all duration-200 ease-in-out"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
