"use client";

import { Phrase } from "@daily-phrase/api";
import { EyeIcon, LikeLinearIcon } from "~/components/ui/icons";
import { cn, numberWithCommas } from "~/libs/utils";
import { useAppDownloadModalStore } from "./app-download-modal";

export type PhraseCardProps = {
  className?: string;
  phrase: Phrase;
};

export default function PhraseCard({ className, phrase }: PhraseCardProps) {
  const openAppDownloadModal = useAppDownloadModalStore((state) => state.open);

  return (
    <div className={cn("flex flex-col pt-2 pb-4", className)}>
      <a href={`/phrase-web/${phrase.phraseId}`}>
        <div className="mb-1 pt-2 text-black text-[20px] font-semibold leading-[27px]">
          {phrase.title}
        </div>
        <p className="mb-2.5 text-base leading-[22px] text-[#64696B] line-clamp-2 text-ellipsis">
          {phrase.content}
        </p>
        <div className="mb-2.5 w-full h-[180px] flex items-center justify-center bg-[#DADADA] rounded-[10px] overflow-hidden">
          <img src={phrase.imageUrl} alt="" className="w-full h-full" />
        </div>
      </a>
      <div className="flex justify-between align-center gap-2.5">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-0.5 py-1.5 px-[22px] text-[#64696B] text-[14px] leading-[22px] rounded-[10px] border border-[#DADADA]"
          onClick={openAppDownloadModal}
        >
          <EyeIcon width={20} height={20} />
          <span>{numberWithCommas(phrase.viewCount)}</span>
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-0.5 py-1.5 px-[22px] text-[#64696B] text-[14px] leading-[22px] rounded-[10px] border border-[#DADADA]"
          onClick={openAppDownloadModal}
        >
          <LikeLinearIcon width={20} height={20} />
          <span>{numberWithCommas(phrase.likeCount)}</span>
        </button>
      </div>
    </div>
  );
}
