"use client";

import { useDashboardContext } from "@/components/contexts/DashboardContext";
import { globalPrefix } from "@/lib/utils/globalUtils";
import { isEmpty } from "ramda";

import Image from "next/image";

export default function DashboardPage() {
  const dashboardCTX = useDashboardContext();
  const { user } = dashboardCTX;

  const { title, first, last } = user.name;
  console.log("user = ", user);
  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      {user && !isEmpty(user) && (
        <section>
          <header>User Info:</header>
          <div>
            <Image
              src={user.picture.large}
              width={250}
              height={250}
              alt={`${globalPrefix}profile-picture`}
            />
            <div>
              <label>Full Name:</label>
              <div>{`${title}${first} ${last}`}</div>
            </div>
            <div>
              <label>Phone:</label>
              <div>{user.cell}</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
