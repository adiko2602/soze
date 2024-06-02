"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TAdminUsersSelect } from "@/lib/prisma";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<TAdminUsersSelect>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "personals.id",
    header: "Personalia ID",
  },
  {
    accessorKey: "personals.pesel",
    header: "Personalia PESEL",
  },
  {
    accessorKey: "personals.firstName",
    header: "Personalia imię",
  },
  {
    accessorKey: "personals.lastName",
    header: "Personalia nazwisko",
  },
  {
    accessorKey: "userTypes",
    header: "Typ użytkownika",
  },
  {
    accessorKey: "userStatuses",
    header: "Status użytkownika",
  },
  {
    accessorKey: "createdAt",
    header: "Utworzony",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Link href={`/admin/users/${user.id}/edit`}>Edytuj</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
