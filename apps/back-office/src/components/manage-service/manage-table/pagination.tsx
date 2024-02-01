import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "~/components/ui/pagination";
import { cn } from "~/libs/utils";
import { PaginationData } from "~/types/pagination";

interface Props {
  pagination: PaginationData;
  onPageMove: (pagination: PaginationData, next: number) => void;
  className?: string;
}

export const ManagePagination = ({
  pagination,
  onPageMove,
  className,
}: Props) => {
  const paginationArr = Array.from(
    { length: pagination.size },
    (_, idx) => idx + 1,
  );
  return (
    <Pagination className={cn("justify-end", className)}>
      <PaginationStart onClick={() => onPageMove(pagination, 1)} />
      <PaginationPrevious
        onClick={() => {
          if (pagination.current - 1 <= 0) return;
          onPageMove(pagination, pagination.current - 1);
        }}
      />
      <PaginationContent>
        {paginationArr.map((num) => (
          <PaginationItem
            onClick={() => onPageMove(pagination, num)}
            className={cn(
              "p-2.5 leading-4 text-center	hover:bg-slate-100 rounded-full cursor-pointer",
              pagination.current === num && "font-bold",
            )}
          >
            <span className="text-base leading-4">{num}</span>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext
        onClick={() => {
          if (pagination.current >= pagination.size) return;
          onPageMove(pagination, pagination.current + 1);
        }}
      />
      <PaginationEnd onClick={() => onPageMove(pagination, pagination.size)} />
    </Pagination>
  );
};
