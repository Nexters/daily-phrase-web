import DisplayDataNumSelect from "~/components/manage-service/manage-table/display-data-num-select";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

type Props = {
  isAllDeleteChecked: boolean;
  onCheckAllDelete: (checked: boolean) => void;
  onRowSizeChange: (value: string) => void;
  onClickCreate: () => void;
};

const ActionBar = ({
  isAllDeleteChecked,
  onCheckAllDelete,
  onRowSizeChange,
  onClickCreate,
}: Props) => {
  return (
    <div className="flex justify-between items-center">
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

export default ActionBar;
