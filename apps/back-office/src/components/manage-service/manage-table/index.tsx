"use client";

import { getManageTableColumns } from "~/components/manage-service/manage-table/columns";
import { ManagePagination } from "~/components/manage-service/manage-table/pagination";
import { DataTable } from "~/components/ui/data-table";

import { PhraseItemWithId } from "~/types/phrase";
import { useManageDrawer } from "../hooks/use-manage-drawer";
import { ManageActionBar } from "./action-bar";

import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getPaginationRowModel,
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

const ManageServiceTable = ({ data }: { data: PhraseItemWithId[] }) => {
  const openEditDrawer = useManageDrawer((v) => v.openEditDrawer);

  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns: getManageTableColumns(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <>
      <ManageActionBar table={table} />
      <DataTable
        table={table}
        NoDataMsg={
          <span className="w-full inline-block text-center text-base">
            현재 작성 된 글이 없습니다.
          </span>
        }
        onClickRow={openEditDrawer}
      />
      <ManagePagination table={table} />
    </>
  );
};

export default ManageServiceTable;

const ManageServiceTableConnector = () => {
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

  return <ManageServiceTable data={data.result.phraseList} />;
};

export { ManageServiceTableConnector as ManageServiceDataTable };
