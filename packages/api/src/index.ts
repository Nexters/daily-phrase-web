export * from "./fetch";
export * from "./phrase.type";

export interface ApiData<T> {
  isSuccess: "false" | "true";
  code: string;
  message: string;
  result: T;
  status: number;
}
