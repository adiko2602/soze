"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";

function CardHeaderBack({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center gap-2">
      <div>
        <Button className="p-3" variant="outline" onClick={router.back}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default CardHeaderBack;
