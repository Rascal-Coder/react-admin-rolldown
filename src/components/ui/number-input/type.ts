import type { NumericFormatProps } from "react-number-format";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "onValueChange" | "value"> {
  decimalScale?: number;
  defaultValue?: number;
  fixedDecimalScale?: boolean;
  max?: number;
  min?: number;
  onValueChange?: (value: number | undefined) => void;
  placeholder?: string;
  prefix?: string;
  stepper?: number;
  // Controlled value
  suffix?: string;
  thousandSeparator?: string;
  value?: number;
}
