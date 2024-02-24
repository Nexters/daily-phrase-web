"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apis } from "~/apis";
import { queryClient } from "~/apis/config/tanstack-query/query-client";
import { queryKeys } from "~/apis/config/tanstack-query/query-keys";
import { Button } from "~/components/ui/button";
import { useManageDrawer } from "../hooks/use-manage-drawer";
import { DataTableViewOptions } from "./data-table-view-options";
import { ManageTable } from "./type";

interface Props {
  table: ManageTable;
}

export function ManageTableToolbar({ table }: Props) {
  const openNewDrawer = useManageDrawer((v) => v.openNewDrawer);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => apis.phraseApi.deletePhrase(id),
  });
  const onDeleteClick = () => {
    const selectedRowModel = table.getSelectedRowModel();
    const selectedLength = selectedRowModel.rows.length;

    if (!selectedLength) {
      toast.error("삭제할 글귀를 선택해주세요.");
      return;
    }
    if (selectedLength > 1) {
      toast.error("지금은 하나씩만 삭제할 수 있어요.");
      return;
    }
    mutate(selectedRowModel.rows[0].original.phraseId, {
      onSuccess: () => {
        toast.success("글귀 삭제에 성공했습니다.");
        queryClient.invalidateQueries({ queryKey: queryKeys.phraseList });
        table.resetRowSelection();
      },
      onError: (e) => {
        console.log(e);
        toast.error("글귀 삭제에 실패했습니다.");
      },
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-3">
        <DataTableViewOptions table={table} />
        {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={onDeleteClick}
          >
            {isPending ? "Loading..." : "삭제"}
          </Button>
        )}
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button variant="default" onClick={openNewDrawer}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
