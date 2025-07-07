"use client";
// context/ImgContext.tsx
import React, { createContext, useContext } from "react";

const ImgContext = createContext<any[]>([]);

export const ImgContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) => {
  return <ImgContext.Provider value={value}>{children}</ImgContext.Provider>;
};

export const useImgMetadata = () => {
  return useContext(ImgContext);
};
