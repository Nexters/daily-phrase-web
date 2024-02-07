"use client";

import { useAppDownloadModalStore } from "./app-download-modal";
import { BookmarkLinearIcon, LikeLinearIcon } from "./ui/icons";

export default function AppFooter() {
  // TODO: 앱이 있으면 팝업 없이 바로 앱으로 이동 가능한지 확인
  const openAppDownloadModal = useAppDownloadModalStore((state) => state.open);

  return (
    <div className="container fixed bottom-0 inset-x-0">
      <div className="flex items-center justify-center gap-3 p-4 pb-[26px] h-[90px] bg-white">
        <button
          type="button"
          className="flex items-center justify-center"
          style={styles.btnWrapper}
          onClick={openAppDownloadModal}
        >
          <LikeLinearIcon className="w-12 h-12" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center"
          style={styles.btnWrapper}
          onClick={openAppDownloadModal}
        >
          <BookmarkLinearIcon className="w-12 h-12" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center flex-1"
          style={styles.btnWrapper}
          onClick={openAppDownloadModal}
        >
          <div
            className="flex items-center justify-center flex-1"
            style={{
              height: 48,
              borderRadius: 8,
              background: "#FF7900",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "22px",
            }}
          >
            앱 설치하고 공유하기
          </div>
        </button>
      </div>
    </div>
  );
}

const styles = {
  btnWrapper: {
    padding: "16px 6px",
    margin: "-16px -6px",
  },
};
