"use client";

import ActionBarLayout from "~/components/manage-service/action-bar-layout";
import DisplayDataNumSelect from "~/components/manage-service/display-data-num-select";
import { ManagePagination } from "~/components/manage-service/manage-pagination";
import { getManageTableColumns } from "~/components/manage-service/manage-table/columns";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import DataTable from "~/components/ui/data-table";

import { useManagePagination } from "~/components/manage-service/hooks";
import { PhraseItemWithId } from "~/types/phrase";
import { rowsPerPageOptions } from "./manage-service.meta";

/** @todo 서버 데이터 개수(변경 필요) */
const totalRows = 100; // 전체 데이터 개수

const ManageServiceTemplate = ({ data }: { data: PhraseItemWithId[] }) => {
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

  return (
    <>
      <ActionBarLayout
        left={
          <div className="flex justify-center items-center">
            <Checkbox
              checked={isAllDeleteChecked}
              className="m-4 data-[state=checked]:bg-slate-600"
              onCheckedChange={onCheckAllDelete}
            />
            <Button className="py-2 px-4 bg-slate-100 text-slate-900 font-semibold rounded-[6px] hover:bg-slate-100">
              삭제
            </Button>
          </div>
        }
        right={
          <div className="flex justify-center items-center">
            <DisplayDataNumSelect
              options={rowsPerPageOptions}
              onValueChange={onRowSizeChange}
            />
            <Button className="py-2 px-4 bg-slate-900 ml-[12px] font-semibold rounded-[6px] hover:bg-slate-900">
              추가하기
            </Button>
          </div>
        }
      />
      <DataTable
        columns={getManageTableColumns(isDeleteChecked, onDeleteCheck)}
        data={transformedData}
        NoDataMsg={
          <span className="w-full inline-block text-center text-slate-600 text-base">
            현재 작성 된 글이 없습니다.
          </span>
        }
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
