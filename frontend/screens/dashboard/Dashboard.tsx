"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { TransactionItem } from "@/components/dashboard/TransactionItem";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Send,
  Download,
  QrCode,
  Receipt,
  ShoppingCart,
  Briefcase,
  Zap,
  Building,
  IndianRupee,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

const MOCK_TRANSACTIONS = [
  { id: 1, title: "Amazon Purchase", subtitle: "May 26, 2024", amount: "12,450", type: "debit" as const, icon: ShoppingCart },
  { id: 2, title: "Salary Deposit", subtitle: "May 25, 2024", amount: "85,000", type: "credit" as const, icon: Briefcase },
  { id: 3, title: "Electric Bill", subtitle: "May 24, 2024", amount: "2,340", type: "debit" as const, icon: Zap },
  { id: 4, title: "Rent Payment", subtitle: "May 23, 2024", amount: "25,000", type: "debit" as const, icon: Building },
];

export default function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName={user.name}
        userEmail={user.email}
        onLogout={onLogout}
      />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome back, {user.name.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s your financial overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Balance"
            value="4,85,620"
            icon={Wallet}
            trend={{ value: "2.5%", positive: true }}
            subtitle="from last month"
          />
          <StatCard
            title="Monthly Income"
            value="1,25,000"
            icon={TrendingUp}
            trend={{ value: "12%", positive: true }}
            subtitle="from last month"
          />
          <StatCard
            title="Monthly Expenses"
            value="48,280"
            icon={CreditCard}
            trend={{ value: "4%", positive: false }}
            subtitle="from last month"
          />
          <StatCard
            title="Savings"
            value="2,12,840"
            icon={PiggyBank}
            trend={{ value: "8%", positive: true }}
            subtitle="from last month"
          />
        </div>

        {/* Account Summary - Above Transactions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Account Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Checking Account</p>
                <p className="text-lg font-semibold text-foreground flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />3,85,620
                </p>
                <p className="text-xs text-muted-foreground">**** **** **** 4521</p>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-auto" />
              <Separator className="sm:hidden" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Savings Account</p>
                <p className="text-lg font-semibold text-foreground flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />1,00,000
                </p>
                <p className="text-xs text-muted-foreground">**** **** **** 7892</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <QuickAction label="Send Money" icon={Send} />
                <QuickAction label="Receive" icon={Download} />
                <QuickAction label="Scan QR" icon={QrCode} />
                <QuickAction label="Pay Bills" icon={Receipt} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    title={tx.title}
                    subtitle={tx.subtitle}
                    amount={tx.amount}
                    type={tx.type}
                    icon={tx.icon}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Palettes for Future Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                Coming Soon
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">Goals & Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                Coming Soon
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
