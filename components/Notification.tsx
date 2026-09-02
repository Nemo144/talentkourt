"use client";

import React, { useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Bell, X } from "lucide-react";
import { NotificationType } from "@/lib/generated/prisma/enums";

interface NotificationToastProps {
  id: string;
  message: string;
  type: NotificationType;
  onClose: (id: string) => void;
  durationMs?: number; // Optional fallback timer override (default: 4000ms)
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  message,
  type,
  onClose,
  durationMs = 4000,
}) => {
  //using the effect hook for the auto dismiss time
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [id, durationMs, onClose]);

  //configuration mapping
  const getToastConfig = (toastType: NotificationType) => {
    switch (toastType) {
      case "TID_ISSUED":
      case "VERIFICATION_APPROVED":
        return {
          icon: CheckCircle2,
          borderClass:
            "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
          iconClass: "text-emerald-400",
          accentLine: "bg-emerald-500",
        };

      case "VERIFICATION_REJECTED":
      case "ACCOUNT_SUSPENDED":
      case "CONTENT_REMOVED":
        return {
          icon: XCircle,
          borderClass:
            "border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
          iconClass: "text-red-400",
          accentLine: "bg-red-500",
        };

      case "CONTENT_WARNED":
        return {
          icon: AlertTriangle,
          borderClass:
            "border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
          iconClass: "text-amber-400",
          accentLine: "bg-amber-500",
        };
      default:
        return {
          icon: Bell,
          borderClass: "border-zinc-800 shadow-xl",
          iconClass: "text-orange-400",
          accentLine: "bg-orange-500",
        };
    }
  };

  const config = getToastConfig(type);
  const Icon = config.icon;

  return (
    <div
      className={`relative overflow-hidden w-full max-w-sm rounded-xl border bg-zinc-950 p-4 flex items-start gap-3 transition-all duration-300 animate-slide-in-right ${config.borderClass}`}
      role="alert"
    >
      {/* Visual Accent Bar */}
      <div
        className={`absolute top-0 left-0 h-full w-[3px] ${config.accentLine}`}
      />

      {/* Dynamic Status Icon */}
      <div className={`shrink-0 mt-0.5 ${config.iconClass}`}>
        <Icon className="w-4 h-4" />
      </div>

      {/* Information Body Content */}
      <div className="flex-1 min-w-0 pr-2">
        <span className="block text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500 mb-0.5">
          {type.replaceAll("_", " ")}
        </span>
        <p className="text-xs text-zinc-200 leading-normal font-medium break-words">
          {message}
        </p>
      </div>

      {/* Manual Close Button */}
      <button
        onClick={() => onClose(id)}
        className="shrink-0 rounded p-0.5 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 transition"
        title="Dismiss Alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default NotificationToast;
