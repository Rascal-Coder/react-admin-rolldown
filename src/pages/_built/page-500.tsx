import ErrorLayout from "@/components/ui/error-layout";
import Page500Svg from "@/components/ui/error-page-icons/500";
import { GLOBAL_CONFIG } from "@/global-config";

export default function Page500() {
  return (
    <div className="flex h-screen w-full flex-col bg-bg text-text-base">
      <ErrorLayout
        desc="Sorry for the inconvenience."
        helmetTitle={`500 - ${GLOBAL_CONFIG.appName}`}
        svg={<Page500Svg />}
        title="Internal Server Error!"
      />
    </div>
  );
}
