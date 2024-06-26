import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { usersProfileInclude } from "@/lib/prisma/types";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");
  try {
    const id = parseInt(params.id);
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
      select: usersProfileInclude,
    });
    if (!user) return ErrorApiResponse.send("Nie znaleziono użytkownika");

    return SuccessApiResponse.send("Użytkownik znaleziony", 200, user);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania użytkownika");
  } finally {
    await prisma.$disconnect();
  }
}
