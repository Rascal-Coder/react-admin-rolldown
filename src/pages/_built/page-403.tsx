import ErrorLayout from "@/components/ui/error-layout";
import Page403Svg from "@/components/ui/error-page-icons/403";
export default function Page403() {
  return (
    <div className="flex h-screen w-full flex-col bg-bg text-text-base">
      <ErrorLayout
        desc="You do not have permission to access this resource."
        helmetTitle="403 - Bug Admin"
        svg={<Page403Svg />}
        title="Access Denied"
      />
    </div>
  );
}
