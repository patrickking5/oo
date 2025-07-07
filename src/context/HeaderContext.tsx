"use client";

// context/HeaderContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContent {
  icon?: string;
  title?: string;
  topChildren?: ReactNode;
  gutters?: boolean;
  children?: ReactNode;
  barHeight?: number;
}

const HeaderContext = createContext({
  headerContent: {} as HeaderContent,
  setHeaderContent: (_: HeaderContent) => {},
});

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeaderContent] = useState<HeaderContent>({});
  return (
    <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
