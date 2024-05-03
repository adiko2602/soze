import * as z from "zod";

export const CreateUserValidation = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .min(1, { message: "Email nie może być pusty" })
    .email({ message: "Nieprawidłowy email" }),
  passwords: z
    .object({
      password: z
        .string({ required_error: "Hasło jest wymagane" })
        .min(8, { message: "Hasło musi zawierać minumum 8 znaków" }),
      confirmedPassword: z.string({
        required_error: "Powtórzonie hasła jest wymagane",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmedPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hasła nie są takie same",
          path: ["confirmedPassword"],
        });
      }
    }),
  firstName: z
    .string({ required_error: "Imię jest wymagane" })
    .min(1, { message: "Imię nie może być puste" }),
  lastName: z
    .string({ required_error: "Nazwisko jest wymagane" })
    .min(1, { message: "Nazwisko nie może być puste" }),
  pesel: z
    .string({ required_error: "PESEL jest wymagany" })
    .min(11, { message: "PESEL musi zawierać 11 cyfr" })
    .max(11, { message: "PESEL musi zawierać 11 cyfr" })
    .superRefine((pesel, ctx) => {
      if (pesel.length !== 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PESEL musi zawierać 11 cyfr",
          path: ["pesel"],
        });
        return;
      }

      const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const peselAsNumbers = [];

      for (let i = 0; i < pesel.length - 1; i++) {
        peselAsNumbers.push(parseInt(pesel[i]));
      }

      let sum = 0;
      peselAsNumbers.forEach((number, index) => {
        sum += (number * weight[index]) % 10;
      });

      const controlNumber = 10 - (sum % 10);

      if (pesel[10] !== controlNumber.toString()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nieprawidłowy numer PESEL",
          path: ["pesel"],
        });
        return;
      }
    }),
});
