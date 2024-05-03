import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import prisma from "@/lib/prisma/prismaClient";
import { TCreateUser } from "@/lib/validators";
import { CreateUserValidation } from "@/lib/validators/users/createUser.validator";
import { NextRequest } from "next/server";
import * as bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
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
  }
}
export async function POST(req: NextRequest) {
  try {
    const body: TCreateUser = await req.json();
    const result = await CreateUserValidation.safeParseAsync(body);

    if (!result.success) {
      return ErrorApiResponse.send("Błąd otrzymanych danych");
    }

    if (body.passwords.password !== body.passwords.confirmedPassword)
      return ErrorApiResponse.send("Podane hasła nie są takie same");

    const userExist = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExist)
      return ErrorApiResponse.send(
        "Użytkownik o tym adresie email już istnieje"
      );

    const hashedPassword = await bcrypt.hash(body.passwords.password, 10);

    await prisma.users.create({
      data: {
        email: body.email,
        password: hashedPassword,
        personals: {
          create: {
            firstName: body.firstName,
            lastName: body.lastName,
            pesel: body.pesel,
          },
        },
      },
    });

    return SuccessApiResponse.send("Nowy użytkownik został utworzony");
  } catch (err) {
    console.log(err);
    return ErrorApiResponse.send("Błąd tworzenia użytkownika");
  }
}
