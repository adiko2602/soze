import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

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
