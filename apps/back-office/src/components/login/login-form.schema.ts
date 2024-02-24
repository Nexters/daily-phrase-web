import * as z from "zod";

const loginSchema = z.object({
  id: z.string().min(3, "ID를 3자 이상 입력해 주세요."),
  password: z.string().min(8, "비밀번호를 8자 이상 입력해 주세요."),
});

export default loginSchema;
