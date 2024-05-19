import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValidation } from "@/lib/validators/auth/signUp.validator";
import { TSignUp } from "@/lib/validators";

export function useSignUpForm() {
  const signUpForm = useForm<TSignUp>({
    resolver: zodResolver(SignUpValidation),
    mode: "onBlur",
  });

  return { signUpForm };
}
