import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { adminUserSelect } from "@/lib/prisma/types";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params);
  const session = await getServerSession(authOptions);
  if (session?.user.userTypes !== "ADMIN")
    return ErrorApiResponse.send("Musisz się zalogować jako administrator");
  try {
    const id = parseInt(params.id);
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
      select: adminUserSelect,
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
