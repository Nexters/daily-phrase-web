import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { EllipsisText } from "~/components/ui/text";
import { PhraseItemWithId } from "~/types/phrase";
import { OnDelete } from "../manage-service.type";

const TableHeadText = ({
  children,
  textAlign,
  ...rest
}: React.PropsWithChildren<
  {
    textAlign: "left" | "right" | "center";
  } & React.HTMLAttributes<HTMLSpanElement>
>) => (
  <div
    className={`w-full text-${textAlign} font-bold text-base tracking-normal leading-4	p-3`}
  >
    <span {...rest}>{children}</span>
  </div>
);

/** @todo header width와 cell width를 맞추어야 함. */
export const getManageTableColumns = (
  isDeleteChecked: (id: number) => boolean,
  onDeleteCheck: OnDelete,
): ColumnDef<PhraseItemWithId>[] => [
  {
    minSize: 180,
    accessorKey: "createdAt",
    header: () => <TableHeadText textAlign="center">작성일자</TableHeadText>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          className="data-[state=checked]:bg-primary"
          checked={isDeleteChecked(row.original.phraseId)}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(checked) =>
            onDeleteCheck(row.original.phraseId, checked)
          }
          aria-label="Select row"
        />
        <EllipsisText className="inline-block p-4">
          {format(row.original.createdAt, "yy.MM.dd HH:mm")}
        </EllipsisText>
      </div>
    ),
  },
  {
    minSize: 200,
    accessorKey: "title",
    header: () => <TableHeadText textAlign="left">타이틀</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.title}</EllipsisText>,
  },
  {
    minSize: 140,
    accessorKey: "imageUrl",
    header: () => <TableHeadText textAlign="left">이미지</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.filename}</EllipsisText>,
  },
  {
    minSize: 348,
    accessorKey: "content",
    header: () => <TableHeadText textAlign="left">텍스트</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.content}</EllipsisText>,
  },
  {
    minSize: 140,
    accessorKey: "viewCount",
    header: () => <TableHeadText textAlign="center">조회수</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.viewCount}</EllipsisText>,
  },
  {
    minSize: 140,
    accessorKey: "likeCount",
    header: () => <TableHeadText textAlign="center">좋아요수</TableHeadText>,
    cell: ({ row }) => <EllipsisText>{row.original.likeCount}</EllipsisText>,
  },
];
