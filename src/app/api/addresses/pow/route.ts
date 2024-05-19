import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: { woj: number } = await req.json();
  try {
    let pow = await prisma.terc.findMany({
      where: {
        AND: {
          woj: body.woj,
          gmi: null,
        },
      },
    });
    if (!pow) return ErrorApiResponse.send("Nie znaleziono powiatu");
    pow = pow.filter((p) => p.pow !== null || p.gmi !== null);
    return SuccessApiResponse.send("Znaleziono powiaty", 200, pow);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono powiatów");
  } finally {
    await prisma.$disconnect();
  }
}
