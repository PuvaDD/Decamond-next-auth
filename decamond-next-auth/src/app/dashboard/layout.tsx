import { DashboardProvider } from "@/components/contexts/DashboardContext";
import { AUTH_COOKIE_NAME } from "@/lib/utils/authPageUtils";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pushToLogin = () => redirect("/auth/login");

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie) return pushToLogin();

  const parsedUserInfo = JSON.parse(authCookie.value);

  return (
    <DashboardProvider user={parsedUserInfo.user}>{children}</DashboardProvider>
  );
}
