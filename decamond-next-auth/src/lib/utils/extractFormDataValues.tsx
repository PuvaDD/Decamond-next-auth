import { isNil } from "ramda";

export default function extractFormDataValues(formData: FormData) {
  if (isNil(formData)) return {};

  const mappedFormData: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    mappedFormData[key] = value;
  });

  return mappedFormData;
}
