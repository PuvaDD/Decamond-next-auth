"use client";

import { useDashboardContext } from "@/components/contexts/DashboardContext";
import { globalPrefix } from "@/lib/utils/globalUtils";
import { isEmpty } from "ramda";
import { Logout } from "@/lib/auth/actions";

import Image from "next/image";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const dashboardCTX = useDashboardContext();
  const { user } = dashboardCTX;

  const { title, first, last } = user.name;

  return (
    <div className={styles["wrapper"]}>
      <h1>Welcome to your dashboard</h1>

      {user && !isEmpty(user) && (
        <section>
          <Image
            src={user.picture.large}
            width={250}
            height={250}
            alt={`${globalPrefix}profile-picture`}
          />

          <div>
            <label>Full Name:</label>
            <div>{`${title}.${first} ${last}`}</div>
          </div>

          <div>
            <label>Phone:</label>
            <div>{user.cell}</div>
          </div>
        </section>
      )}

      <button onClick={Logout}>Log Out</button>
    </div>
  );
}
