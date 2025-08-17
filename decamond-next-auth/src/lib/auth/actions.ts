"use server";

import {
  FAILED_LOGIN_MESSAGE,
  PASSWORD_INPUT_NAME,
  PHONE_NUMBER_INP_NAME,
} from "../utils";
import { redirect, RedirectType } from "next/navigation";
import { VerifyLogin } from "./api";
import { isNil } from "ramda";

type LoginState = { error?: string };

//TODO: Relocate prevState
export async function Login(formData: FormData): Promise<LoginState> {
  console.log("FD = ", formData);
  const phoneNumber = formData.get(PHONE_NUMBER_INP_NAME);
  const password = formData.get(PASSWORD_INPUT_NAME);

  if (!phoneNumber) return { error: "Incorrect Phone Number" };
  if (!password) return { error: "Incorrect Password" };

  const loginStatus = await VerifyLogin(+phoneNumber, `${password}`);

  if ("error" in loginStatus) {
    return { error: loginStatus.error };
  }

  if (isNil(loginStatus) || isNil(loginStatus.results))
    return { error: FAILED_LOGIN_MESSAGE };

  // TODO: Add auth cookie
  redirect("/dashboard", RedirectType.replace);
}
