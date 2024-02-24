import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/libs/utils";
import { PhraseItemWithId } from "~/types/phrase";

const TableHeadText = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <div className={cn("font-bold text-sm tracking-normal leading-4", className)}>
    <span {...rest}>{children}</span>
  </div>
);

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
  },
  {
    size: 40,
    accessorKey: "id",
    header: () => <TableHeadText>ID</TableHeadText>,
    cell: ({ row }) => <span>{row.original.phraseId}</span>,
  },
  {
    size: 80,
    accessorKey: "createdAt",
    header: () => <TableHeadText>작성일자</TableHeadText>,
    cell: ({ row }) => (
      <div className="line-clamp-2">
        {format(row.original.createdAt, "yy.MM.dd HH:mm:ss")}
      </div>
    ),
  },
  {
    size: 200,
    accessorKey: "title",
    header: () => <TableHeadText>타이틀</TableHeadText>,
    cell: ({ row }) => <div className="line-clamp-2">{row.original.title}</div>,
  },
  {
    minSize: 100,
    accessorKey: "imageUrl",
    header: () => <TableHeadText>이미지</TableHeadText>,
    cell: ({ row }) => (
      <div className="line-clamp-2">{row.original.filename}</div>
    ),
  },
  {
    minSize: 400,
    accessorKey: "content",
    header: () => <TableHeadText>콘텐츠</TableHeadText>,
    cell: ({ row }) => (
      <div className="max-w-[400px] line-clamp-2">{row.original.content}</div>
    ),
  },
  {
    size: 70,
    accessorKey: "viewCount",
    header: () => <TableHeadText className="text-center">조회수</TableHeadText>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.viewCount}</div>
    ),
  },
  {
    size: 70,
    accessorKey: "likeCount",
    header: () => (
      <TableHeadText className="text-center">좋아요수</TableHeadText>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.likeCount}</div>
    ),
  },
];
