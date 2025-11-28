import { useSidebar } from "@/components/ui/layout/resizable-sidebar";
import { cn } from "@/utils";
import type { LogoProps } from "./types";

const Logo = ({
  animate,
  className,
  url,
  title = "Bug Admin",
  showTitle = true,
  onClick,
  width = 35,
  height = 35,
}: LogoProps) => {
  const { state: sidebarState } = useSidebar();
  const isTitleVisible = sidebarState === "expanded" && showTitle;
  const content = (
    <>
      <img
        alt="logo"
        className={`object-contain ${animate ? "animate-rotate" : ""}`}
        height={height}
        src={url ?? "/logo.svg"}
        width={width}
      />
      <h2
        className={cn(
          "w-0 truncate font-medium text-lg transition-all duration-500 ease-out",
          "-translate-x-2 opacity-0",
          isTitleVisible
            ? "pointer-events-auto w-auto translate-x-0 opacity-100"
            : "-translate-x-2 pointer-events-none overflow-hidden"
        )}
      >
        {title}
      </h2>
    </>
  );

  return (
    <button
      className={cn(
        "flex items-center justify-center",
        isTitleVisible && "gap-2",
        className
      )}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
};

export { Logo };
