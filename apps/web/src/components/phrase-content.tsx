import { Phrase } from "@daily-phrase/api";
import AspectRatioImg from "./ui/aspect-radio-img";

export default function PhraseContent({ phrase }: { phrase: Phrase }) {
  return (
    <div className="flex flex-col py-8">
      <div className="mb-4 px-4 text-black text-[28px] font-semibold leading-[36px]">
        {phrase.title}
      </div>
      {phrase.imageUrl && (
        <AspectRatioImg
          src={phrase.imageUrl}
          alt="글귀 이미지"
          radio={phrase.imageRatio}
          className="mb-4 w-full min-h-[18px] flex items-center justify-center bg-[#DADADA]"
        />
      )}
      <div className="px-4 text-black text-[18px] leading-[29px] whitespace-pre-wrap">
        {phrase.content}
      </div>
    </div>
  );
}
