import { useLayoutEffect } from "react";
import { useRouterNavigation } from "@/hooks/use-router";
import { useUserToken } from "@/store/user-store";

type Props = {
  children: React.ReactNode;
};
export default function LoginAuthGuard({ children }: Props) {
  const navigate = useRouterNavigation();
  const { accessToken } = useUserToken();

  useLayoutEffect(() => {
    if (!accessToken) {
      navigate.replace("/auth/sign-in", {
        query: { redirect: location.pathname },
      });
    }
  }, [navigate, accessToken]);

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}
