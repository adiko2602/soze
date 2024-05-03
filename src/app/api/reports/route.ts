import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { TCreateReport } from "@/lib/validators";
import { NextRequest } from "next/server";
import { CreateReportsValidation } from "@/lib/validators/reports/createReports.validation";

export async function GET(req: NextRequest) {
  try {
    const reports = await prisma.reports.findMany({
      include: {
        reporter: {
          select: {
            personals: true,
          },
        },
        personals: true,
        addresses: {
          include: {
            terc: true,
            simc: true,
            ulic: true,
          },
        },
        diseases: true,
      },
    });

    return SuccessApiResponse.send("Raporty znalezieni", 200, reports);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania raportów");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: TCreateReport = await req.json();
    const result = await CreateReportsValidation.safeParseAsync(body);

    if (!result.success) {
      return ErrorApiResponse.send("Błąd otrzymanych danych");
    }

    const terc = await prisma.terc.findFirst({
      where: {
        AND: {
          woj: body.woj,
          gmi: body.gmi,
          pow: body.pow,
        },
      },
    });

    if (!terc) return ErrorApiResponse.send("Nie znaleziono terc");

    const simc = await prisma.simc.findFirst({
      where: {
        sym: body.sym,
      },
    });

    if (!simc) return ErrorApiResponse.send("Nie znaleziono simc");

    const ulic = await prisma.ulic.findFirst({
      where: {
        symUl: body.symUl,
      },
    });

    if (!ulic) return ErrorApiResponse.send("Nie znaleziono ulic");

    await prisma.reports.create({
      data: {
        personals: {
          create: {
            firstName: body.firstName,
            lastName: body.lastName,
            pesel: body.pesel,
          },
        },
        addresses: {
          create: {
            tercId: terc.id,
            simcId: simc.id,
            ulicId: ulic.id,
            num: body.num,
            mie: body.mie,
          },
        },
        diseases: {
          connect: {
            id: body.disease,
          },
        },
        reporter: {
          connect: {
            id: 1,
          },
        },
      },
    });

    return SuccessApiResponse.send("Nowy raport został utworzony");
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd tworzenia raportu");
  }
}
