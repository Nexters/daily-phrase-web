import ManageServiceTemplate from "~/components/manage-service/manage-service-template";

/**
 * @todo 글 추가하기, 수정하기 컴포넌트는 여기다 띄우고
 * 상태 관리 콜백만 ManageSderviceTemplate에 넘기면 될듯요
 */
export default function Page() {
  return (
    <div className="px-6 py-8 pb-[126px] space-y-7">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">서비스 관리</h1>
      </div>
      <ManageServiceTemplate />
    </div>
  );
}
