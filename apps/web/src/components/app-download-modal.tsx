"use client";
import * as stylex from "@stylexjs/stylex";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { create } from "zustand";

export const useAppDownloadModalStore = create<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
}>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default function AppDownloadModal() {
  const { isOpen, close } = useAppDownloadModalStore();

  const onClickDownloadApp = () => {
    close();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        <RemoveScroll enabled={isOpen}>
          <div {...stylex.props(styles.backdrop)} onClick={close} />
          <div {...stylex.props(styles.card)}>
            <p {...stylex.props(styles.title)}>
              앱 설치하고
              <br />
              글귀를 공유하세요
            </p>
            <div {...stylex.props(styles.btnWrapper)}>
              <button
                type="button"
                {...stylex.props(styles.btn, styles.appDownloadBtn)}
                onClick={onClickDownloadApp}
              >
                앱 설치하기
              </button>
              <button
                type="button"
                {...stylex.props(styles.btn, styles.closeBtn)}
                onClick={close}
              >
                닫기
              </button>
            </div>
          </div>
        </RemoveScroll>,
        document.body,
      )}
    </>
  );
}

const styles = stylex.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    background: "#fff",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 272,
    overflow: "hidden",
    borderRadius: 8,
    padding: 16,
    paddingTop: 21,
    fontSize: 16,
    lineHeight: "22px",
  },
  title: {
    color: "#000",
    fontWeight: 600,
    textAlign: "center",
  },
  btnWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  appDownloadBtn: {
    fontWeight: 600,
    color: "#FFF",
    backgroundColor: "#FF7900",
  },
  closeBtn: {
    fontWeight: 400,
  },
});
