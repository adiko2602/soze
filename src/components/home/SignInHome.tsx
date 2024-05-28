"use client";

import { useSession } from "next-auth/react";
import React from "react";

function SignInHome() {
  const { data: session } = useSession();
  return (
    <div>
      Witaj{" "}
      <strong>
        {session?.user.personals.firstName} {session?.user.personals.lastName}
      </strong>
      ! Jeśli chcesz skorzystać z systemu kliknij w przycisk menu, aby
      wyświetlić dostępne dla Ciebie opcje.
    </div>
  );
}

export default SignInHome;
