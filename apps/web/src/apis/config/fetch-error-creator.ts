import {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
} from "@daily-phrase/api";
import { ResponseError } from "../apis.type";

export const fetchErrorCreator = <Response extends ResponseError>(
  err: Response,
): ApiError => {
  const { status } = err;
  if (status === 404) return new NotFoundError({ status });
  if (status === 403) return new ForbiddenError({ status });
  if (status === 401) return new AuthError({ status });
  return new ApiError({ status });
};
