import { ChevronDown, ChevronUp } from "lucide-react";
import {
  type MutableRefObject,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  ref?: Ref<HTMLInputElement>;
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

const NumberInput = ({
  stepper,
  thousandSeparator,
  placeholder,
  defaultValue,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onValueChange,
  fixedDecimalScale = false,
  decimalScale = 0,
  suffix,
  prefix,
  value: controlledValue,
  ref: forwardedRef,
  ...props
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(inputRef.current);
      return;
    }
    (forwardedRef as MutableRefObject<HTMLInputElement | null>).current =
      inputRef.current;
  }, [forwardedRef]);

  const [value, setValue] = useState<number | undefined>(
    controlledValue ?? defaultValue
  );

  const handleIncrement = useCallback(() => {
    setValue((prev) =>
      prev === undefined ? (stepper ?? 1) : Math.min(prev + (stepper ?? 1), max)
    );
  }, [stepper, max]);

  const handleDecrement = useCallback(() => {
    setValue((prev) =>
      prev === undefined
        ? -(stepper ?? 1)
        : Math.max(prev - (stepper ?? 1), min)
    );
  }, [stepper, min]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) {
        if (e.key === "ArrowUp") {
          handleIncrement();
        } else if (e.key === "ArrowDown") {
          handleDecrement();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDecrement, handleIncrement]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (values: {
    value: string;
    floatValue: number | undefined;
  }) => {
    const newValue =
      values.floatValue === undefined ? undefined : values.floatValue;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleBlur = () => {
    const currentInput = inputRef.current;
    if (currentInput === null || value === undefined) {
      return;
    }

    if (value < min) {
      setValue(min);
      currentInput.value = String(min);
    } else if (value > max) {
      setValue(max);
      currentInput.value = String(max);
    }
  };

  return (
    <div className="flex items-center">
      <NumericFormat
        allowNegative={min < 0}
        className="relative h-[36px] rounded-r-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        customInput={Input}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        getInputRef={inputRef}
        max={max}
        min={min}
        onBlur={handleBlur}
        onValueChange={handleChange}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        thousandSeparator={thousandSeparator}
        value={value}
        valueIsNumericString
        {...props}
      />

      <div className="flex flex-col">
        <Button
          aria-label="Increase value"
          className="h-[18px] rounded-l-none rounded-br-none border-input border-b-[0.5px] border-l-0 px-2 focus-visible:relative"
          disabled={value === max}
          onClick={handleIncrement}
          variant="outline"
        >
          <ChevronUp size={15} />
        </Button>
        <Button
          aria-label="Decrease value"
          className="h-[18px] rounded-l-none rounded-tr-none border-input border-t-[0.5px] border-l-0 px-2 focus-visible:relative"
          disabled={value === min}
          onClick={handleDecrement}
          variant="outline"
        >
          <ChevronDown size={15} />
        </Button>
      </div>
    </div>
  );
};

export default NumberInput;
