import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const woj = await prisma.terc.findMany({
      where: {
        AND: {
          gmi: null,
          pow: null,
        },
      },
    });
    if (!woj) return ErrorApiResponse.send("Nie znaleziono województw");
    return SuccessApiResponse.send("Znaleziono województwa", 200, woj);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono województw");
  } finally {
    await prisma.$disconnect();
  }
}
