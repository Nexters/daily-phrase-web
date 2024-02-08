"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apis } from "~/apis";
import { queryClient } from "~/apis/config/tanstack-query/query-client";
import { queryKeys } from "~/apis/config/tanstack-query/query-keys";
import DisplayDataNumSelect from "~/components/manage-service/manage-table/display-data-num-select";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

type Props = {
  isAllDeleteChecked: boolean;
  onCheckAllDelete: (checked: boolean) => void;
  onRowSizeChange: (value: string) => void;
  onClickCreate: () => void;
  checkedItems: Array<number>;
};

export const ManageActionBar = ({
  isAllDeleteChecked,
  onCheckAllDelete,
  onRowSizeChange,
  onClickCreate,
  checkedItems,
}: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => {
      return apis.phraseApi.deletePhrase(id);
    },
  });
  const onDeleteClick = () => {
    if (!checkedItems.length) {
      toast.error("삭제할 글귀를 선택해주세요.");
      return;
    }
    if (checkedItems.length > 1) {
      toast.error("지금은 하나씩만 삭제할 수 있어요.");
      return;
    }
    mutate(checkedItems[0].toString(), {
      onSuccess: () => {
        toast.success("글귀 삭제에 성공했습니다.");
        queryClient.invalidateQueries({ queryKey: queryKeys.phraseList });
      },
      onError: () => {
        toast.success("글귀 삭제에 실패했습니다.");
      },
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <Checkbox
          checked={isAllDeleteChecked}
          className="m-4 data-[state=checked]:bg-slate-600"
          onCheckedChange={onCheckAllDelete}
        />
        <Button
          className="py-2 px-4 bg-slate-100 text-slate-900 font-semibold rounded-[6px] hover:bg-slate-100"
          disabled={isPending}
          onClick={onDeleteClick}
        >
          {isPending ? "Loading..." : "삭제"}
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <DisplayDataNumSelect onValueChange={onRowSizeChange} />
        <Button
          className="py-2 px-4 bg-slate-900 ml-[12px] font-semibold rounded-[6px] hover:bg-slate-900"
          onClick={onClickCreate}
        >
          추가하기
        </Button>
      </div>
    </div>
  );
};
