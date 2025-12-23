import Icon from "@/components/ui/icon/icon";

export function LogoHeader() {
  return (
    <div className="mb-4 flex items-center justify-center">
      <Icon icon="local-logo" size={40} />
      <h1 className="font-medium text-xl">Bug Admin</h1>
    </div>
  );
}
