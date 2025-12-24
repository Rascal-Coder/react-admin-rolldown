import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";

type Props = {
  src: string;
};
export default function ExternalLink({ src }: Props) {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    window.open(src, "_black");
    navigate(-1);
  });
  return <div />;
}
