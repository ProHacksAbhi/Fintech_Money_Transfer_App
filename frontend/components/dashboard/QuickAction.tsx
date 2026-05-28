"use client";

import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

interface QuickActionProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function QuickAction({ label, icon: Icon, onClick }: QuickActionProps) {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-20 w-full gap-2"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}
