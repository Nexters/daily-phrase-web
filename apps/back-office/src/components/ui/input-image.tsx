"use client";

import { PlusIcon, XIcon } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn, getGCD, renderFileSize } from "~/libs/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";

export type InputImageValue = {
  /** base64 */
  src: string | ArrayBuffer | null;
  previewSrc?: string;
  radio: string;
  width?: number;
  height?: number;
  /**
   * 단위 KB
   */
  size?: number;
  filename?: string;
};

export type InputImageProps = {
  className?: string;
  options?: DropzoneOptions;
  value?: InputImageValue[];
  previewMaxHeight?: number;
  onChange?: React.Dispatch<React.SetStateAction<InputImageValue[]>>;
};

let prevValue: InputImageValue[];

export default function InputImage({
  value = [],
  previewMaxHeight = 300,
  className,
  options,
  onChange,
}: InputImageProps) {
  const v = useRef(value);

  const [imgList, setImgList] = useState<InputImageValue[]>(value);

  useEffect(() => {
    // TODO: 임시로 상태 변경 무한 루프 방지... forward ref로 해결해야함
    if (JSON.stringify(prevValue) === JSON.stringify(value)) return;

    v.current = value;
    setImgList(value);
    prevValue = value;
  }, [value]);

  useEffect(() => {
    onChange?.(imgList);
  }, [imgList, onChange]);

  const onRemoveImg = (index: number) => {
    if (options?.disabled) return;

    setImgList(imgList.filter((_, i) => i !== index));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();

      reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
      reader.onerror = () => toast.error("파일 등록에 실패했습니다.");
      reader.onload = () => {
        const previewSrc = URL.createObjectURL(file);

        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const gcd = getGCD(width, height);
          const radio = `${width / gcd}:${height / gcd}`;
          const size = Math.floor(file.size / 1024); // 단위 KB

          setImgList((list) => [
            ...list,
            {
              src: reader.result,
              previewSrc,
              width,
              height,
              radio,
              size,
              filename: file.name,
            },
          ]);
        };
        img.src = previewSrc;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <div
      className={cn(
        "text-muted-foreground",
        options?.disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            "-mx-2 px-2 py-2 flex rounded-md cursor-pointer transition hover:bg-secondary",
            options?.disabled && "cursor-not-allowed opacity-50",
            isDragActive && "bg-secondary",
          )}
        >
          <span>이미지를 추가해주세요.</span>
          <div className="ml-auto">
            <PlusIcon size={24} />
          </div>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className={cn("flex w-max space-x-4", imgList.length && "pb-4")}>
          {imgList.map((img, index) => {
            return (
              <div
                key={`${index}${img.filename}`}
                className="mt-2 flex-shrink-0"
              >
                <div className="relative group">
                  <img
                    src={typeof img.src === "string" ? img.src : img.previewSrc}
                    alt="미리보기"
                    className="max-w-full h-auto"
                    style={{ maxHeight: previewMaxHeight }}
                  />
                  <button
                    type="button"
                    className={cn(
                      "absolute inset-0 z-10 flex items-center justify-center text-primary-foreground bg-primary/40 transition opacity-0 group-hover:opacity-100",
                      options?.disabled && "cursor-not-allowed",
                    )}
                    onClick={() => onRemoveImg(index)}
                    onKeyDown={() => onRemoveImg(index)}
                  >
                    <XIcon size={24} />
                  </button>
                </div>
                <div className="mt-2 text-sm">
                  <div className="font-medium">{img.filename}</div>
                  {!!img.width && !!img.height && (
                    <div>
                      크기:
                      <span className="font-medium ml-1">
                        {img.width}x{img.height}
                      </span>
                    </div>
                  )}
                  <div>
                    비율:<span className="font-medium ml-1">{img.radio}</span>
                  </div>
                  {!!img.size && (
                    <div>
                      용량:
                      <span className="font-medium ml-1">
                        {renderFileSize(img.size)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
