import {
  ManageDrawerContent,
  ManageDrawerRoot,
} from "~/components/manage-service/manage-drawer";
import { ManageServiceDataTable } from "~/components/manage-service/manage-table";

export default function Page() {
  return (
    <ManageDrawerRoot>
      <div className="px-6 py-8 pb-[126px] space-y-7">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">서비스 관리</h1>
        </div>
        <ManageServiceDataTable />
      </div>
      <ManageDrawerContent />
    </ManageDrawerRoot>
  );
}
