import { useToast } from "@/components/ui/use-toast";
import { TSignIn } from "@/lib/validators";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSignInMutation() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const signInMutation = async (values: TSignIn) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(result);
    setLoading(false);

    if (result?.error) {
      toast({
        title: "Wystąpił błąd",
        description: result.error,
        variant: "destructive",
      });
      return result;
    }

    router.push("/");
  };

  return { signInMutation, loading };
}
