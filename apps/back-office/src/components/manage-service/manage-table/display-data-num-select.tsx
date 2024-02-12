import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { PhraseItemWithId } from "~/types/phrase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface Props {
  table: Table<PhraseItemWithId>;
}

export const rowsPerPageOptions = [
  { value: "10", label: "10개" },
  { value: "20", label: "20개" },
  { value: "30", label: "30개" },
  { value: "50", label: "50개" },
  { value: "100", label: "100개" },
];

const DisplayDataNumSelect = ({ table }: Props) => {
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
