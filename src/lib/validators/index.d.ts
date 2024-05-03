import * as z from "zod";
import { CreateUserValidation } from "./users/createUser.validator";
import { CreateReportsValidation } from "./reports/createReports.validation";

export type TCreateUser = z.infer<typeof CreateUserValidation>;
export type TCreateReport = z.infer<typeof CreateReportsValidation>;
