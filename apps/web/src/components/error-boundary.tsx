import React from 'react';

export type BasicErrorFallbackRenderProps = {
  reset: () => void;
  error: Error | null;
};

export type ErrorBoundaryCommonProps = React.PropsWithChildren<{
  reset?: () => void;
  keys?: Array<unknown>;
}>;

declare function ErrorFallbackRender({
  reset,
  error,
}: BasicErrorFallbackRenderProps): React.ReactNode;

export type ErrorBoundaryWithErrorFallbackRender = {
  errorFallbackRender: typeof ErrorFallbackRender;
  ErrorFallback?: never;
};

export type ErrorBoundaryWithErrorFallback = {
  errorFallbackRender?: never;
  ErrorFallback: React.ReactNode;
};

type ErrorBoundaryProps = ErrorBoundaryCommonProps &
  (ErrorBoundaryWithErrorFallbackRender | ErrorBoundaryWithErrorFallback);

type State = {
  hasError: boolean;
  error: Error | null;
};
const initialState = { hasError: false, error: null };

const changedArray = (
  prevArray: Array<unknown> = [],
  nextArray: Array<unknown> = []
) => {
  return (
    prevArray.length !== nextArray.length ||
    prevArray.some((item, index) => {
      return !Object.is(item, nextArray[index]);
    })
  );
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: State) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      changedArray(prevProps.keys, keys)
    ) {
      this.resetBoundary();
    }
  }

  resetBoundary = () => {
    const { reset } = this.props;
    reset?.();
    this.setState(initialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, errorFallbackRender, ErrorFallback } = this.props;

    if (!hasError) return children;

    if (typeof errorFallbackRender === 'function') {
      return errorFallbackRender({
        reset: this.resetBoundary,
        error,
      });
    }
    if (ErrorFallback) return ErrorFallback;
  }
}
