import { Checkbox } from "../ui/checkbox";

type OnCheck = Parameters<typeof Checkbox>[0]["onCheckedChange"];
type OnDelete = (
  id: number,
  ...params: Parameters<NonNullable<OnCheck>>
) => void;

export type { OnCheck, OnDelete };
