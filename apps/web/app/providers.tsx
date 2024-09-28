import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers(props: ProvidersProps) {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
}
