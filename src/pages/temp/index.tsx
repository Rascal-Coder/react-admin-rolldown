import { useLocation } from "react-router";

export default function Temp() {
  const { pathname } = useLocation();
  return <div>我是一个临时路由{pathname}</div>;
}
