"use client";

import { TAdminReportsSelect } from "@/lib/prisma";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TAdminReportsSelect>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "addresses.id",
    header: "Adres ID",
  },
  {
    accessorKey: "addresses.terc.id",
    header: "TERC ID",
  },
  {
    accessorKey: "addresses.simc.id",
    header: "SIMC ID",
  },
  {
    id: "addresses.simc.name",
    accessorKey: "addresses.simc.name",
    header: "Miejscowość",
  },
  {
    accessorKey: "diseases.id",
    header: "Choroba ID",
  },
  {
    accessorKey: "diseases.nameChildren",
    header: "Choroba",
  },
  {
    accessorKey: "personals.id",
    header: "Personalia ID",
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
    accessorKey: "reporter.id",
    header: "Raportujący ID",
  },
  {
    accessorKey: "reporter.email",
    header: "Raportujący email",
  },
  {
    accessorKey: "reporter.personals.firstName",
    header: "Raportujący imię",
  },
  {
    accessorKey: "reporter.personals.lastName",
    header: "Raportujący nazwisko",
  },
  {
    accessorKey: "createdAt",
    header: "Utworzony",
  },
];
