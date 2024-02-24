import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/libs/utils";
import { PaginationSelect } from "./pagination-select";
import { ManageTable } from "./type";

interface Props {
  className?: string;
  table: ManageTable;
}

export function ManageTablePagination({ className, table }: Props) {
  return (
    <div className={cn("w-full flex justify-end gap-6 lg:gap-8", className)}>
      <div className="flex-1 flex items-center text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      {/*  */}
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">Rows per page</p>
        <PaginationSelect table={table} />
      </div>
      {/*  */}
      <div className="w-[100px] flex items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      {/*  */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!table.getCanNextPage()}
          onClick={() => table.getCanNextPage() && table.nextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
