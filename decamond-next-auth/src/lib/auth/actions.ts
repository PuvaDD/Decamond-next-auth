"use server";

import {
  AUTH_COOKIE_AGE_IN_MILLISECONDS,
  FAILED_LOGIN_MESSAGE,
  AUTH_COOKIE_NAME,
  LoginFormErrors,
  LoginResult,
} from "../utils/utils";
import { redirect, RedirectType } from "next/navigation";
import { validateLoginForm } from "../utils/loginFormSchema";
import { VerifyLogin } from "./api";
import { cookies } from "next/headers";
import { isNil } from "ramda";

//TODO: Relocate prevState
export async function Login(formData: FormData): Promise<LoginResult> {
  // FormData validation
  const formDataValidationStatus = validateLoginForm(formData);

  if (!formDataValidationStatus.success) {
    console.log("zod valdiation error = ", formDataValidationStatus.errors);
    return {
      success: false,
      errors: formDataValidationStatus.errors as LoginFormErrors,
    };
  }

  // Check Login Status
  const loginStatus = await VerifyLogin(formData);

  // TODO: Find a better way to handle this string check
  if ("error" in loginStatus) {
    return {
      success: false,
      errors: { formErrors: [loginStatus.error], fieldErrors: {} },
    };
  }

  if (isNil(loginStatus) || isNil(loginStatus.results))
    return {
      success: false,
      errors: { formErrors: [FAILED_LOGIN_MESSAGE], fieldErrors: {} },
    };

  // Create Auth Cookie
  const cookieStore = await cookies();

  cookieStore.set(
    AUTH_COOKIE_NAME,
    JSON.stringify({ user: loginStatus.results[0] }),
    {
      secure: true,
      httpOnly: true,
      path: "/",
      maxAge: AUTH_COOKIE_AGE_IN_MILLISECONDS,
      sameSite: "strict",
    }
  );
  redirect("/dashboard", RedirectType.replace);
}
