"use client";

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { ApiResponse } from "../api/ApiResponse";

function isAxiosResponse(obj: any): obj is AxiosResponse {
  return (
    obj &&
    typeof obj.data !== "undefined" &&
    typeof obj.status !== "undefined" &&
    typeof obj.headers !== "undefined"
  );
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        const data: ApiResponse<unknown> = err.response?.data;
        toast({
          title: "Wystąpił błąd",
          description: data.message,
          variant: "destructive",
        });
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        const data: ApiResponse<unknown> = err.response?.data;
        toast({
          title: "Wystąpił błąd",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onSuccess: (res: unknown) => {
      if (isAxiosResponse(res)) {
        const data: ApiResponse<unknown> = res.data;
        toast({
          title: "Sukces",
          description: data.message,
        });
      }
    },
  }),
});
