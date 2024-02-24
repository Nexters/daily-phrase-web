import { useCallback, useEffect, useRef, useState } from "react";

interface GetTextareaRowsProps {
  textarea: HTMLTextAreaElement;
  lineHeight: number;
}

const getTextareaRows = ({ textarea, lineHeight }: GetTextareaRowsProps) => {
  textarea.style.height = "0px";
  return Math.ceil(textarea.scrollHeight / lineHeight);
};

const getLineHeight = (textarea: HTMLTextAreaElement) => {
  return parseInt(getComputedStyle(textarea).lineHeight);
};

interface GetTextareaHeightProps {
  textarea: HTMLTextAreaElement;
  maxRows?: number;
}

const getTextareaHeight = ({ textarea }: GetTextareaHeightProps): number => {
  const lineHeight = getLineHeight(textarea);
  return getTextareaRows({ textarea, lineHeight }) * lineHeight;
};

function useTextareaHeight(unit: "px") {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState(0);

  const setTextareaHeight = useCallback(
    (textarea: HTMLTextAreaElement) => {
      const textareaHeight = getTextareaHeight({ textarea });
      setHeight(textareaHeight);
      textarea.style.height = textareaHeight + unit;
    },
    [unit],
  );

  /** @todo rAF로 최적화 */
  useEffect(() => {
    const resizeHeightCallback = () => {
      if (!textAreaRef.current) return;
      setTextareaHeight(textAreaRef.current);
    };
    window.addEventListener("resize", resizeHeightCallback);
    return () => window.removeEventListener("resize", resizeHeightCallback);
  }, [setTextareaHeight]);

  return { textAreaRef, setTextareaHeight, height };
}

export default useTextareaHeight;
