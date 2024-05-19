import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { adminUsersSelect } from "@/lib/prisma/types";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.userTypes !== "ADMIN")
    return ErrorApiResponse.send("Musisz się zalogować jako administrator");
  try {
    const users = await prisma.users.findMany({
      select: adminUsersSelect,
    });
    if (!users) return ErrorApiResponse.send("Nie znaleziono użytkowników");
    return SuccessApiResponse.send("Użytkownicy znalezieni", 200, users);
  } catch (err) {
    console.log(err);
    ErrorApiResponse.send("Nie znaleziono użytkowników");
  } finally {
    await prisma.$disconnect();
  }
}
