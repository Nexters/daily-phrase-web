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
    minSize: 180,
    accessorKey: "createdAt",
    header: () => <TableHeadText textAlign="center">작성일자</TableHeadText>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          className="data-[state=checked]:bg-slate-600"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <span className="inline-block p-4">{row.original.createdAt}</span>
      </div>
    ),
  },
  {
    minSize: 200,
    accessorKey: "title",
    header: () => <TableHeadText textAlign="left">타이틀</TableHeadText>,
  },
  {
    minSize: 140,
    accessorKey: "imageUrl",
    header: () => <TableHeadText textAlign="left">이미지</TableHeadText>,
  },
  {
    minSize: 348,
    accessorKey: "content",
    header: () => <TableHeadText textAlign="left">텍스트</TableHeadText>,
  },
  {
    minSize: 140,
    accessorKey: "viewCount",
    header: () => <TableHeadText textAlign="center">조회수</TableHeadText>,
  },
  {
    minSize: 140,
    accessorKey: "likeCount",
    header: () => <TableHeadText textAlign="center">좋아요수</TableHeadText>,
  },
];
