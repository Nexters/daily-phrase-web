"use client";

import { useState } from "react";
import { PaginationData } from "~/types/pagination";
import { PhraseItemWithId } from "~/types/phrase";
import { OnCheck, OnDelete } from "../manage-service.type";
import { ManagePagination } from "../manage-table/pagination";

const useManagePagination = (
  data: Array<PhraseItemWithId>,
  defaultLimit: number,
) => {
  /** @todo 페이지네이션 상태 관리 필요, 현재는 프론트에서 페이지네이션 관리 */
  const totalDataLen = data.length;
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    limit: defaultLimit,
    size: Math.ceil(totalDataLen / defaultLimit),
  });

  const startIndex = (pagination.current - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;

  const transformedData = data.slice(startIndex, endIndex);

  /**
   * @description 삭제 기능 상태, 페이지네이션과 삭제 기능이 서로 의존 관계에 있어 분리하려면 고민 필요
   * 시간 관계로 우선 훅 하나로 구성
   */
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const onRowSizeChange = (rowsPerPage: string) => {
    /** @todo 숫자형변환했을 때 숫자가 아니면 오류 뜨도록 */
    setPagination({
      current: 1,
      limit: Number(rowsPerPage),
      size: Math.ceil(totalDataLen / Number(rowsPerPage)), // 총 페이지 수 재계산
    });
    setCheckedItems([]);
  };

  const onPageMove: Parameters<typeof ManagePagination>[0]["onPageMove"] = (
    pagination,
    next,
  ) => {
    setCheckedItems([]);
    setPagination((prev) => ({ ...prev, current: next }));
  };

  const currentPageDataIds = transformedData.map((item) => item.phraseId);

  const isAllDeleteChecked = checkedItems.length === currentPageDataIds.length;

  const onCheckAllDelete: OnCheck = (checked) => {
    setCheckedItems(checked ? currentPageDataIds : []);
  };

  const isDeleteChecked = (id: number) => checkedItems.includes(id);

  const onDeleteCheck: OnDelete = (id, checked) => {
    if (checked) setCheckedItems((prev) => [...new Set(prev).add(id)]);
    else setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    pagination,
    transformedData,
    onRowSizeChange,
    onPageMove,
    isAllDeleteChecked,
    onCheckAllDelete,
    isDeleteChecked,
    onDeleteCheck,
  };
};

export default useManagePagination;
