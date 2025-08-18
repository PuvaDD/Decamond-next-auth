import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles["lp-header"]}>
        <Link href={"/auth/login"} prefetch={true}>
          Login
        </Link>
        <Link href={"/dashboard"} prefetch={true}>
          Dashboard
        </Link>
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
