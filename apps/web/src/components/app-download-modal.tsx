"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { create } from "zustand";
import { AOS_APP_LINK } from "~/constants";
import { detectDevice } from "~/libs/detect-device";
import { cn } from "~/libs/utils";

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
  const router = useRouter();

  const onClickDownloadApp = () => {
    close();
    // TODO: 앱이 있으면 앱 열기, 없으면 playstore로 이동
    const device = detectDevice();
    if (device === "android") window.open(AOS_APP_LINK);
    else if (device !== null) router.push("/ios-not-supported");
    if (device !== null) window.clarity?.("event", `install-modal-${device}`);
  };

  const onClickClose = (isButtonClick: boolean) => {
    close();
    window.clarity?.(
      "event",
      isButtonClick ? "install-modal-close-button" : "install-modal-dim-close",
    );
  };

  if (status === "unmounted") {
    return null;
  }

  return (
    <>
      {createPortal(
        <RemoveScroll removeScrollBar={false}>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className={cn(
              status === "mounted" && "animate-fade-in",
              status === "closed" && "animate-fade-out",
              "fixed inset-0 bg-black bg-opacity-40",
            )}
            onClick={() => onClickClose(false)}
          />
          <div
            className={cn(
              status === "mounted" && "animate-fade-in",
              status === "closed" && "animate-stage-out",
              "bg-white fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[272px] overflow-hidden rounded-[8px] p-4 pt-[21px] text-[16px] leading-[22px]",
            )}
            onAnimationEnd={transferStatus}
          >
            <p className="text-black font-semibold text-center">
              앱 설치하고
              <br />
              글귀를 공유하세요
            </p>
            <div className="mt-4 flex flex-col gap-0.5">
              <button
                type="button"
                className="flex items-center justify-center w-full h-10 rounded-[8px] overflow-hidden font-semibold text-white bg-[#FF7900]"
                onClick={onClickDownloadApp}
              >
                앱 설치하기
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full h-10 rounded-[8px] overflow-hidden"
                onClick={() => onClickClose(true)}
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
