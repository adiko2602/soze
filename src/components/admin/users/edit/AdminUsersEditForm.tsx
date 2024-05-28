"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TAdminUserEdit } from "@/lib/validators";
import { useAdminUserForm } from "@/lib/hooks/admin/user/useAdminUserForm";
import { useAdminUserMutation } from "@/lib/hooks/admin/user/useAdminUserMutation";
import { TAdminUserSelect } from "@/lib/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";

function AdminUsersEditForm(props: {
  defaultUser: TAdminUserSelect;
  id: string;
}) {
  const { adminUserEditForm } = useAdminUserForm(props.defaultUser);
  const { adminUserEdit } = useAdminUserMutation();

  const handleSubmit = (values: TAdminUserEdit) => {
    adminUserEdit.mutate({ values: values, id: props.id });
  };

  return (
    <Form {...adminUserEditForm}>
      <form
        onSubmit={adminUserEditForm.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={adminUserEditForm.control}
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
          control={adminUserEditForm.control}
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
          control={adminUserEditForm.control}
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
          control={adminUserEditForm.control}
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

        <FormField
          control={adminUserEditForm.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ użytkownika</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ użytkownika" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="WORKER">WORKER</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={adminUserEdit.isPending}
          type="submit"
          className="w-full"
        >
          {adminUserEdit.isPending && <Loader />} Aktualizuj
        </Button>
      </form>
    </Form>
  );
}

export default AdminUsersEditForm;
