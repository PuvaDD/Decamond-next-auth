"use client";

import { useState } from "react";
import { Login } from "@/auth/actions";
import Form from "next/form";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Form action={Login}>
      <div>Login Page</div>
      <input
        name="phone-number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button>Login</button>
    </Form>
  );
}
