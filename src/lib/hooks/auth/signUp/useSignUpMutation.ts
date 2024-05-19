import { useMutation } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { TSignUp } from "@/lib/validators";

export function useSignUpMutation() {
  const signUpMutation = useMutation({
    mutationFn: async (values: TSignUp) =>
      await ApiRequest.post("/api/auth", values),
  });

  return { signUpMutation };
}
