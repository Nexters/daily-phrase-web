import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  options: Array<{ value: string; label: string }>;
}

const DisplayDataNumSelect = ({ options }: Props) => {
  return (
    <Select>
      <SelectTrigger
        className="w-[100px] radius=[6px] border-slate-300 font-medium font-slate-900 focus:ring-0 focus:ring-offset-0"
        icon={<ChevronDown className="h-4 w-4 stroke-slate-400" />}
      >
        <SelectValue placeholder="10개" />
      </SelectTrigger>
      <SelectContent className="w-[100px]">
        {options.map(({ label, value }) => (
          <SelectItem
            value={value}
            noCheck={true}
            className="font-medium font-slate-900 focus:bg-slate-100"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DisplayDataNumSelect;
