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

function isApiResponse(obj: unknown): obj is ApiResponse<unknown> {
  return obj instanceof ApiResponse;
}

function handleSuccessApiResponse(res: unknown) {
  if (isAxiosResponse(res)) {
    const data: ApiResponse<unknown> = res.data;
    toast({
      title: "Sukces",
      description: data.message,
    });
  }

  if (isApiResponse(res)) {
    toast({
      title: "Sukces",
      description: res.message,
    });
  }
}

function handleErrorApiResponse(err: unknown) {
  if (err instanceof AxiosError) {
    const data: ApiResponse<unknown> = err.response?.data;
    toast({
      title: "Wystąpił błąd",
      description: data.message,
      variant: "destructive",
    });
  }

  if (isApiResponse(err)) {
    toast({
      title: "Wystąpił błąd",
      description: err.message,
      variant: "destructive",
    });
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleErrorApiResponse,
    onSuccess: handleSuccessApiResponse,
  }),

  mutationCache: new MutationCache({
    onError: handleErrorApiResponse,
    onSuccess: handleSuccessApiResponse,
  }),
});
