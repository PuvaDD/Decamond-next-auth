"use client";

import { PASSWORD_INPUT_NAME, PHONE_NUMBER_INP_NAME } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import { Login } from "@/lib/auth/actions";

import Form from "next/form";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [state, loginAction, pending] = useActionState(
    (prevState: any, formData: FormData) => Login(formData),
    {}
  );

  useEffect(() => {
    console.log("state = ", state);
    console.log("\n\n<========================>\n\n");
  }, [state]);

  return (
    <Form action={loginAction}>
      <div>Login Page</div>
      <input
        name={PHONE_NUMBER_INP_NAME}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        name={PASSWORD_INPUT_NAME}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {state.error && <div>{state.error}</div>}
    </Form>
  );
}
