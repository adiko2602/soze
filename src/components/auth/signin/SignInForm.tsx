"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useSignInForm } from "@/lib/hooks/auth/signIn/useSignInForm";
import { useSignInMutation } from "@/lib/hooks/auth/signIn/useSignInMutation";
import Loader from "@/components/ui/loader";

function SignInForm() {
  const { signInForm } = useSignInForm();
  const { signInMutation, loading } = useSignInMutation();

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(signInMutation)}
        className="space-y-8"
      >
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz adres email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz hasło" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full">
          {loading && <Loader />} Zaloguj
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
