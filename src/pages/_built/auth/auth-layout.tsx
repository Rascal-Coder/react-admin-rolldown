import Icon from "@/components/ui/icon/icon";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
        <div className="mb-4 flex items-center justify-center">
          <Icon icon="local-logo" size={40} />
          <h1 className="font-medium text-xl">Bug Admin</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
