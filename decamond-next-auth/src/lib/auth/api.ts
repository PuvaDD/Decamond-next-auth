"use server";

import { FAILED_LOGIN_MESSAGE } from "../utils/authPageUtils";

type LoginSuccess = { results: any }; //TODO: Maybe change "any" type
type LoginError = { error: string };

type VerifyLoginResult = LoginSuccess | LoginError;

export async function VerifyLogin(
  formData: FormData
  //TODO: Maybe fix "results" type
): Promise<VerifyLoginResult> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(FAILED_LOGIN_MESSAGE);

    const response = await res.json();

    return response;
  } catch (error) {
    return {
      error: (error instanceof Error && error.message) || FAILED_LOGIN_MESSAGE,
    };
  }
}
