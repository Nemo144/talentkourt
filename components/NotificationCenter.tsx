"use client";
import React, { useTransition } from "react";
import { NotificationType } from "@/lib/generated/prisma/enums";
import { markAsRead } from "@/lib/services/notificationService";
import {
  Bell,
  Check,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";

interface NotificationCenterProps {
  notifications: {
    id: string;
    content: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
  }[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
}) => {
  // Handles server mutations concurrently; replaces manual loading state (useState)
  // and triggers an instant Next.js data revalidation path cache flush on completion.
  const [isPending, startTransition] = useTransition();

  //calculate unread indicators dynamicallyfrom the imcoming props collection
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  //trigger server action within a transition to update cache states instantly
  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      await markAsRead(id);
    });
  };

  //category glyph icon assignment configuration mapper
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "TID_ISSUED":
      case "VERIFICATION_APPROVED":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "VERIFICATION_REJECTED":
      case "ACCOUNT_SUSPENDED":
      case "CONTENT_REMOVED":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "CONTENT_WARNED":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-orange-400" />;
    }
  };
  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-900 bg-zinc-950 p-5 shadow-2xl space-y-5">
      {/* HEADER SECTION: Counter telemetry tracking controls */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Alert Center
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              System event historical logging stream.
            </p>
          </div>
        </div>

        {/* Dynamic Unread Indicator Badge Counter */}
        {unreadCount > 0 ? (
          <span className="inline-flex items-center rounded-md bg-orange-950/40 border border-orange-900/40 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-orange-400 animate-fade-in">
            {unreadCount} New
          </span>
        ) : (
          <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-tight">
            All Caught Up
          </span>
        )}
      </div>

      {/* BODY SECTOR FEED LIST */}
      {notifications.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-zinc-900 rounded-xl font-mono text-[11px] text-zinc-600 bg-zinc-950/20">
          No historical notifications linked to this profile.
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`relative overflow-hidden rounded-xl border p-3.5 flex items-start gap-3.5 transition-all duration-200 ${
                notification.isRead
                  ? "border-zinc-900/60 bg-zinc-900/10 opacity-60"
                  : "border-zinc-800 bg-zinc-900/40 shadow-sm"
              }`}
            >
              {/* Category Glyph Left Indicator */}
              <div className="shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>

              {/* Text content parameter wrapper blocks */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2 text-[9px] font-mono">
                  <span className="font-black uppercase tracking-wider text-zinc-500">
                    {notification.type.replaceAll("_", " ")}
                  </span>

                  {/* Human-readable localized timestamp logs */}
                  <div className="flex items-center gap-1 text-zinc-600 font-medium">
                    <Clock className="w-2.5 h-2.5" />
                    <span>
                      {new Date(notification.createdAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-medium break-words pt-0.5">
                  {notification.content}
                </p>
              </div>

              {/* Action controller layer for live mark-as-read updates */}
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkRead(notification.id)}
                  disabled={isPending}
                  className="shrink-0 self-center rounded-lg p-1.5 border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-emerald-400 hover:border-emerald-950 transition-colors disabled:opacity-40"
                  title="Mark as Read"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
