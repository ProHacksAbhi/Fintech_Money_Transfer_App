"use client";

import { useState } from "react";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import ForgotPassword from "@/screens/auth/ForgotPassword";
import Dashboard from "@/screens/dashboard/Dashboard";

type Screen = "login" | "register" | "forgot-password" | "dashboard";

interface User {
  email: string;
  fullName: string;
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setCurrentScreen("dashboard");
  };

  const handleRegisterSuccess = (userData: User) => {
    setUser(userData);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
  };

  if (currentScreen === "dashboard" && user) {
    return (
      <Dashboard
        user={{ name: user.fullName, email: user.email }}
        onLogout={handleLogout}
      />
    );
  }

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
