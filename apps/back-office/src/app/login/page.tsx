import LoginForm from "~/components/login/login-form";

export default function Page() {
  return (
    <div className="absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4 w-[425px] m-auto p-6 rounded-lg border-[1px] border-slate-300">
      {/** @todo typography 컴포넌트 필요 */}
      <span className="text-lg font-semibold leading-7">Login</span>
      <LoginForm />
    </div>
  );
}
