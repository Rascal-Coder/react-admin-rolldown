import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import authService from "@/api/services/auth-service";
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
import { cn } from "@/utils";
import {
  SignInStateEnum,
  useSignInContext,
} from "../providers/sign-in-provider";

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
  captcha: z.string().min(1, "Please enter the captcha"),
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

  const [captchaId, setCaptchaId] = useState("");
  const [captchaImg, setCaptchaImg] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin1",
      password: "123456",
      captcha: "",
    },
    mode: "onSubmit",
  });

  const fetchCaptcha = useCallback(async () => {
    try {
      setCaptchaLoading(true);
      const res = await authService.getCaptcha();
      setCaptchaId(res.id);
      setCaptchaImg(res.imageBase64);
      form.setValue("captcha", "");
    } catch {
      toast.error("Failed to load captcha");
    } finally {
      setCaptchaLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  async function onSubmit(data: FormValues) {
    try {
      toast.loading("Signing in...", { id: "sign-in" });

      await login({
        accountNumber: data.username,
        password: data.password,
        captcha: data.captcha,
        captchaId,
      });

      toast.success(`Welcome back, ${data.username}!`, { id: "sign-in" });

      const targetPath = redirectTo || GLOBAL_CONFIG.defaultRoute;
      navigate.replace(targetPath);
    } catch {
      toast.error("Sign in failed. Please try again.", { id: "sign-in" });
      fetchCaptcha();
    }
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
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  className="font-medium text-muted-foreground text-sm hover:opacity-75"
                  to="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captcha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Captcha</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    className="flex-1"
                    maxLength={4}
                    placeholder="Enter captcha"
                    {...field}
                  />
                  {captchaImg ? (
                    <button
                      className="h-9 w-[100px] cursor-pointer overflow-hidden rounded-md border p-0"
                      onClick={fetchCaptcha}
                      type="button"
                    >
                      <img
                        alt="captcha"
                        className="h-full w-full object-cover"
                        height={36}
                        src={captchaImg}
                        width={100}
                      />
                    </button>
                  ) : (
                    <div className="flex h-9 w-[100px] items-center justify-center rounded-md border">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  <Button
                    className="h-9 w-9 shrink-0"
                    disabled={captchaLoading}
                    onClick={fetchCaptcha}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <RefreshCw
                      className={cn(captchaLoading && "animate-spin")}
                      size={16}
                    />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
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
