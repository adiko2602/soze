import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

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
