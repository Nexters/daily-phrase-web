import { getAspectRatio } from "~/libs/utils";

export interface AspectRatioImgProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  radio: string;
}

export default function AspectRatioImg({
  radio,
  src,
  alt,
  style,
  ...props
}: AspectRatioImgProps) {
  return (
    <div
      {...props}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        paddingBottom: `${100 / getAspectRatio(radio)}%`,
      }}
    >
      <img
        alt={alt}
        src={src}
        className="w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
}
