import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

  try {
    const alerts = await prisma.alerts.findMany();
    if (!alerts) return ErrorApiResponse.send("Nie znaleziono alertów");
    return SuccessApiResponse.send("Znaleziono alerty", 200, alerts);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Nie znaleziono alertów");
  } finally {
    await prisma.$disconnect();
  }
}
