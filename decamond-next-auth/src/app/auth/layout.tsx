import { AUTH_COOKIE_NAME } from "@/lib/utils/authPageUtils";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Login - Decamond Next.js auth interview project",
  description: "Login to access your dashboard and manage your account",
  openGraph: {
    title: "Login - Decamond Next.js auth",
    description: "Login to access your dashboard and manage your account",
    url: "https://decamond.com/auth/login",
    type: "website",
  },
};

export default async function AuthPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pushToDashboard = () => redirect("/dashboard");

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (authCookie) return pushToDashboard();

  return <div className={styles["auth-page-wrapper"]}>{children}</div>;
}
