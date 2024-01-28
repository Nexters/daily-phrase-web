import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Page() {
  return (
    <div className="p-6 rounded-lg border-[1px] border-slate-300">
      {/** @todo typography 컴포넌트 필요 */}
      <span className="text-lg font-semibold leading-7">Login</span>
      <div className="grid gap-4 py-8">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-left font-medium">
            ID
          </Label>
          <Input
            id="id"
            className="col-span-3 border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="ID"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-left font-medium">
            Password
          </Label>
          <Input
            id="password"
            className="col-span-3 border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button className="w-fit" type="submit">
          Login
        </Button>
      </div>
    </div>
  );
}
