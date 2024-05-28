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
import { useSignUpForm } from "@/lib/hooks/auth/signUp/useSignUpForm";
import { useSignUpMutation } from "@/lib/hooks/auth/signUp/useSignUpMutation";
import { TSignUp } from "@/lib/validators";
import Loader from "@/components/ui/loader";

function SignUpForm() {
  const { signUpForm } = useSignUpForm();
  const { signUpMutation } = useSignUpMutation();

  const handleSubmit = (values: TSignUp) => {
    signUpMutation.mutate(values);
  };

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
          name="passwords.password"
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

        <FormField
          control={signUpForm.control}
          name="passwords.confirmedPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input placeholder="Powtórz hasło" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz imię" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz nazwisko" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="pesel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PESEL</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz PESEL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={signUpMutation.isPending}
          type="submit"
          className="w-full"
        >
          {signUpMutation.isPending && <Loader />} Zarejestruj
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
