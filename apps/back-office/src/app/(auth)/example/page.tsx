import { Separator } from "~/components/ui/separator";
import ExampleInputImage from "./example-input-image";

export default function Page() {
  return (
    <div className="px-6 py-8 pb-[126px] space-y-7">
      <ExampleInputImage />
      <Separator className="my-7" />
    </div>
  );
}
