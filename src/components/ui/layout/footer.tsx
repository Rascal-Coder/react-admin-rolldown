import { cn } from "@/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  icpLink?: string;
  icp?: string;
  date?: string;
  companyName?: string;
  companySiteLink?: string;
  className?: string;
  isFixed?: boolean;
}

export function Footer({
  icpLink,
  icp,
  date,
  companyName,
  companySiteLink,
  className,
  isFixed = false,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "h-8 w-full bg-background py-1 text-center",
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
