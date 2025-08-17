import { loginFormSchema } from "./loginFormSchema";
import { isNil } from "ramda";

import z from "zod";

export const globalPrefix = "dcm-";

export const PHONE_NUMBER_INP_NAME = `${globalPrefix}auth-phone-number`;
export const PASSWORD_INPUT_NAME = `${globalPrefix}auth-password`;
export const FAILED_LOGIN_MESSAGE = "Failed To Fetch logged in user info";

export type LoginFormErrors = z.ZodFlattenedError<LoginFormData>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type LoginResult =
  | { success: true; data: LoginFormData }
  | {
      success: false;
      errors: LoginFormErrors;
    };

export function extractFormDataValues(formData: FormData) {
  if (isNil(formData)) return {};

  const mappedFormData: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    mappedFormData[key] = value;
  });

  return mappedFormData;
}
