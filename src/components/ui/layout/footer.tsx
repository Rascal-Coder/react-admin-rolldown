import { useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/utils";
import { useSidebar } from "./resizable-sidebar";

type FooterVariant = "sidebar" | "floating" | "inset";

const FOOTER_COLLAPSED_MARGIN_BY_VARIANT: Record<FooterVariant, string> = {
  sidebar: "ml-(--sidebar-width-icon)",
  floating: "ml-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
  inset: "ml-[calc(var(--sidebar-width-icon)+(--spacing(5)))]",
};

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  icpLink?: string;
  icp?: string;
  date?: string;
  companyName?: string;
  companySiteLink?: string;
  className?: string;
  isFixed?: boolean;
  variant?: FooterVariant;
}

export function Footer({
  icpLink,
  icp,
  date,
  companyName,
  companySiteLink,
  className,
  isFixed = false,
  variant = "sidebar",
}: FooterProps) {
  const { state } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const marginLeftClass = useMemo(() => {
    if (!isFixed || isMobile) {
      return "";
    }

    if (state === "expanded") {
      return "ml-(--sidebar-width)";
    }

    if (state === "collapsed") {
      return FOOTER_COLLAPSED_MARGIN_BY_VARIANT[variant];
    }

    return "";
  }, [isFixed, state, variant, isMobile]);

  return (
    <footer
      className={cn(
        "flex w-full items-center justify-center bg-background py-1 text-foreground",
        marginLeftClass,
        isFixed &&
          "fixed right-0 bottom-0 left-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div>
        <a className="mx-1 hover:text-primary" href={icpLink ?? ""}>
          {icp ?? ""}
        </a>
        Copyright © {date}
        {companyName && (
          <a className="mx-1 hover:text-primary" href={companySiteLink ?? ""}>
            {companyName}
          </a>
        )}
      </div>
    </footer>
  );
}
