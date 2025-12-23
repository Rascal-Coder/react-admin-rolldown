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
import { SignUpForm } from "./components/sign-up-form";

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign Up - Bug Admin</title>
      </Helmet>
      <AuthLayout>
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your email and password to create an account. <br />
              Already have an account?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/sign-in"
              >
                Sign In
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <p className="px-8 text-center text-muted-foreground text-sm">
              By creating an account, you agree to our{" "}
              <span className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </span>
              .
            </p>
          </CardFooter>
        </Card>
      </AuthLayout>
    </>
  );
}
