"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
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
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
} from "@/utils/validators";
import { registerUser } from "@/services/authService";

interface RegisterProps {
  onNavigateToLogin?: () => void;
  onRegisterSuccess?: (user: { email: string; fullName: string }) => void;
}

export default function Register({
  onNavigateToLogin,
  onRegisterSuccess,
}: RegisterProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate all inputs
    const nameValidation = validateName(fullName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

    const newErrors: typeof errors = {};
    if (!nameValidation.isValid) newErrors.fullName = nameValidation.error;
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;
    if (!confirmPasswordValidation.isValid) newErrors.confirmPassword = confirmPasswordValidation.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({ fullName, email, password });
      
      if (response.success && response.user) {
        onRegisterSuccess?.(response.user);
      } else {
        setErrors({ general: response.message });
      }
    } catch {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Create an account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details to get started
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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className={errors.fullName ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
              
              {/* Password strength indicators */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className={`h-3 w-3 ${passwordChecks.length ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={passwordChecks.length ? "text-primary" : "text-muted-foreground"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className={`h-3 w-3 ${passwordChecks.uppercase ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={passwordChecks.uppercase ? "text-primary" : "text-muted-foreground"}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className={`h-3 w-3 ${passwordChecks.lowercase ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={passwordChecks.lowercase ? "text-primary" : "text-muted-foreground"}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className={`h-3 w-3 ${passwordChecks.number ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={passwordChecks.number ? "text-primary" : "text-muted-foreground"}>
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
