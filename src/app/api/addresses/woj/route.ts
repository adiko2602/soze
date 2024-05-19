import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

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
