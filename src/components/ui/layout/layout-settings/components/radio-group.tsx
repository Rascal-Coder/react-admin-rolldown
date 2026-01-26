import { Item, Root as Radio } from "@radix-ui/react-radio-group";
import { CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils";

export interface RadioGroupItemConfig<T extends string = string> {
  value: T;
  label: string;
  content: ReactNode;
}

function RadioGroupItem<T extends string>({
  item,
}: {
  item: RadioGroupItemConfig<T>;
}) {
  return (
    <Item
      aria-describedby={`${item.value}-description`}
      aria-label={`Select ${item.label.toLowerCase()}`}
      className={cn("group outline-none", "transition duration-200 ease-in")}
      value={item.value}
    >
      <div
        aria-hidden="false"
        aria-label={`${item.label} option preview`}
        className={cn(
          "outline-box",
          "relative rounded-md ring-[1px] ring-border",
          "group-data-[state=checked]:shadow-2xl",
          "group-focus-visible:ring-2"
        )}
        role="img"
      >
        <CircleCheck
          aria-hidden="true"
          className={cn(
            "size-6 fill-primary stroke-white",
            "group-data-[state=unchecked]:hidden",
            "-translate-y-1/2 absolute top-0 right-0 translate-x-1/2"
          )}
        />
        <div className="fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground">
          {item.content}
        </div>
      </div>
      <div
        aria-live="polite"
        className="mt-1 text-xs"
        id={`${item.value}-description`}
      >
        {item.label}
      </div>
    </Item>
  );
}

interface RadioGroupProps<T extends string> {
  items: RadioGroupItemConfig<T>[];
  onValueChange: (value: T) => void;
  value: T;
  className?: string;
  ariaDescription?: string;
  ariaLabel?: string;
}

const RadioGroup = <T extends string>({
  items,
  onValueChange,
  value,
  className,
  ariaDescription,
  ariaLabel,
}: RadioGroupProps<T>) => (
  <Radio
    aria-describedby={ariaDescription}
    aria-label={ariaLabel}
    className={cn("grid w-full max-w-md grid-cols-3 gap-4", className)}
    onValueChange={onValueChange}
    value={value}
  >
    {items.map((radioItem) => (
      <RadioGroupItem item={radioItem} key={radioItem.value} />
    ))}
  </Radio>
);

export { RadioGroupItem, RadioGroup };
