"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { renderColumnText } from "./columns";
import { ManageTable } from "./type";

interface Props {
  table: ManageTable;
}

export function DataTableViewOptions({ table }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[150px]">
        <DropdownMenuLabel>표시 할 칼럼</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {renderColumnText(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
