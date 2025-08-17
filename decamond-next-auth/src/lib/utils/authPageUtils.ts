import { loginFormSchema } from "./loginFormSchema";
import { globalPrefix } from "./globalUtils";

import z from "zod";

export const FAILED_LOGIN_MESSAGE = "Failed To Fetch logged in user info";

export const AUTH_COOKIE_NAME = `${globalPrefix}authenticated-user`;
export const AUTH_COOKIE_AGE_IN_MILLISECONDS = 10 * 60 * 1000;

export type LoginFormErrors = z.ZodFlattenedError<LoginFormData>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type LoginResult =
  | { success: true; data: LoginFormData }
  | {
      success: false;
      errors: LoginFormErrors;
    };
