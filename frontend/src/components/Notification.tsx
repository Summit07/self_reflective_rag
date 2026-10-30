"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface NotificationProps {
  message: string | null;
  type: "success" | "error" | null;
  onDismiss: () => void;
}

export function Notification({
  message,
  type,
  onDismiss,
}: NotificationProps) {
  if (!message || !type) return null;

  const isSuccess = type === "success";

  return (
    <div
      role="status"
      className={`my-4 p-3.5 px-4 rounded-[12px] text-[13px] font-medium flex items-center justify-between gap-3 transition-all duration-200 border ${
        isSuccess
          ? "bg-[#edfbf4] dark:bg-[#062c1d] border-[#c3efd6] dark:border-[#0e4e34] text-[#176b49] dark:text-[#52e3a4]"
          : "bg-[#fff0f0] dark:bg-[#341212] border-[#ffd0d0] dark:border-[#582020] text-[#b42318] dark:text-[#f87171]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isSuccess ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#176b49] dark:text-[#52e3a4]" />
        ) : (
          <AlertCircle className="h-4 w-4 shrink-0 text-[#b42318] dark:text-[#f87171]" />
        )}
        <span>{message}</span>
      </div>

      <button
        onClick={onDismiss}
        className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5"
        title="Dismiss notice"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

