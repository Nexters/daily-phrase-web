import React from "react";
import { Button } from "~/components/ui/button";
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
    <Pagination className={cn("justify-end gap-1", className)}>
      <PaginationStart onClick={() => onPageMove(pagination, 1)} />
      <PaginationPrevious
        onClick={() => {
          if (pagination.current - 1 <= 0) return;
          onPageMove(pagination, pagination.current - 1);
        }}
      />
      <PaginationContent>
        {paginationArr.map((num) => (
          <PaginationItem key={num}>
            <Button
              variant={pagination.current === num ? "default" : "ghost"}
              size="icon"
              onClick={() => onPageMove(pagination, num)}
            >
              <span className="text-base leading-4">{num}</span>
            </Button>
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
