"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../query/queryClient";
import { Toaster } from "@/components/ui/toaster";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
