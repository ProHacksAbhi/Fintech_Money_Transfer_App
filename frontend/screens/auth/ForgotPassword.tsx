"use client";

import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateEmail } from "@/utils/validators";
import { forgotPassword } from "@/services/authService";

interface ForgotPasswordProps {
  onNavigateToLogin?: () => void;
}

export default function ForgotPassword({
  onNavigateToLogin,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrors({ email: emailValidation.error });
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(email);
      
      if (response.success) {
        setIsSuccess(true);
      } else {
        setErrors({ general: response.message });
      }
    } catch {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Check your email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We&apos;ve sent a password reset link to
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{email}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {"Didn't receive the email? Check your spam folder or"}
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="ml-1 text-primary hover:underline font-medium"
              >
                try again
              </button>
            </p>
          </CardContent>

          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={onNavigateToLogin}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <svg
              className="h-6 w-6 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Forgot password?
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            No worries, we&apos;ll send you reset instructions
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={errors.email ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Reset password"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onNavigateToLogin}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
