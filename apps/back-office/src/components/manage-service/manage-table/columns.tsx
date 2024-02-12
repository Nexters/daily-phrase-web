import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { EllipsisText } from "~/components/ui/text";
import { cn } from "~/libs/utils";
import { PhraseItemWithId } from "~/types/phrase";
import { OnDelete } from "../manage-service.type";

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

/** @todo header width와 cell width를 맞추어야 함. */
export const getManageTableColumns = (): ColumnDef<PhraseItemWithId>[] => [
  {
    accessorKey: "select",
    size: 40,
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
    minSize: 180,
    accessorKey: "createdAt",
    header: () => <TableHeadText>작성일자</TableHeadText>,
    cell: ({ row }) => (
      <EllipsisText className="inline-block">
        {format(row.original.createdAt, "yy.MM.dd HH:mm")}
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
      <EllipsisText className="max-w-[400px]">
        {row.original.content}
      </EllipsisText>
    ),
  },
  {
    minSize: 140,
    accessorKey: "viewCount",
    header: () => <TableHeadText className="text-center">조회수</TableHeadText>,
    cell: ({ row }) => (
      <EllipsisText className="text-center">
        {row.original.viewCount}
      </EllipsisText>
    ),
  },
  {
    minSize: 140,
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
