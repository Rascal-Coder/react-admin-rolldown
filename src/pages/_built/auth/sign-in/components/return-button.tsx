import { Button } from "@/components/base/button";
import Icon from "@/components/ui/icon/icon";

interface ReturnButtonProps {
  onClick?: () => void;
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <Button
      className="w-full cursor-pointer text-accent-foreground"
      onClick={onClick}
      variant="link"
    >
      <Icon icon="solar:alt-arrow-left-linear" size={20} />
      <span className="text-sm">Back to sign in</span>
    </Button>
  );
}
