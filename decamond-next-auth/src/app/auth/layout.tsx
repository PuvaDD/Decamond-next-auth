import { AUTH_COOKIE_NAME } from "@/lib/utils/utils";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pushToDashboard = () => redirect("/dashboard");

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (authCookie) return pushToDashboard();

  return <>{children}</>;
}
