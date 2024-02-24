"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { apis } from "~/apis";
import { queryKeys } from "~/apis/config/tanstack-query/query-keys";
import ErrorFallback from "~/components/error-fallback";
import Loading from "~/components/loading";
import { PhraseItemWithId } from "~/types/phrase";
import { getManageTableColumns } from "./columns";
import { ManageDataTable } from "./data-table";
import { ManageTablePagination } from "./pagination";
import { ManageTableToolbar } from "./toolbar";

export default function ManageServiceTable() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: () => apis.phraseApi.getPhraseList(),
    queryKey: queryKeys.phraseList,
  });

  if (isPending) return <Loading />;
  if (isError) return <ErrorFallback reset={() => {}} error={error} />;
  if (!data) return null;

  return <ManageTable data={data.result.phraseList} />;
}

const ManageTable = ({ data }: { data: PhraseItemWithId[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    imageUrl: false,
  });

  const table = useReactTable({
    data,
    columns: getManageTableColumns(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4">
      <ManageTableToolbar table={table} />
      <ManageDataTable table={table} />
      <ManageTablePagination table={table} />
    </div>
  );
};
