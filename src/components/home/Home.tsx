"use client";

import { useSession } from "next-auth/react";
import React from "react";
import SignInHome from "./SignInHome";
import NotSignInHome from "./NotSignInHome";

function Home() {
  const { data: session } = useSession();
  if (session?.user) return <SignInHome />;
  else return <NotSignInHome />;
}

export default Home;
