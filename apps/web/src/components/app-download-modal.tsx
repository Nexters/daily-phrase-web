"use client";
import * as stylex from "@stylexjs/stylex";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { create } from "zustand";

type ModalStatus = "mounted" | "opened" | "closed" | "unmounted";

export const useAppDownloadModalStore = create<{
  status: ModalStatus;
  open: () => void;
  close: () => void;
  transferStatus: () => void;
}>((set, get) => ({
  status: "unmounted",
  open: () => {
    if (get().status === "unmounted") {
      set({ status: "mounted" });
    }
  },
  close: () => {
    if (get().status === "opened") {
      set({ status: "closed" });
    }
  },
  transferStatus: () => {
    const { status } = get();

    if (status === "mounted") {
      set({ status: "opened" });
    } else if (status === "closed") {
      set({ status: "unmounted" });
    }
  },
}));

export default function AppDownloadModal() {
  const { status, close, transferStatus } = useAppDownloadModalStore();

  const onClickDownloadApp = () => {
    close();

    // TODO: ios의 경우 안내창 띄우기
    // TODO: 앱이 있으면 앱 열기, 없으면 playstore로 이동
  };

  if (status === "unmounted") {
    return null;
  }

  return (
    <>
      {createPortal(
        <RemoveScroll>
          <div
            {...stylex.props(
              status === "mounted" && styles.backdropIn,
              status === "closed" && styles.backdropOut,
              styles.backdrop,
            )}
            onClick={close}
          />
          <div
            {...stylex.props(
              status === "mounted" && styles.cardIn,
              status === "closed" && styles.cardOut,
              styles.card,
            )}
            onAnimationEnd={transferStatus}
          >
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
  backdropIn: {
    animationName: stylex.keyframes({
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    }),
    animationDuration: "150ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  backdropOut: {
    animationName: stylex.keyframes({
      "0%": { opacity: 1 },
      "100%": { opacity: 0 },
    }),
    animationDuration: "150ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
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
  cardIn: {
    animationName: stylex.keyframes({
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    }),
    animationDuration: "200ms",
    animationTimingFunction: "ease-out",
  },
  cardOut: {
    animationName: stylex.keyframes({
      "0%": { opacity: 1, transform: "translate3d(-50%,-50%,0)" },
      "100%": { opacity: 0, transform: "translate3d(-50%,-45%,0)" },
    }),
    animationDuration: "200ms",
    animationTimingFunction: "ease-out",
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
