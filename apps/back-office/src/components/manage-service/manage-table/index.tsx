"use client";

import { getManageTableColumns } from "~/components/manage-service/manage-table/columns";
import { ManagePagination } from "~/components/manage-service/manage-table/pagination";
import DataTable from "~/components/ui/data-table";

import { useManagePagination } from "~/components/manage-service/hooks";
import { useManageDrawer } from "../hooks/use-manage-drawer";
import {
  getPhraseItemListMocks,
  rowsPerPageOptions,
} from "../manage-service.meta";
import { ManageActionBar } from "./action-bar";

/** @todo 서버 데이터 개수(변경 필요) */
const totalRows = 100; // 전체 데이터 개수

const ManageServiceTemplate = () => {
  const {
    pagination,
    transformedData,
    onRowSizeChange,
    onPageMove,
    isAllDeleteChecked,
    onCheckAllDelete,
    isDeleteChecked,
    onDeleteCheck,
  } = useManagePagination(
    getPhraseItemListMocks(totalRows),
    Number(rowsPerPageOptions[0].value),
  );

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
      <ManagePagination
        pagination={pagination}
        onPageMove={onPageMove}
        className="justify-end"
      />
    </>
  );
};

export default ManageServiceTemplate;
