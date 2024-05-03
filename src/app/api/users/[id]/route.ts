import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        id: true,
        userTypes: true,
        personals: true,
      },
    });

    return SuccessApiResponse.send("Użytkownik znaleziony", 200, user);
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd pobierania użytkownika");
  }
}
