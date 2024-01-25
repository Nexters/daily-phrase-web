"use client";

import { useState } from "react";
import { ManagePagination } from "~/components/manage-service/manage-pagination";
import { manageTableColumns } from "~/components/manage-service/manage-table/columns";
import DataTable from "~/components/ui/data-table";
import { PaginationData } from "~/types/pagination";
import { PhraseItem } from "~/types/phrase";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    size: 20,
  });
  return (
    <div className="py-32 space-y-7">
      <DataTable
        columns={manageTableColumns}
        data={phraseItemListMocks}
        noDataMsg="현재 작성 된 글이 없습니다."
      />
      <ManagePagination
        pagination={pagination}
        onPageMove={(pagination, next) =>
          setPagination((prev) => ({ ...prev, current: next }))
        }
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
