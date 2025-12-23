import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { AuthLayout } from "../auth-layout";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export default function ForgotPassword() {
  return (
    <>
      <Helmet>
        <title>Forgot Password - Bug Admin</title>
      </Helmet>
      <AuthLayout>
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your registered email and <br /> we will send you a link to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter>
            <p className="mx-auto text-balance px-8 text-center text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/sign-up"
              >
                Sign up
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </AuthLayout>
    </>
  );
}
