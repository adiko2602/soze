import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
