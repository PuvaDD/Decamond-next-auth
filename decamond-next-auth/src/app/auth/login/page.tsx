"use client";

import {
  PASSWORD_INPUT_NAME,
  PHONE_NUMBER_INP_NAME,
} from "@/lib/utils/loginFormSchema";
import { useActionState, useEffect, useState } from "react";
import { LoginResult } from "@/lib/utils/authPageUtils";
import { Login } from "@/lib/auth/actions";

import Form from "next/form";

const initialState: LoginResult = {
  success: false,
  errors: { formErrors: [], fieldErrors: {} },
};

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [authState, loginAction, pending] = useActionState(
    (prevState: any, formData: FormData) => Login(formData),
    initialState
  );

  useEffect(() => {
    console.log("authState = ", authState);
    console.log("\n\n<========================>\n\n");
  }, [authState]);

  return (
    <Form action={loginAction}>
      <div>Login Page</div>
      <input
        placeholder="Phone Number"
        name={PHONE_NUMBER_INP_NAME}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        placeholder="Password"
        name={PASSWORD_INPUT_NAME}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {!authState.success &&
        authState.errors &&
        authState.errors.formErrors.length > 0 && (
          <div>{authState.errors.formErrors[0]}</div>
        )}
    </Form>
  );
}
