import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignIn } from "@/lib/validators";
import { SignInValidation } from "@/lib/validators/auth/signIn.validator";

export function useSignInForm() {
  const signInForm = useForm<TSignIn>({
    resolver: zodResolver(SignInValidation),
    mode: "onBlur",
  });

  return { signInForm };
}
