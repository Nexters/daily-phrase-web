import { QueryClient } from "@tanstack/react-query";
import { TIME_1_MIN } from "./time";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: TIME_1_MIN,
      refetchOnWindowFocus: false,
    },
  },
});
