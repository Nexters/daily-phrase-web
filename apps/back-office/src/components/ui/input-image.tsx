"use client";

import { PlusIcon, XIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn, getGCD, renderFileSize } from "~/libs/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";

export type InputImageValue = {
  src: string;
  radio: string;
  width?: number;
  height?: number;
  /**
   * 단위 KB
   */
  size?: number;
};

export type InputImageProps = {
  className?: string;
  options?: DropzoneOptions;
  value?: InputImageValue[];
  previewMaxHeight?: number;
  onChange?: React.Dispatch<React.SetStateAction<InputImageValue[]>>;
};

export default function InputImage({
  value = [],
  previewMaxHeight = 300,
  className,
  options,
  onChange,
}: InputImageProps) {
  const initValue = useMemo(() => value, [value]);
  const [imgList, setImgList] = useState<InputImageValue[]>(initValue);

  useEffect(() => {
    onChange?.(imgList);
  }, [imgList, onChange]);

  const onRemoveImg = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();

      reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
      reader.onerror = () => toast.error("파일 등록에 실패했습니다.");
      reader.onload = () => {
        const src = URL.createObjectURL(file);

        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const gcd = getGCD(width, height);
          const radio = `${width / gcd}:${height / gcd}`;
          const size = Math.floor(file.size / 1024); // 단위 KB

          setImgList((list) => [...list, { src, width, height, radio, size }]);
        };
        img.src = src;
      };
      reader.readAsArrayBuffer(file);
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
    <div className={cn("text-muted-foreground", className)}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            "-mx-2 px-2 py-2 flex rounded-md cursor-pointer transition hover:bg-secondary",
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
              <div key={img.src} className="mt-2 flex-shrink-0">
                <div className="relative group">
                  <img
                    src={img.src}
                    alt="미리보기"
                    className="max-w-full h-auto"
                    style={{ maxHeight: previewMaxHeight }}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 z-10 flex items-center justify-center text-primary-foreground bg-primary/40 transition opacity-0 group-hover:opacity-100"
                    onClick={() => onRemoveImg(index)}
                    onKeyDown={() => onRemoveImg(index)}
                  >
                    <XIcon size={24} />
                  </button>
                </div>
                <div className="mt-2 text-sm">
                  <div>
                    크기:
                    <span className="font-medium ml-1">
                      {img.width}x{img.height}
                    </span>
                  </div>
                  <div>
                    비율:<span className="font-medium ml-1">{img.radio}</span>
                  </div>
                  <div>
                    용량:
                    <span className="font-medium ml-1">
                      {renderFileSize(img.size ?? 0)}
                    </span>
                  </div>
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
