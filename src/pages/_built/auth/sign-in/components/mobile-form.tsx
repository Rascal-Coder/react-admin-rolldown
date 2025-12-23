import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignInContext } from "../providers/sign-in-provider";
import { ReturnButton } from "./return-button";

interface CountdownProps {
  value: number;
  onChange: (time: number) => void;
  onFinish: () => void;
}

function Countdown({ value, onChange, onFinish }: CountdownProps) {
  useEffect(() => {
    if (value <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      onChange(value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [value, onChange, onFinish]);

  return null;
}

interface MobileFormValues {
  phone: string;
  code: string;
}

export function MobileForm() {
  const [countdown, setCountdown] = useState(0);
  const [second, setSecond] = useState(0);
  const { backToSignIn } = useSignInContext();
  const form = useForm<MobileFormValues>({
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  const start = () => {
    setCountdown(60);
    setSecond(60);
  };

  const reset = () => {
    setCountdown(0);
    setSecond(60);
  };

  const onFinish = (values: MobileFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onFinish)}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="font-semibold text-lg tracking-tight">
                  Mobile sign in
                </h2>
              </div>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="Mobile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          rules={{ required: "Please input mobile phone" }}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span className="text-sm">SMS code</span>
                <span className="text-muted-foreground text-sm" onClick={start}>
                  {countdown === 0 ? (
                    <span>Send SMS code</span>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Countdown
                        onChange={(time) => {
                          setCountdown(time);
                          setSecond(time);
                        }}
                        onFinish={reset}
                        value={countdown}
                      />
                      <span className="ml-1">Reacquire in {second}s</span>
                    </div>
                  )}
                </span>
              </FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          rules={{ required: "Please input sms code" }}
        />

        <Button className="w-full" type="submit">
          Sign in
        </Button>

        <ReturnButton
          onClick={() => {
            reset();
            backToSignIn();
          }}
        />
      </form>
    </Form>
  );
}
