export interface ResponseError {
  status: number;
  message: string;
}

export interface ResponseSuccess<T> {
  data: T;
  status: number;
  isSuccess: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
