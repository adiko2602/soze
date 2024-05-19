import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");
  try {
    const diseases = await prisma.diseases.findMany();
    if (!diseases) return ErrorApiResponse.send("Nie znaleziono chorób");
    return SuccessApiResponse.send("Znaleziono choroby", 200, diseases);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono chorób");
  } finally {
    await prisma.$disconnect();
  }
}
