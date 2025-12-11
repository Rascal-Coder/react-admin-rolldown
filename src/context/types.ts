export type Direction = "ltr" | "rtl";

export type DirectionContextType = {
  defaultDir: Direction;
  dir: Direction;
  setDir: (dir: Direction) => void;
  resetDir: () => void;
};
