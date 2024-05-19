import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");
  try {
    const users = await prisma.users.findMany({
      select: {
        email: true,
        id: true,
        userTypes: true,
        personals: true,
      },
    });

    return SuccessApiResponse.send("Użytkownicy znalezieni", 200, users);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania użytkowników");
  } finally {
    await prisma.$disconnect();
  }
}
