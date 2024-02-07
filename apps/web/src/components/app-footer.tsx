"use client";

import * as stylex from "@stylexjs/stylex";
import { globalStyles } from "~/styles/globals.stylex";
import { useAppDownloadModalStore } from "./app-download-modal";
import { BookmarkLinearIcon, LikeLinearIcon } from "./ui/icons";

export default function AppFooter() {
  // TODO: 앱이 있으면 팝업 없이 바로 앱으로 이동 가능한지 확인
  const openAppDownloadModal = useAppDownloadModalStore((state) => state.open);

  return (
    <div {...stylex.props(globalStyles.container, styles.container)}>
      <div {...stylex.props(styles.footer, styles.flexCenter)}>
        <button
          type="button"
          {...stylex.props(styles.flexCenter, styles.btnWrapper)}
          onClick={openAppDownloadModal}
        >
          <LikeLinearIcon {...stylex.props(styles.icon)} />
        </button>
        <button
          type="button"
          {...stylex.props(styles.flexCenter, styles.btnWrapper)}
          onClick={openAppDownloadModal}
        >
          <BookmarkLinearIcon {...stylex.props(styles.icon)} />
        </button>
        <button
          type="button"
          {...stylex.props(styles.btnWrapper, styles.primaryBtnWrapper)}
          onClick={openAppDownloadModal}
        >
          <div {...stylex.props(styles.flexCenter, styles.primaryBtn)}>
            앱 설치하고 공유하기
          </div>
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    gap: 12,
    padding: "0 10px",
    height: 90,
    background: "#fff",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    padding: "16px 6px",
    margin: "-16px -6px",
  },
  icon: {
    width: 48,
    height: 48,
  },
  primaryBtnWrapper: {
    flex: 1,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    background: "#FF7900",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "22px",
  },
});
