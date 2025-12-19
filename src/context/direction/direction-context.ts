import { createContext, useContext } from "react";
import type { DirectionContextType } from "./types";

export const DirectionContext = createContext<DirectionContextType | null>(
  null
);

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider.");
  }
  return context;
};
