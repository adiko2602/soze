import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { browseReportsInclude } from "@/lib/prisma/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const reports = await prisma.reports.findMany({
      where: {
        reporterId: id,
      },
      include: browseReportsInclude,
    });

    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");

    return SuccessApiResponse.send("Raporty znalezione", 200, reports);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania raportów");
  } finally {
    await prisma.$disconnect();
  }
}
