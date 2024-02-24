interface BaseResponseError {
  status: number;
  message?: string;
  redirectUrl?: string;
  notFound?: boolean;
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
    redirectUrl = "",
    notFound = false,
  }: BaseResponseError) {
    super({ status, message, redirectUrl, notFound });
    this.redirectUrl = redirectUrl;
    this.notFound = notFound;
  }
}

export class NotFoundError extends ApiError {
  constructor({
    status,
    message = "페이지를 찾을 수 없습니다.", // message 임시 처리
    redirectUrl = "",
  }: BaseResponseError) {
    super({ status, message, redirectUrl, notFound: true });
    this.redirectUrl = redirectUrl;
    this.notFound = true;
  }
}

export class ForbiddenError extends ApiError {
  constructor({
    status,
    message = "인가처리에 실패했습니다.",
    redirectUrl = "login",
  }: BaseResponseError) {
    super({ status, message, redirectUrl, notFound: false });
    this.redirectUrl = redirectUrl;
    this.notFound = false;
  }
}

export class AuthError extends ApiError {
  constructor({
    status,
    message = "인증되지 않은 사용자입니다.",
    redirectUrl = "login",
  }: BaseResponseError) {
    super({ status, message, redirectUrl, notFound: false });
    this.redirectUrl = redirectUrl;
    this.notFound = false;
  }
}
