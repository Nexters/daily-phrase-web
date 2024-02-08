import { BasicErrorFallbackRenderProps } from "./error-boundary";
import { Button } from "./ui/button";

const ErrorFallback = ({ error, reset }: BasicErrorFallbackRenderProps) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <span>{error?.message}</span>
      <Button type="button" onClick={reset} className="w-fit mt-[12px]">
        재시도
      </Button>
    </div>
  );
};

export default ErrorFallback;
