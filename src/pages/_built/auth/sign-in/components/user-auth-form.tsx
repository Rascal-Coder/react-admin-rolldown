import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/base/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";
import { Input } from "@/components/base/input";
import Icon from "@/components/ui/icon/icon";
import { PasswordInput } from "@/components/ui/password-input";
import { GLOBAL_CONFIG } from "@/global-config";
import { useAuthLogin } from "@/hooks/use-auth-login";
import { useRouterNavigation } from "@/hooks/use-router";
import { cn, sleep } from "@/utils";
import {
  SignInStateEnum,
  useSignInContext,
} from "../providers/sign-in-provider";

const formSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(7, "Password must be at least 7 characters long"),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string;
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const { login, isLoading } = useAuthLogin();
  const navigate = useRouterNavigation();
  const { setSignInState } = useSignInContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin",
      password: "demo1234",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(sleep(2000), {
      loading: "Signing in...",
      success: async () => {
        await login({
          username: form.getValues("username"),
          password: form.getValues("password"),
        });
        // Redirect to the stored location or default to dashboard
        // Requirements: 2.5
        const targetPath = redirectTo || GLOBAL_CONFIG.defaultRoute;
        navigate.replace(targetPath);

        return `Welcome back, ${data.username}!`;
      },
      duration: 600,
      error: "Error",
    });
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="admin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                className="absolute end-0 -top-0.5 font-medium text-muted-foreground text-sm hover:opacity-75"
                to="/auth/forgot-password"
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          Sign in
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            disabled={isLoading}
            onClick={() => setSignInState(SignInStateEnum.MOBILE)}
            type="button"
            variant="outline"
          >
            <Icon icon="uil:mobile-android" size={20} />
            Mobile sign in
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => setSignInState(SignInStateEnum.QR_CODE)}
            type="button"
            variant="outline"
          >
            <Icon icon="uil:qrcode-scan" size={20} />
            Qr code sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
