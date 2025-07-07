"use client";
// context/ItemContext.tsx
import React, { createContext, useContext } from "react";

const ItemContext = createContext<any[]>([]);

export const ItemContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any[];
}) => {
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useOpensData = () => {
  return useContext(ItemContext);
};
