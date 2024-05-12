"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignIn } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignInValidation } from "@/lib/validators/auth/signIn.validator";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

function SignInCard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInValidation),
    mode: "onChange",
  });

  const onSubmit = async (values: TSignIn) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast({
        title: "Wystąpił błąd",
        description: result.error,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Sukces",
      description: "Zalogowano prawidłowo",
      variant: "default",
    });
    setLoading(false);

    router.push("/");
  };

  return (
    <Card>
      <CardHeader>Zaloguj się</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Wpisz hasło"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full">
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Zaloguj
            </Button>
          </form>
        </Form>
        <div className="pt-4">
          Jeśli nie masz konta możesz przejść do{" "}
          <Link className="underline" href="/auth/signup">
            rejestracji
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
