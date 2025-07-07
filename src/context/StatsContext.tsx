"use client";
// context/ItemContext.tsx
import React, { createContext, useContext } from "react";

const StatsContext = createContext<any[]>([]);

export const StatsContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) => {
  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export const useStatsData = () => {
  return useContext(StatsContext);
};
