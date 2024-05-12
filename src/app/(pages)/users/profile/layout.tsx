import React from "react";

function UsersProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-96">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default UsersProfileLayout;
