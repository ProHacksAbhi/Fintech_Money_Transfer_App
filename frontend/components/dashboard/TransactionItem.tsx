"use client";

import { type LucideIcon, IndianRupee } from "lucide-react";

interface TransactionItemProps {
  title: string;
  subtitle: string;
  amount: string;
  type: "credit" | "debit";
  icon: LucideIcon;
}

export function TransactionItem({
  title,
  subtitle,
  amount,
  type,
  icon: Icon,
}: TransactionItemProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className={`text-sm font-semibold flex items-center gap-0.5 ${type === "credit" ? "text-primary" : "text-foreground"}`}>
        {type === "credit" ? "+" : "-"}
        <IndianRupee className="h-3 w-3" />
        {amount}
      </div>
    </div>
  );
}
