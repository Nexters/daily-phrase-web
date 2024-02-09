"use client";

import { PropsWithChildren, Suspense, useCallback } from "react";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorBoundary, {
  ErrorBoundaryCommonProps,
  ErrorBoundaryWithErrorFallback,
  ErrorBoundaryWithErrorFallbackRender,
} from "./error-boundary";

type ErrorBoundaryFallbackProps =
  | ErrorBoundaryWithErrorFallback
  | ErrorBoundaryWithErrorFallbackRender;

type Props = ErrorBoundaryFallbackProps & {
  LoadingFallback: JSX.Element;
  keys?: ErrorBoundaryCommonProps["keys"];
};

const AsyncBoundary = (props: PropsWithChildren<Props>) => {
  const {
    LoadingFallback,
    errorFallbackRender,
    ErrorFallback,
    children,
    keys,
  } = props;
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  if (typeof errorFallbackRender === "function")
    return (
      <ErrorBoundary
        reset={resetHandler}
        errorFallbackRender={errorFallbackRender}
        keys={keys}
      >
        <Suspense fallback={LoadingFallback}>{children}</Suspense>
      </ErrorBoundary>
    );
  if (ErrorFallback)
    return (
      <ErrorBoundary
        reset={resetHandler}
        ErrorFallback={ErrorFallback}
        keys={keys}
      >
        <Suspense fallback={LoadingFallback}>{children}</Suspense>
      </ErrorBoundary>
    );
  return <Suspense fallback={LoadingFallback}>{children}</Suspense>;
};

export default AsyncBoundary;
