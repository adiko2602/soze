import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: { woj: number; pow: number; gmi: number } = await req.json();
  try {
    let sym = await prisma.simc.findMany({
      where: {
        AND: {
          woj: body.woj,
          pow: body.pow,
          gmi: body.gmi,
        },
      },
    });
    if (!sym) return ErrorApiResponse.send("Nie znaleziono miast");
    return SuccessApiResponse.send("Znaleziono miasta", 200, sym);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono miast");
  } finally {
    await prisma.$disconnect();
  }
}
