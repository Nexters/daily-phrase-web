import LoginForm from "~/components/login/login-form";

export default function Page() {
  return (
    <div className="p-6 rounded-lg border-[1px] border-slate-300">
      {/** @todo typography 컴포넌트 필요 */}
      <span className="text-lg font-semibold leading-7">Login</span>
      <LoginForm />
    </div>
  );
}
