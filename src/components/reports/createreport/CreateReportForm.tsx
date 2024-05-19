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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../ui/command";
import { CommandInput } from "cmdk";
import { CheckIcon } from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";
import { useCreateReportForm } from "@/lib/hooks/report/createReport/useCreateReportForm";
import { useCreateReportMutation } from "@/lib/hooks/report/createReport/useCreateReportMutation";
import { TCreateReport } from "@/lib/validators";
import { useAddressQuery } from "@/lib/hooks/address/useAddressQuery";
import { useAddressMutation } from "@/lib/hooks/address/useAddressMutation";
import { useDiseseQuery } from "@/lib/hooks/disease/useDiseaseQuery";

function CreateReportForm() {
  const { createReportForm } = useCreateReportForm();
  const { createReportMutation } = useCreateReportMutation();
  const { woj } = useAddressQuery();
  const { pow, gmi, sym } = useAddressMutation();
  const { diseases } = useDiseseQuery();

  const handleSubmit = (values: TCreateReport) => {
    createReportMutation.mutate(values);
  };

  return (
    <Form {...createReportForm}>
      <form
        onSubmit={createReportForm.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={createReportForm.control}
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
          control={createReportForm.control}
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
          control={createReportForm.control}
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
        {/* DISEASE */}

        <FormField
          control={createReportForm.control}
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
                            diseases.data?.find((d) => d.id === field.value)
                              ?.codeChildren
                          }{" "}
                          {
                            diseases.data?.find((d) => d.id === field.value)
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
                        {diseases.data?.map((d) => (
                          <CommandItem
                            value={`${d.nameChildren} ${d.codeChildren}`}
                            key={d.id}
                            onSelect={() => {
                              createReportForm.setValue(
                                "disease",
                                d.id as number
                              );
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
        {/* WOJEWÓDZTWO */}

        <FormField
          control={createReportForm.control}
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
                        ? woj.data?.find((w) => w.woj === field.value)?.name
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
                        {woj.data?.map((w) => (
                          <CommandItem
                            value={w.name}
                            key={w.id}
                            onSelect={() => {
                              createReportForm.resetField("pow", undefined);
                              createReportForm.resetField("gmi", undefined);
                              createReportForm.resetField("sym", undefined);
                              createReportForm.setValue("woj", w.woj as number);
                              pow.mutate({
                                woj: createReportForm.getValues("woj"),
                              });
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
          control={createReportForm.control}
          name="pow"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Powiat</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={
                        createReportForm.getValues("woj") ? false : true
                      }
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? pow.data?.find((p) => p.pow === field.value)?.name
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
                        {pow.data?.map((p) => (
                          <CommandItem
                            value={p.name}
                            key={p.id}
                            onSelect={() => {
                              createReportForm.resetField("gmi", undefined);
                              createReportForm.resetField("sym", undefined);
                              createReportForm.setValue("pow", p.pow as number);
                              gmi.mutate({
                                woj: createReportForm.getValues("woj"),
                                pow: createReportForm.getValues("pow"),
                              });
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
          control={createReportForm.control}
          name="gmi"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Gmina</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={
                        createReportForm.getValues("pow") ? false : true
                      }
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? gmi.data?.find((g) => g.gmi === field.value)?.name
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
                        {gmi.data?.map((g) => (
                          <CommandItem
                            value={g.name}
                            key={g.id}
                            onSelect={() => {
                              createReportForm.resetField("sym", undefined);
                              createReportForm.setValue("gmi", g.gmi as number);
                              sym.mutate({
                                woj: createReportForm.getValues("woj"),
                                pow: createReportForm.getValues("pow"),
                                gmi: createReportForm.getValues("gmi"),
                              });
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
          control={createReportForm.control}
          name="sym"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Miasto</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={
                        createReportForm.getValues("gmi") ? false : true
                      }
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? sym.data?.find((s) => s.sym === field.value)?.name
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
                        {sym.data?.map((s) => (
                          <CommandItem
                            value={s.name}
                            key={s.id}
                            onSelect={() => {
                              createReportForm.setValue("sym", s.sym as number);
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

        <Button type="submit" className="w-full">
          Wyślij
        </Button>
      </form>
    </Form>
  );
}

export default CreateReportForm;
