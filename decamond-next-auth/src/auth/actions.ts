"use server";

import { redirect, RedirectType } from "next/navigation";

export async function Login(formData: FormData) {
  const phoneNumber = formData.get("phone-number");

  console.log("phone number = ", phoneNumber);

  redirect("/dashboard", RedirectType.replace);
}
