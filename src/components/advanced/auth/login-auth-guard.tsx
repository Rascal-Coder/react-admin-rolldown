import { useEffect } from "react";
import { useLocation } from "react-router";
import { useRouterNavigation } from "@/hooks/use-router";
import { useUserToken } from "@/store/user-store";

type Props = {
  children: React.ReactNode;
};
export default function LoginAuthGuard({ children }: Props) {
  const navigate = useRouterNavigation();
  const { accessToken } = useUserToken();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!accessToken) {
      navigate.replace(`/auth/sign-in?redirect=${pathname}`);
    }
  }, [accessToken, pathname, navigate]);

  return <>{children}</>;
}
