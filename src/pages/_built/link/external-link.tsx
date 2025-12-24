import { useLayoutEffect } from "react";
import { useRouterNavigation } from "@/hooks/use-router";

type Props = {
  src: string;
};
export default function ExternalLink({ src }: Props) {
  const navigate = useRouterNavigation();
  useLayoutEffect(() => {
    window.open(src, "_black");
    navigate.back();
  });
  return <div />;
}
