"use client";

import { getManageTableColumns } from "~/components/manage-service/manage-table/columns";
import { ManagePagination } from "~/components/manage-service/manage-table/pagination";
import DataTable from "~/components/ui/data-table";

import { useManagePagination } from "~/components/manage-service/hooks";
import { PhraseItemWithId } from "~/types/phrase";
import { useManageDrawer } from "../hooks/use-manage-drawer";
import { rowsPerPageOptions } from "../manage-service.meta";
import { ManageActionBar } from "./action-bar";

const ManageServiceTable = ({ data }: { data: PhraseItemWithId[] }) => {
  const {
    pagination,
    transformedData,
    onRowSizeChange,
    onPageMove,
    isAllDeleteChecked,
    onCheckAllDelete,
    isDeleteChecked,
    onDeleteCheck,
  } = useManagePagination(data, Number(rowsPerPageOptions[0].value));

  const openNewDrawer = useManageDrawer((v) => v.openNewDrawer);
  const openEditDrawer = useManageDrawer((v) => v.openEditDrawer);

  return (
    <>
      <ManageActionBar
        isAllDeleteChecked={isAllDeleteChecked}
        onRowSizeChange={onRowSizeChange}
        onCheckAllDelete={onCheckAllDelete}
        onClickCreate={openNewDrawer}
      />
      <DataTable
        columns={getManageTableColumns(isDeleteChecked, onDeleteCheck)}
        data={transformedData}
        NoDataMsg={
          <span className="w-full inline-block text-center text-slate-600 text-base">
            현재 작성 된 글이 없습니다.
          </span>
        }
        onClickRow={openEditDrawer}
      />
      <ManagePagination pagination={pagination} onPageMove={onPageMove} />
    </>
  );
};

export default ManageServiceTable;
