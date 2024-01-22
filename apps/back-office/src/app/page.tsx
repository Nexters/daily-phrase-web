import { ManagePagination } from "~/components/manage-service/manage-pagination";
import { ManageTable } from "~/components/manage-service/manage-table";

export default function Page() {
  return (
    <div className="py-32 space-y-7">
      <ManageTable />
      <ManagePagination/>
    </div>
  );
}
