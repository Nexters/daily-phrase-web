"use client";

import { Table as TableType, flexRender } from "@tanstack/react-table";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData> {
  table: TableType<TData>;
  NoDataMsg: React.ReactNode;
  onClickRow?: (data: TData) => void;
}

export const DataTable = <TData,>({
  table,
  NoDataMsg,
  onClickRow,
}: DataTableProps<TData>) => {
  return (
    <div className="border-t">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-0">
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
                className="border-0 cursor-pointer"
                onClick={() => onClickRow?.(row.original)}
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
                {NoDataMsg}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
