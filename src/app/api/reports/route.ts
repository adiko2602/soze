import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { TCreateReport } from "@/lib/validators";
import { NextRequest } from "next/server";
import { CreateReportsValidation } from "@/lib/validators/reports/createReports.validation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");
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
          },
        },
        diseases: true,
      },
    });

    return SuccessApiResponse.send("Raporty znalezione", 200, reports);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania raportów");
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (
    session?.user.userTypes !== "ADMIN" &&
    session?.user.userTypes !== "WORKER"
  )
    return ErrorApiResponse.send(
      "Musisz się zalogować jako administrator lub pracownik"
    );
  try {
    const body: TCreateReport = await req.json();
    const result = await CreateReportsValidation.safeParseAsync(body);

    const reporter = await getServerSession(authOptions);
    if (!reporter)
      return ErrorApiResponse.send("Musisz się zalogować aby utworzyć raport");

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
          },
        },
        diseases: {
          connect: {
            id: body.disease,
          },
        },
        reporter: {
          connect: {
            id: reporter.user.id,
          },
        },
      },
    });

    return SuccessApiResponse.send("Nowy raport został utworzony");
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd tworzenia raportu");
  } finally {
    await prisma.$disconnect();
  }
}
