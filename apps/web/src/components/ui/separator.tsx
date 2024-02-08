import { cn } from "~/libs/utils";

export default function Separator(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("w-full h-2 bg-[#F2F3F6]", props.className)}
    />
  );
}
