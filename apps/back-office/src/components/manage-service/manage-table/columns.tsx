import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { PhraseItem } from "~/types/phrase";

const TableHeadText = ({
  children,
  textAlign,
}: React.PropsWithChildren<{ textAlign: "left" | "right" | "center" }>) => (
  <div
    className={`w-full text-${textAlign} font-bold text-base tracking-normal leading-4	p-3`}
  >
    <span>{children}</span>
  </div>
);

export const manageTableColumns: Array<ColumnDef<PhraseItem>> = [
  {
    accessorKey: "createdAt",
    header: () => <TableHeadText textAlign="center">작성일자</TableHeadText>,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: () => <TableHeadText textAlign="left">타이틀</TableHeadText>,
  },
  {
    accessorKey: "imageUrl",
    header: () => <TableHeadText textAlign="left">이미지</TableHeadText>,
  },
  {
    accessorKey: "content",
    header: () => <TableHeadText textAlign="left">텍스트</TableHeadText>,
  },
  {
    accessorKey: "viewCount",
    header: () => <TableHeadText textAlign="center">조회수</TableHeadText>,
  },
  {
    accessorKey: "likeCount",
    header: () => <TableHeadText textAlign="center">좋아요수</TableHeadText>,
  },
];
