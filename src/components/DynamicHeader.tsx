// components/DynamicHeader.tsx
"use client";

import { useHeader } from "@/context/HeaderContext";
import DynamicPageHeader from "./DynamicPageHeader";

export default function DynamicHeader() {
  const { headerContent } = useHeader();

  return (
    <DynamicPageHeader
      title={headerContent.title}
      icon={headerContent.icon}
      gutters={headerContent.gutters}
      topChildren={headerContent.topChildren}
      children={headerContent.children}
      barHeight={headerContent.barHeight}
    />
  );
}
