import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { PhraseItemWithId } from "~/types/phrase";
import { useManageDrawer } from "../hooks/use-manage-drawer";

export default function ManageServiceDataTable({
  table,
}: {
  table: TanstackTable<PhraseItemWithId>;
}) {
  const openEditDrawer = useManageDrawer((v) => v.openEditDrawer);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getPaginationRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                onClick={() => openEditDrawer(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={`${cell.column.getSize()}px`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                <span className="w-full inline-block text-center text-base">
                  현재 작성 된 글이 없습니다.
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
