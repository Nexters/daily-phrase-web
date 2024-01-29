interface BaseResponseError {
  status: number;
  message: string;
}

export class BaseError extends Error {
  status: number;

  constructor({ status, message = "http exception" }: BaseResponseError) {
    super(message);
    this.status = status;
  }
}

export class ApiError extends BaseError {
  redirectUrl: string;
  notFound: boolean;

  constructor({
    status,
    message = "api 통신 에러가 발생했습니다.",
  }: BaseResponseError) {
    super({ status, message });
    this.redirectUrl = "";
    this.notFound = false;
  }
}

export class NotFoundError extends ApiError {
  constructor({
    status,
    message = "페이지를 찾을 수 없습니다.", // message 임시 처리
  }: BaseResponseError) {
    super({ status, message });
    this.notFound = true;
  }
}

export class ForbiddenError extends ApiError {
  constructor({
    status,
    message = "인가처리에 실패했습니다.",
  }: BaseResponseError) {
    super({ status, message });
    this.redirectUrl = "/signin";
    this.notFound = false;
  }
}

export class AuthError extends ApiError {
  constructor({
    status,
    message = "인증되지 않은 사용자입니다.",
  }: BaseResponseError) {
    super({ status, message });
    this.redirectUrl = "/signin";
    this.notFound = false;
  }
}
