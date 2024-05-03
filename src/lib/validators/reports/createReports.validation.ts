import * as z from "zod";

export const CreateReportsValidation = z.object({
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
  woj: z.number({ required_error: "Województwo jest wymagane" }),
  pow: z.number({ required_error: "Powiat jest wymagany" }),
  gmi: z.number().optional(),
  sym: z.number({ required_error: "Miasto jest wymagane" }),
  symUl: z.number().optional(),
  num: z.string({ required_error: "Numer domu jest wymagany" }),
  mie: z.string().optional(),
  disease: z.number({ required_error: "Choroba jest wymagana" }),
});
