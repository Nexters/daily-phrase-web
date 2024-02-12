"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import { apis } from "~/apis";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/apis/config/cookie/token";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/libs/utils";
import loginSchema from "./login-form.schema";
import { LoginSchema } from "./login-form.type";

const LoginForm = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginSchema) => apis.loginApi.login(data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onError: () => toast.error("로그인에 실패했습니다."),
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      onSuccess: (res: any) => {
        setCookie(ACCESS_TOKEN, res.result.accessToken);
        setCookie(REFRESH_TOKEN, res.result.refreshToken);

        toast.success("로그인에 성공했습니다.");
        router.push("/");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-8">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-left font-medium">
            ID
          </Label>
          <Input
            id="id"
            {...register("id")}
            className="col-span-3 border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="ID"
          />

          {errors.id?.message && (
            <ErrorMessage>{errors.id?.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-left font-medium">
            Password
          </Label>
          <Input
            id="password"
            {...register("password")}
            className="col-span-3 border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Password"
          />
          {errors.password?.message && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button className="w-fit" type="submit" disabled={isPending}>
          {isPending ? "Loading.." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

/** @todo 에러 메시지 컴포넌트화 */
const ErrorMessage = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <span className={cn("text-red-500", className)}>{children}</span>;
};
