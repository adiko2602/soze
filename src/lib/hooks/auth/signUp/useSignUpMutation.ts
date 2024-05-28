import { useMutation } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { TSignUp } from "@/lib/validators";
import { useRouter } from "next/navigation";

export function useSignUpMutation() {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (values: TSignUp) =>
      await ApiRequest.post("/api/auth", values),
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  return { signUpMutation };
}
