import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { EllipsisText } from "~/components/ui/text";
import { cn } from "~/libs/utils";
import { PhraseItemWithId } from "~/types/phrase";

const TableHeadText = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <div
    className={cn("font-bold text-base tracking-normal leading-4", className)}
  >
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
            table.getIsAllRowsSelected() ||
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
    size: 100,
    accessorKey: "createdAt",
    header: () => <TableHeadText>작성일자</TableHeadText>,
    cell: ({ row }) => (
      <EllipsisText className="inline-block">
        {format(row.original.createdAt, "yy.MM.dd HH:mm:ss")}
      </EllipsisText>
    ),
  },
  {
    minSize: 200,
    accessorKey: "title",
    header: () => <TableHeadText className="text-left">타이틀</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.title}</EllipsisText>,
  },
  {
    minSize: 140,
    accessorKey: "imageUrl",
    header: () => <TableHeadText className="text-left">이미지</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.filename}</EllipsisText>,
  },
  {
    minSize: 348,
    accessorKey: "content",
    header: () => <TableHeadText className="text-left">텍스트</TableHeadText>,
    cell: ({ row }) => (
      <EllipsisText className="max-w-[500px]">
        {row.original.content}
      </EllipsisText>
    ),
  },
  {
    size: 70,
    accessorKey: "viewCount",
    header: () => <TableHeadText className="text-center">조회수</TableHeadText>,
    cell: ({ row }) => (
      <EllipsisText className="text-center">
        {row.original.viewCount}
      </EllipsisText>
    ),
  },
  {
    size: 70,
    accessorKey: "likeCount",
    header: () => (
      <TableHeadText className="text-center">좋아요수</TableHeadText>
    ),
    cell: ({ row }) => (
      <EllipsisText className="text-center">
        {row.original.likeCount}
      </EllipsisText>
    ),
  },
];
