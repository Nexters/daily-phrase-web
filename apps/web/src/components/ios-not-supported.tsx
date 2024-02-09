import { NotSupported } from "./ui/icons";

const IosNotSupported = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NotSupported className="mb-[16px]" />
      <div className="flex flex-col justify-center items-center">
        <span className="block mb-[4px] font-medium text-xl">
          아이폰은 준비 중이에요.
        </span>
        <span className="text-[#64696B]">
          현재 안드로이드만 지원하고 있어요.
        </span>
      </div>
    </div>
  );
};

export default IosNotSupported;
