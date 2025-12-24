import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import { useUserToken } from "@/store/user-store";

type Props = {
  children: React.ReactNode;
};
export default function LoginAuthGuard({ children }: Props) {
  const navigate = useNavigate();
  const { accessToken } = useUserToken();

  useLayoutEffect(() => {
    if (!accessToken) {
      navigate("/auth/sign-in", { replace: true });
    }
  }, [navigate, accessToken]);

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}
