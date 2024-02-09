import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";
import * as z from "zod";

export const manageSchema = z.object({
  title: z.string(),
  imageList: z.array(
    z.object({
      src: z.string(),
      radio: z.string(),
      size: z.number(),
    }),
  ),
  content: z.string(),
});

export const manageResolver = zodResolver(manageSchema);

export type ManageValues = z.infer<typeof manageSchema>;

export const defaultValues = {
  title: "",
  content: "",
  imageList: [],
} satisfies ManageValues;

export const manageFormProps = {
  resolver: manageResolver,
  defaultValues,
} satisfies UseFormProps<ManageValues>;
