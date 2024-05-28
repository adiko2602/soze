import React from "react";
import Loader from "./loader";

function CardHeaderLoader({
  children,
  isLoading,
}: Readonly<{
  children: React.ReactNode;
  isLoading: boolean;
}>) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div>{children}</div>
      <div>{isLoading && <Loader />}</div>
    </div>
  );
}

export default CardHeaderLoader;
