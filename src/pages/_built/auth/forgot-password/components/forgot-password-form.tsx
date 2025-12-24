import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useRouterNavigation } from "@/hooks/use-router";
import { cn, sleep } from "@/utils";

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Please enter your email" : undefined),
  }),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useRouterNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(data);

    toast.promise(sleep(2000), {
      loading: "Sending email...",
      success: () => {
        setIsLoading(false);
        form.reset();
        navigate.push("/otp");
        return `Email sent to ${data.email}`;
      },
      error: "Error",
    });
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-2", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          Continue
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
        </Button>
      </form>
    </Form>
  );
}
