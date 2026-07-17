"use client";
import React, { useTransition } from "react";
import { revokeTid, editUserInfo, suspendUser } from "@/lib/actions/users";
import { useSession } from "next-auth/react";
import { UserType, VerificationStatus } from "@/lib/generated/prisma/enums";

interface UserDetailPanelProps {
  user: {
    id: string;
    email: string;
    userType: UserType;
    joinedAt: Date;
    lastActive?: Date | null;
    status: VerificationStatus;
    tid?: string | null;
  };
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ user }) => {
  //useTransition to prevent UI blocking by handling server action states
  //at the same time without a manual loading spinner state
  const [isPending, startTransition] = useTransition();

  //useSession to manage the adminId's session
  const { data: session } = useSession();

  //get adminId from session, otherwise return ""
  const adminId = session?.user.id ?? "";

  //function to trigger async actions from the server(revokeTid, editUserInfo, suspendUser)
  const triggerAction = (
    message: string,
    actionFn: () => Promise<{ success: boolean; message: string }>,
  ) => {
    //wrap the execution inside react's transition engine,
    //component automatically pending, panel buttons disabled until db update is done
    startTransition(async () => {
      const res = await actionFn();
      alert(res.message);
    });
  };

  //function to handle email edits
  const handleEditEmail = () => {
    //new email address
    const newEmail = prompt("Enter new email address:", user.email);

    //invalid email alert
    if (!newEmail || !newEmail.includes("@")) return alert("Invalid email");

    //call triggerAction() to edit email
    triggerAction("Updating email...", () =>
      editUserInfo(user.id, { email: newEmail }),
    );
  };

  //function to handle revoking of the tid
  const handleRevokeTid = () => {
    //reason for revocation
    const reason = prompt("");

    //if no reason, exit
    if (!reason) return;

    //call triggerAction to revoke tid
    triggerAction("Revoking tid...", () => revokeTid(user.id, adminId, reason));
  };

  //function to handle suspending of user
  const handleSuspendUser = () => {
    //reason for suspension
    const reason = prompt("");

    //if no reason, exit
    if (!reason) return;

    //call triggerAction to suspend user
    triggerAction("Suspending user...", () =>
      suspendUser(user.id, adminId, reason),
    );
  };
  return (
    <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
      {/* 1. Header Metadata Section */}
      <div className="flex flex-col gap-2 border-b border-zinc-900 pb-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Account Control Node
            </span>
            <h3
              className="truncate font-mono text-lg font-bold text-white tracking-tight"
              title={user.email}
            >
              {user.email}
            </h3>
          </div>

          {/* Badges Container Block */}
          <div className="flex gap-2 shrink-0">
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-black uppercase border ${
                user.userType === "ATHLETE"
                  ? "bg-blue-950/40 text-blue-400 border-blue-900/40"
                  : "bg-purple-950/40 text-purple-400 border-purple-900/40"
              }`}
            >
              {user.userType}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                user.status === "VERIFIED"
                  ? "bg-emerald-950/60 text-emerald-400 border-emerald-900/40"
                  : user.status === "PENDING"
                    ? "bg-amber-950/60 text-amber-400 border-amber-900/40"
                    : user.status === "SUSPENDED"
                      ? "bg-rose-950/60 text-rose-400 border-rose-900/40"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Core Operational Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 py-5 border-b border-zinc-900">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
            Joined System
          </span>
          <span className="font-mono text-xs text-zinc-300">
            {user.joinedAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
            Last Active Trace
          </span>
          <span className="font-mono text-xs text-zinc-300">
            {user.lastActive
              ? user.lastActive.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Never Recorded"}
          </span>
        </div>
      </div>

      {/* 3. System Identity Identifier Tray */}
      <div className="my-5 rounded-xl border border-zinc-900 bg-zinc-900/20 p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            System T.ID Matrix
          </span>
          <span className="font-mono text-base font-black tracking-widest text-white mt-0.5">
            {user.tid ?? "UNASSIGNED"}
          </span>
        </div>
        {user.tid && (
          <div className="flex items-center gap-1.5 rounded-full bg-zinc-950 px-2.5 py-1 border border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
              Secure Node
            </span>
          </div>
        )}
      </div>

      {/* 4. Administrative Control Actions Row */}
      <div className="flex flex-wrap gap-2.5 pt-1">
        <button
          onClick={handleEditEmail}
          disabled={isPending}
          className="flex-1 min-w-[120px] rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-900 hover:text-white transition disabled:opacity-50"
        >
          ✏️ Edit Details
        </button>

        {user.tid && (
          <button
            onClick={handleRevokeTid}
            disabled={isPending}
            className="flex-1 min-w-[120px] rounded-lg border border-amber-900/30 bg-amber-950/20 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-950/40 transition disabled:opacity-50"
          >
            🚫 Revoke T.id
          </button>
        )}

        {user.status !== "SUSPENDED" && (
          <button
            onClick={handleSuspendUser}
            disabled={isPending}
            className="flex-1 min-w-[120px] rounded-lg border border-red-900/30 bg-red-950/20 py-2.5 text-xs font-bold text-red-400 hover:bg-red-950/40 transition disabled:opacity-50"
          >
            🔨 Suspend User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetailPanel;
