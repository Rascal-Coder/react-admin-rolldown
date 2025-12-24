import { useCallback, useEffect } from "react";
import { useRouterNavigation } from "@/hooks/use-router";
import { useUserToken } from "@/store/user-store";

type Props = {
  children: React.ReactNode;
};
export default function LoginAuthGuard({ children }: Props) {
  const navigate = useRouterNavigation();
  const { accessToken } = useUserToken();
  const check = useCallback(() => {
    if (!accessToken) {
      navigate.replace("/auth/sign-in");
    }
  }, [navigate, accessToken]);
  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
