import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

  const body: { woj: number; pow: number } = await req.json();
  try {
    let gmi = await prisma.terc.findMany({
      where: {
        AND: {
          woj: body.woj,
          pow: body.pow,
        },
      },
    });
    if (!gmi) return ErrorApiResponse.send("Nie znaleziono gmin");
    gmi = gmi.filter((g) => g.pow !== body.pow || g.gmi !== null);
    return SuccessApiResponse.send("Znaleziono gminy", 200, gmi);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono gmin");
  } finally {
    await prisma.$disconnect();
  }
}
