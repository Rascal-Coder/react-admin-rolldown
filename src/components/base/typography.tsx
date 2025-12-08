import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils";

const titleVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    as: {
      h1: "font-extrabold text-4xl lg:text-5xl",
      h2: "font-extrabold text-3xl",
      h3: "font-bold text-2xl",
      h4: "font-bold text-xl",
      h5: "font-bold text-lg",
      h6: "font-semibold text-base",
    },
    color: {
      default: "text-text-primary",
      secondary: "text-text-secondary",
      disabled: "text-text-disabled",
      primary: "text-primary",
      info: "text-info",
      error: "text-error",
      warning: "text-warning",
      success: "text-success",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    as: "h1",
    color: "default",
    align: "left",
  },
});

const textVariants = cva("", {
  variants: {
    variant: {
      // 副标题
      subTitle1: "font-semibold text-base",
      subTitle2: "font-normal text-sm",

      // 正文
      body1: "font-normal text-base",
      body2: "font-normal text-sm",

      // 说明文字
      caption: "font-normal text-xs",

      // 代码
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-normal text-sm",
    },
    color: {
      default: "text-text-primary",
      secondary: "text-text-secondary",
      disabled: "text-text-disabled",
      primary: "text-primary",
      info: "text-info",
      error: "text-error",
      warning: "text-warning",
      success: "text-success",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body1",
    color: "default",
    align: "left",
  },
});

type TitleVariantProps = VariantProps<typeof titleVariants>;
type TextVariantProps = VariantProps<typeof textVariants>;

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "color"> {
  as?: HeadingTag;
  color?: TitleVariantProps["color"];
  align?: TitleVariantProps["align"];
  ref?: React.Ref<HTMLHeadingElement>;
}
const Title = ({
  className,
  color,
  align,
  as: Component = "h1",
  ref,
  ...props
}: TitleProps) => (
  <Component
    className={cn(titleVariants({ as: Component, color, align, className }))}
    ref={ref}
    {...props}
  />
);

export interface TextProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  variant?: TextVariantProps["variant"];
  color?: TextVariantProps["color"];
  align?: TextVariantProps["align"];
  ref?: React.Ref<HTMLSpanElement>;
}
const Text = ({
  className,
  variant,
  color,
  align,
  ref,
  ...props
}: TextProps) => (
  <span
    className={cn(textVariants({ variant, color, align, className }))}
    ref={ref}
    {...props}
  />
);

export { Title, Text, titleVariants, textVariants };
