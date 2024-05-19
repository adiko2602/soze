import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { adminReportsSelect } from "@/lib/prisma/types";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.userTypes !== "ADMIN")
    return ErrorApiResponse.send("Musisz się zalogować jako administrator");

  try {
    const reports = await prisma.reports.findMany({
      select: adminReportsSelect,
    });
    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");
    return SuccessApiResponse.send("Raporty znalezione", 200, reports);
  } catch (err) {
    console.log(err);
    ErrorApiResponse.send("Nie znaleziono raportów");
  } finally {
    await prisma.$disconnect();
  }
}
