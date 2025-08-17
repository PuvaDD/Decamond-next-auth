"use server";

import {
  AUTH_COOKIE_AGE_IN_MILLISECONDS,
  AUTH_COOKIE_NAME,
  FAILED_LOGIN_MESSAGE,
} from "../utils/authPageUtils";
import { cookies } from "next/headers";

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

    // Create Auth Cookie
    const cookieStore = await cookies();

    cookieStore.set(
      AUTH_COOKIE_NAME,
      JSON.stringify({ user: response.results[0] }),
      {
        secure: true,
        httpOnly: true,
        path: "/",
        maxAge: AUTH_COOKIE_AGE_IN_MILLISECONDS,
        sameSite: "strict",
      }
    );

    return response;
  } catch (error) {
    return {
      error: (error instanceof Error && error.message) || FAILED_LOGIN_MESSAGE,
    };
  }
}
