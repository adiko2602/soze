"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUp } from "@/lib/validators";
import { SignUpValidation } from "@/lib/validators/auth/signUp.validator";
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
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

function SignUpCard() {
  const router = useRouter();
  const { mutate, status } = useMutation({
    mutationFn: async (values: TSignUp) =>
      await ApiRequest.post("/api/auth", values),
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUpValidation),
    mode: "onBlur",
  });

  function onSubmit() {
    const values: TSignUp = form.getValues();
    mutate(values);
  }

  return (
    <Card>
      <CardHeader>Zarejestruj się</CardHeader>
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
              name="passwords.password"
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

            <FormField
              control={form.control}
              name="passwords.confirmedPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Powtórz hasło</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Powtórz hasło"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              disabled={status === "pending" ? true : false}
              type="submit"
              className="w-full"
            >
              {status === "pending" && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Zarejestruj
            </Button>
          </form>
        </Form>
        <div className="pt-4">
          Jeśli masz już konto możesz przejść do{" "}
          <Link href="/auth/signin" className="underline">
            logowania
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
