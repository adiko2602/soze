"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateReport, TSignUp } from "@/lib/validators";
import { SignUpValidation } from "@/lib/validators/auth/signUp.validator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { CreateReportsValidation } from "@/lib/validators/reports/createReports.validation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { CommandInput } from "cmdk";
import { CheckIcon } from "lucide-react";
import { diseases, simc, terc } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";

function CreateReportCard() {
  const [fetchPow, setFetchPow] = useState(false);
  const [fetchGmi, setFetchGmi] = useState(false);
  const [fetchSym, setFetchSym] = useState(false);

  const form = useForm<TCreateReport>({
    resolver: zodResolver(CreateReportsValidation),
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: async (values: TCreateReport) =>
      await ApiRequest.post("/api/reports", values),
  });

  const { data: woj } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.get("/api/addresses/woj")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/addresses/woj"],
  });

  const { data: pow } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.post("/api/addresses/pow", {
          woj: form.getValues("woj"),
        })
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/addresses/pow"],
    enabled: fetchPow,
  });

  const { data: gmi } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.post("/api/addresses/gmi", {
          woj: form.getValues("woj"),
          pow: form.getValues("pow"),
        })
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/addresses/gmi"],
    enabled: fetchGmi,
  });

  const { data: sym } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<simc[]>(
        await ApiRequest.post("/api/addresses/sym", {
          woj: form.getValues("woj"),
          pow: form.getValues("pow"),
          gmi: form.getValues("gmi"),
        })
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/addresses/sym"],
    enabled: fetchSym,
  });

  const { data: diseases } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<diseases[]>(
        await ApiRequest.get("/api/diseases/")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/diseases/"],
  });

  function onSubmit() {
    const values: TCreateReport = form.getValues();
    mutate(values);
  }

  return (
    <Card>
      <CardHeader>Utwórz raport</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            {/* WOJEWÓDZTWO */}

            <FormField
              control={form.control}
              name="woj"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Województwo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? woj?.find((w) => w.woj === field.value)?.name
                            : "Wybierz województwo"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj województwo..."
                          className="p-1 py-2"
                        />
                        <CommandEmpty>Nie znaleziono województwa.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72">
                            {woj?.map((w) => (
                              <CommandItem
                                value={w.name}
                                key={w.id}
                                onSelect={() => {
                                  form.setValue("woj", w.woj);
                                  queryClient.invalidateQueries({
                                    queryKey: ["/api/addresses/pow"],
                                  });
                                  setFetchPow(true);
                                  form.resetField("pow", undefined);
                                  form.resetField("gmi", undefined);
                                  form.resetField("sym", undefined);
                                }}
                              >
                                {w.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    w.woj === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* POWIAT */}

            <FormField
              control={form.control}
              name="pow"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Powiat</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={form.getValues("woj") ? false : true}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? pow?.find((p) => p.pow === field.value)?.name
                            : "Wybierz powiat"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj powiat..."
                          className="p-1 py-2"
                        />
                        <CommandEmpty>Nie znaleziono powiatu.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72">
                            {pow?.map((p) => (
                              <CommandItem
                                value={p.name}
                                key={p.id}
                                onSelect={() => {
                                  form.setValue("pow", p.pow as number);
                                  queryClient.invalidateQueries({
                                    queryKey: ["/api/addresses/gmi"],
                                  });
                                  setFetchGmi(true);
                                  form.resetField("gmi", undefined);
                                  form.resetField("sym", undefined);
                                }}
                              >
                                {p.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    p.pow === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GMINA */}

            <FormField
              control={form.control}
              name="gmi"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gmina</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={form.getValues("pow") ? false : true}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? gmi?.find((g) => g.gmi === field.value)?.name
                            : "Wybierz gminę"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj gminę..."
                          className="p-1 py-2"
                        />
                        <CommandEmpty>Nie znaleziono gminy.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72">
                            {gmi?.map((g) => (
                              <CommandItem
                                value={g.name}
                                key={g.id}
                                onSelect={() => {
                                  form.setValue("gmi", g.gmi as number);
                                  queryClient.invalidateQueries({
                                    queryKey: ["/api/addresses/sym"],
                                  });
                                  setFetchSym(true);
                                  form.resetField("sym", undefined);
                                }}
                              >
                                {g.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    g.gmi === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MIASTO */}

            <FormField
              control={form.control}
              name="sym"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Miasto</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={form.getValues("gmi") ? false : true}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? sym?.find((s) => s.sym === field.value)?.name
                            : "Wybierz miasto"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj miasto..."
                          className="p-1 py-2"
                        />
                        <CommandEmpty>Nie znaleziono miasta.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72">
                            {sym?.map((s) => (
                              <CommandItem
                                value={s.name}
                                key={s.id}
                                onSelect={() => {
                                  form.setValue("sym", s.sym as number);
                                }}
                              >
                                {s.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    s.sym === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DISEASE */}

            <FormField
              control={form.control}
              name="disease"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Choroba</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between overflow-hidden",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <div>
                              {
                                diseases?.find((d) => d.id === field.value)
                                  ?.codeChildren
                              }{" "}
                              {
                                diseases?.find((d) => d.id === field.value)
                                  ?.nameChildren
                              }
                            </div>
                          ) : (
                            "Wybierz chorobę"
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj chorobę..."
                          className="p-1 py-2"
                        />
                        <CommandEmpty>Nie znaleziono chorób.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72">
                            {diseases?.map((d) => (
                              <CommandItem
                                value={`${d.nameChildren} ${d.codeChildren}`}
                                key={d.id}
                                onSelect={() => {
                                  form.setValue("disease", d.id as number);
                                }}
                              >
                                {
                                  <div>
                                    {d.codeChildren} {d.nameChildren}
                                  </div>
                                }
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    d.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Wyślij
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateReportCard;
