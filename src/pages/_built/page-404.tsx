import ErrorLayout from "@/components/ui/error-layout";
import Page404Svg from "@/components/ui/error-page-icons/404";

export default function Page404() {
  return (
    <div className="flex h-screen w-full flex-col bg-bg text-text-base">
      <ErrorLayout
        desc="The page you’re looking for doesn’t exist or has been moved."
        helmetTitle="404 - Bug Admin"
        svg={<Page404Svg />}
        title="Oops! Page not found!"
      />
    </div>
  );
}
