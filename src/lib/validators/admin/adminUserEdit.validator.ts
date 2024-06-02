import * as z from "zod";

export const AdminUserEditValidation = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .min(1, { message: "Email nie może być pusty" })
    .email({ message: "Nieprawidłowy email" }),
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
  userType: z
    .string({ required_error: "Typ użytkownika jest wymagane" })
    .min(1, { message: "Typ użytkownika nie może być puste" }),
  userStatus: z
    .string({ required_error: "Status użytkownika jest wymagany" })
    .min(1, { message: "Status użytkownika nie może być pusty" }),
});
