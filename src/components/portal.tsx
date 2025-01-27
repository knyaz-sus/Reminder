"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: ReactNode }) {
  return createPortal(
    children,
    document.querySelector("#portal") as HTMLDivElement
  );
}
