"use client";

import { useQuery } from "@tanstack/react-query";
import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useState } from "react";
import { apis } from "~/apis";
import { ACCESS_TOKEN } from "~/apis/config/cookie/token";
import { queryKeys } from "~/apis/config/tanstack-query/query-keys";
import ErrorFallback from "~/components/error-fallback";
import Loading from "~/components/loading";
import { PhraseItemWithId } from "~/types/phrase";
import { ManageActionBar } from "./action-bar";
import { columMapper, getManageTableColumns } from "./columns";
import ManageServiceDataTable from "./data-table";
import { ManagePagination } from "./pagination";

export default function ManageServiceTable() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: () => apis.phraseApi.getPhraseList(),
    queryKey: queryKeys.phraseList,
  });

  if (isPending) return <Loading />;
  if (isError) return <ErrorFallback reset={() => {}} error={error} />;
  if (!data) return null;

  // TODO: 토큰 리프레쉬 하기
  if (data?.status === 401) {
    deleteCookie(ACCESS_TOKEN);
    return redirect("login");
  }

  return <Root data={data.result.phraseList} />;
}

const Root = ({ data }: { data: PhraseItemWithId[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4">
      <ManageActionBar table={table} />
      <ManageServiceDataTable table={table} />
      <ManagePagination table={table} />
    </div>
  );
};
