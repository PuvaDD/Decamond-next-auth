import { AUTH_COOKIE_NAME } from "@/lib/utils/authPageUtils";
import { isEmpty, isNil } from "ramda";
import { cookies } from "next/headers";

import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  let parsedUserInfo;

  try {
    parsedUserInfo = authCookie && JSON.parse(authCookie.value);
  } catch (error) {
    console.log("err = ", error);
  }
  const user = parsedUserInfo?.user;

  const userExists = parsedUserInfo && !isNil(user.id) && !isEmpty(user.id);

  return (
    <div className={styles.page}>
      <header className={styles["lp-header"]}>
        {!userExists && (
          <Link href={"/auth/login"} prefetch={true}>
            Login
          </Link>
        )}
        {userExists && (
          <Link href={"/dashboard"} prefetch={true}>
            Dashboard
          </Link>
        )}
      </header>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
