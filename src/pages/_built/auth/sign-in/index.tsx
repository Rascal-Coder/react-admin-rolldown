import { Helmet } from "react-helmet-async";
import { GLOBAL_CONFIG } from "@/global-config";
import { SignInProvider } from "./providers/sign-in-provider";
import { UnifiedSignIn } from "./unified-sign-in";

function SignPage() {
  return (
    <>
      <Helmet>
        <title>Sign In - {GLOBAL_CONFIG.appName}</title>
      </Helmet>
      <SignInProvider>
        <UnifiedSignIn />
      </SignInProvider>
    </>
  );
}
// 默认导出简单布局
export default SignPage;
