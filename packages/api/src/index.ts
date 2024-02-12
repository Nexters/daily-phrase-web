export * from "./fetch";
export * from "./phrase.type";

export interface ApiData<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  status: number;
}
