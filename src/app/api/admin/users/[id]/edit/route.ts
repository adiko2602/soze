import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { TAdminUserEdit } from "@/lib/validators";
import { AdminUserEditValidation } from "@/lib/validators/admin/adminUserEdit.validator";
import { userTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user.userTypes !== "ADMIN")
    return ErrorApiResponse.send("Musisz się zalogować jako administrator");

  try {
    const body: TAdminUserEdit = await req.json();
    const result = await AdminUserEditValidation.safeParseAsync(body);

    if (!result.success) {
      return ErrorApiResponse.send("Błąd otrzymanych danych");
    }

    const userExist = await prisma.users.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!userExist) return ErrorApiResponse.send("Nie znaleziono użytkownika");

    await prisma.users.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        email: body.email,
        userTypes: body.userType as userTypes,
        personals: {
          update: {
            data: {
              firstName: body.firstName,
              lastName: body.lastName,
              pesel: body.pesel,
            },
          },
        },
      },
    });
    return SuccessApiResponse.send("Dane użytkownika zostały zaktualizowane");
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Bład aktualizacji danych");
  } finally {
    await prisma.$disconnect();
  }
}
