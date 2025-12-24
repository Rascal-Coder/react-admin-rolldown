import { Outlet } from "react-router";
import { LogoSvg } from "@/components/ui/layout/logo";
import { GLOBAL_CONFIG } from "@/global-config";

function HeaderSimple() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <LogoSvg />
        <span className="font-medium text-black text-lg dark:text-white">
          {GLOBAL_CONFIG.appName}
        </span>
      </div>
    </header>
  );
}

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-bg text-text-base">
      <HeaderSimple />
      {children}
      <Outlet />
    </div>
  );
}
