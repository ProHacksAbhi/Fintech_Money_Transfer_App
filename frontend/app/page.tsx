"use client";

import { useState } from "react";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import ForgotPassword from "@/screens/auth/ForgotPassword";

type Screen = "login" | "register" | "forgot-password";

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");

  const handleLoginSuccess = (user: { email: string; fullName: string }) => {
    console.log("Login successful:", user);
    // Handle successful login - redirect to dashboard, etc.
  };

  const handleRegisterSuccess = (user: { email: string; fullName: string }) => {
    console.log("Registration successful:", user);
    // Handle successful registration - redirect to dashboard or show welcome screen
  };

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "login" && (
        <Login
          onNavigateToRegister={() => setCurrentScreen("register")}
          onNavigateToForgotPassword={() => setCurrentScreen("forgot-password")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentScreen === "register" && (
        <Register
          onNavigateToLogin={() => setCurrentScreen("login")}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {currentScreen === "forgot-password" && (
        <ForgotPassword onNavigateToLogin={() => setCurrentScreen("login")} />
      )}
    </main>
  );
}
