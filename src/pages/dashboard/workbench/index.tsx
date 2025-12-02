import { useMatches } from "react-router";

type WorkbenchHandle = {
  hidden?: boolean;
};

export default function Workbench() {
  const matches = useMatches();
  console.log("matches", matches);

  const workbenchMatch = matches.find((m) => m.pathname === "/workbench");
  const handle = workbenchMatch?.handle as WorkbenchHandle;
  if (handle?.hidden) {
    return null;
  }
  return <div>Workbench</div>;
}
