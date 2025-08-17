"use client";

import { createContext, useContext } from "react";

// TODO: Change user type
const DashboardContext = createContext<{ user?: any }>({});

export function DashboardProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: string;
}) {
  return (
    <DashboardContext.Provider value={{ user }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);
