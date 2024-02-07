"use client";

import * as stylex from "@stylexjs/stylex";
import { useAppDownloadModalStore } from "./app-download-modal";

export default function GoAppCard() {
  const openAppDownloadModal = useAppDownloadModalStore((state) => state.open);

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.title)}>
        앱 설치하고
        <br />
        매일 업데이트 되는 글귀를
        <br />
        확인하세요.
      </div>
      <button
        type="button"
        {...stylex.props(styles.btn, styles.cardBtn)}
        onClick={openAppDownloadModal}
      >
        글귀 보러가기
      </button>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    padding: "30px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#1D1B20",
    fontSize: 28,
    lineHeight: "36px",
    fontWeight: 600,
    textAlign: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    height: 40,
    backgroundColor: "#FFEAB1",
    borderRadius: 8,
    fontWeight: 600,
  },
  cardBtn: {
    marginTop: 16,
  },
});
