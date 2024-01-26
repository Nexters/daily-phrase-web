"use client";

import { useState } from "react";
import ActionBarLayout from "~/components/manage-service/action-bar-layout";
import DisplayDataNumSelect from "~/components/manage-service/display-data-num-select";
import { ManagePagination } from "~/components/manage-service/manage-pagination";
import { manageTableColumns } from "~/components/manage-service/manage-table/columns";
import DataTable from "~/components/ui/data-table";

import { PaginationData } from "~/types/pagination";
import { PhraseItem } from "~/types/phrase";

export default function Page() {
  /** @todo 페이지네이션 상태 관리 필요 */
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    size: 20,
  });
  return (
    <div className="py-32 space-y-7">
      <ActionBarLayout
        right={
          <>
            <DisplayDataNumSelect options={options} />
          </>
        }
      />
      <DataTable
        columns={manageTableColumns}
        data={phraseItemListMocks}
        NoDataMsg={
          <span className="w-full inline-block text-center text-slate-600 text-base">
            현재 작성 된 글이 없습니다.
          </span>
        }
      />
      <ManagePagination
        pagination={pagination}
        onPageMove={(pagination, next) =>
          setPagination((prev) => ({ ...prev, current: next }))
        }
        className="justify-end"
      />
    </div>
  );
}

const phraseItemMocks: PhraseItem = {
  createdAt: new Date().getMilliseconds(),
  title:
    "안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들",
  imageUrl: "",
  content:
    "안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들",
  viewCount: 9999999,
  likeCount: 9999999,
};

const phraseItemListMocks: Array<PhraseItem> = Array.from(
  { length: 20 },
  () => phraseItemMocks,
);

const options = [
  { value: "10", label: "10개" },
  { value: "30", label: "30개" },
  { value: "50", label: "50개" },
  { value: "100", label: "100개" },
];
