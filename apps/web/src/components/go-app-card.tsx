"use client";

import { useAppDownloadModalStore } from "./app-download-modal";

export default function GoAppCard() {
  const openAppDownloadModal = useAppDownloadModalStore((state) => state.open);

  const onClick = () => {
    openAppDownloadModal();
    window.clarity?.("event", "view-phrases");
  };

  return (
    <div className="py-[30px] flex flex-col items-center">
      <div className="text-[#1D1B20] text-[28px] font-semibold leading-[36px] text-center">
        앱 설치하고
        <br />
        매일 업데이트 되는 글귀를
        <br />
        확인하세요.
      </div>
      <button
        type="button"
        className="mt-4 flex items-center justify-center w-[240px] h-[40px] bg-[#FFEAB1] rounded-[8px] font-semibold"
        onClick={onClick}
      >
        글귀 보러가기
      </button>
    </div>
  );
}
