export * from "./fetch";
export * from "./phrase.type";

export interface ApiData<T> {
  isSuccess: true;
  code: string;
  message: string;
  result: T;
}
