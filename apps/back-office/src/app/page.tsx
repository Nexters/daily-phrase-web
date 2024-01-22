"use client";

import { useState } from "react";
import { ManagePagination } from "~/components/manage-service/manage-pagination";
import { ManageTable } from "~/components/manage-service/manage-table";
import { PaginationData } from "~/types/pagination";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    size: 20,
  });
  return (
    <div className="py-32 space-y-7">
      <ManageTable />
      <ManagePagination
        pagination={pagination}
        onPageMove={(pagination, next) =>
          setPagination((prev) => ({ ...prev, current: next }))
        }
      />
    </div>
  );
}
