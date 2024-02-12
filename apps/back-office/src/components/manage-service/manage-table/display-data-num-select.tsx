import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { rowsPerPageOptions } from "../manage-service.meta";

interface Props<TData> {
  table: Table<TData>;
}

const DisplayDataNumSelect = <TData,>({ table }: Props<TData>) => {
  return (
    <Select onValueChange={(v) => table.setPageSize(+v)}>
      <SelectTrigger
        className="w-[100px] font-medium focus:ring-0 focus:ring-offset-0"
        icon={<ChevronDown className="h-4 w-4" />}
      >
        <SelectValue placeholder={table.getState().pagination.pageSize} />
      </SelectTrigger>
      <SelectContent className="w-[100px]">
        {rowsPerPageOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DisplayDataNumSelect;
