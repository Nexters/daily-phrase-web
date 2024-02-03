export interface ResponseError {
  status: number;
  message: string;
}

export interface ResponseSuccess<T> {
  data: T;
  status: number;
  isSuccess: boolean;
}
