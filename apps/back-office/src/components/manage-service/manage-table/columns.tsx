import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/libs/utils";
import { PhraseItemWithId } from "~/types/phrase";
import { DataTableColumnHeader } from "./data-table-colum-header";

const TableHeadText = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <div className={cn("font-bold text-sm tracking-normal leading-4", className)}>
    <span {...rest}>{children}</span>
  </div>
);

export const columMapper = {
  id: "ID",
  createdAt: "작성일자",
  title: "제목",
  imageUrl: "이미지",
  content: "텍스트",
  viewCount: "조회수",
  likeCount: "좋아요",
};

export const renderColumnText = (key: string) => {
  return columMapper[key as keyof typeof columMapper] ?? "[잘못 된 칼럼 값]";
};

export const getManageTableColumns = (): ColumnDef<PhraseItemWithId>[] => [
  {
    accessorKey: "select",
    size: 40,
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    size: 40,
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <span>{row.original.phraseId}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    size: 70,
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="line-clamp-2">
        {format(row.original.createdAt, "yy.MM.dd")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <div className="line-clamp-2">{row.original.title}</div>,
  },
  {
    minSize: 100,
    accessorKey: "imageUrl",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="line-clamp-2">{row.original.filename}</div>
    ),
    enableSorting: false,
  },
  {
    minSize: 400,
    accessorKey: "content",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="line-clamp-2">{row.original.content}</div>
    ),
    enableSorting: false,
  },
  {
    size: 70,
    accessorKey: "viewCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="justify-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.viewCount}</div>
    ),
    enableHiding: false,
  },
  {
    size: 70,
    maxSize: 70,
    accessorKey: "likeCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="justify-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.likeCount}</div>
    ),
    enableHiding: false,
  },
];
