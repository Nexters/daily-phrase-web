import * as z from "zod";

const loginSchema = z.object({
  id: z.string().min(3, "Required"),
  password: z.string().min(8, "Required"),
});

export default loginSchema;
