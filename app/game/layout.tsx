"use client";
import { PageWrapper } from "./[round]/game.styles";

export default function InGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      {children}
    </PageWrapper>
  );
}
