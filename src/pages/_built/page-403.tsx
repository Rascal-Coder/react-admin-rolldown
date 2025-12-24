import ErrorLayout from "@/components/ui/error-layout";
import Page403Svg from "@/components/ui/error-page-icons/403";
import { GLOBAL_CONFIG } from "@/global-config";
export default function Page403() {
  return (
    <div className="m-auto flex h-full max-w-[400px] items-center justify-center">
      <ErrorLayout
        desc="You do not have permission to access this resource."
        helmetTitle={`403 - ${GLOBAL_CONFIG.appName}`}
        svg={<Page403Svg />}
        title="Access Denied"
      />
    </div>
  );
}
