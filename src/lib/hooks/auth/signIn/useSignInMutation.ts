import { TSignIn } from "@/lib/validators";
import { signIn } from "next-auth/react";

export function useSignInMutation() {
  const signInMutation = async (values: TSignIn) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(result);
    return result;
  };

  return { signInMutation };
}
