import { Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "~/components/ui/pagination";
import { cn } from "~/libs/utils";

interface Props<TData> {
  className?: string;
  table: Table<TData>;
}

export function ManagePagination<TData>({ className, table }: Props<TData>) {
  return (
    <Pagination className={cn("justify-end gap-1", className)}>
      <PaginationStart
        aria-disabled={!table.getCanPreviousPage()}
        onClick={() => table.setPageIndex(0)}
      />
      <PaginationPrevious
        aria-disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      />
      <PaginationContent>
        {[...Array(table.getPageCount())].map((_, num) => (
          <PaginationItem key={num}>
            <Button
              variant={
                table.getState().pagination.pageIndex === num
                  ? "outline"
                  : "ghost"
              }
              size="icon"
              onClick={() => table.setPageIndex(num)}
            >
              <span className="text-base leading-4">{num + 1}</span>
            </Button>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext
        aria-disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      />
      <PaginationEnd
        aria-disabled={!table.getCanNextPage()}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      />
    </Pagination>
  );
}
