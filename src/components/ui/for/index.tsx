import type { ReactNode } from "react";

interface ForProps<T> {
  each: T[] | undefined | null;
  children: (item: T, index: number) => ReactNode;
  fallback?: ReactNode;
}

export function For<T>({ each, children, fallback }: ForProps<T>): ReactNode {
  if (!each || each.length === 0) {
    return fallback ?? null;
  }

  return each.map((item, index) => children(item, index));
}
