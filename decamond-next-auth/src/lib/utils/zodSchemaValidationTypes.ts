import z from "zod";

type FailedValidation<T> = {
  success: false;
  errors: z.ZodFlattenedError<T>;
};

type SuccessfulValidation<T = unknown> = {
  success: true;
  data: T;
};

export type FormValidationStatus<T = unknown> =
  | FailedValidation<T>
  | SuccessfulValidation<T>;
