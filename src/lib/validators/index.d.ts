import * as z from "zod";
import { CreateReportsValidation } from "./reports/createReports.validation";
import { SignUpValidation } from "./auth/signUp.validator";
import { SignInValidation } from "./auth/signIn.validator";
import { BrowseStatisticsValidation } from "./statistics/browseStatistics.validator";

export type TSignUp = z.infer<typeof SignUpValidation>;
export type TCreateReport = z.infer<typeof CreateReportsValidation>;
export type TSignIn = z.infer<typeof SignInValidation>;
export type TBrowseStatistics = z.infer<typeof BrowseStatisticsValidation>;
