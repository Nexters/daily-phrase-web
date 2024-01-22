import React from "react";
import { PaginationData } from "~/types/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "../ui/pagination";

interface Props {
  pagination: PaginationData;
  onPageMove: (pagination: PaginationData, next: number) => void;
}

export const ManagePagination = ({ pagination, onPageMove }: Props) => {
  const paginationArr = Array.from(
    { length: pagination.size },
    (_, idx) => idx + 1,
  );
  return (
    <Pagination>
      <PaginationStart onClick={() => onPageMove(pagination, 1)} />
      <PaginationPrevious
        onClick={() => {
          if (pagination.current - 1 <= 0) return;
          onPageMove(pagination, pagination.current - 1);
        }}
      />
      <PaginationContent>
        {paginationArr.map((num) => (
          <PaginationItem onClick={() => onPageMove(pagination, num)}>
            {num}
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