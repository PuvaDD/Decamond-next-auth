import { FormValidationStatus } from "./zodSchemaValidationTypes";
import { isEmpty, isNil } from "ramda";
import { globalPrefix } from "./globalUtils";

import extractFormDataValues from "./extractFormDataValues";

import z from "zod";

export const PHONE_NUMBER_INP_NAME = `${globalPrefix}auth-phone-number`;
export const PASSWORD_INPUT_NAME = `${globalPrefix}auth-password`;

const PHONE_NUM_LENGTH = 11;
const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 6;

export const loginFormSchema = z.object({
  [PHONE_NUMBER_INP_NAME]: z
    .string()
    .trim()
    .startsWith("09", "must start with '09'")
    .regex(/^09\d{9}$/, `Must be ${PHONE_NUM_LENGTH} digits long`),
  [PASSWORD_INPUT_NAME]: z
    .string()
    .trim()
    .min(MIN_PASSWORD_LENGTH, `Must be at least ${MIN_PASSWORD_LENGTH} digits`)
    .max(MAX_PASSWORD_LENGTH, `Must be at least ${MAX_PASSWORD_LENGTH} digits`),
});

export function validateLoginForm(formData: FormData): FormValidationStatus {
  const mappedFormData = extractFormDataValues(formData);

  if (isNil(mappedFormData) || isEmpty(mappedFormData))
    return {
      success: false,
      errors: { formErrors: ["Invalid form data"], fieldErrors: {} },
    };

  const parsedFormData = loginFormSchema.safeParse(mappedFormData);

  if (!parsedFormData.success)
    return { success: false, errors: z.flattenError(parsedFormData.error) };

  return { success: true, data: parsedFormData.data };
}
