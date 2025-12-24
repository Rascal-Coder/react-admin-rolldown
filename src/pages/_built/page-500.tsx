import ErrorLayout from "@/components/ui/error-layout";
import Page500Svg from "@/components/ui/error-page-icons/500";
import { GLOBAL_CONFIG } from "@/global-config";

export default function Page500() {
  return (
    <div className="m-auto flex h-full max-w-[400px] items-center justify-center">
      <ErrorLayout
        desc="Sorry for the inconvenience."
        helmetTitle={`500 - ${GLOBAL_CONFIG.appName}`}
        svg={<Page500Svg />}
        title="Internal Server Error!"
      />
    </div>
  );
}
