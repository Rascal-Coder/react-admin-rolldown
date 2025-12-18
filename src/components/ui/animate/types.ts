// Easing function type compatible with Framer Motion
type EasingFunction = [number, number, number, number];

export type VariantsType = {
  durationIn?: number;
  durationOut?: number;
  easeIn?: EasingFunction;
  easeOut?: EasingFunction;
  distance?: number;
};

export type TranHoverType = {
  duration?: number;
  ease?: EasingFunction;
};
export type TranEnterType = {
  durationIn?: number;
  easeIn?: EasingFunction;
};
export type TranExitType = {
  durationOut?: number;
  easeOut?: EasingFunction;
};

export type BackgroundType = {
  duration?: number;
  ease?: EasingFunction;
  colors?: string[];
};
