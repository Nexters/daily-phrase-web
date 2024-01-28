import LoginForm from "~/components/login/login-form";

export default function Page() {
  return (
    <>
      {/** @todo typography 컴포넌트 필요 */}
      <span className="text-lg font-semibold leading-7">Login</span>
      <LoginForm />
    </>
  );
}
