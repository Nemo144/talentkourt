"use client";

import React, { useTransition } from "react";
import {
  approveContent,
  removeContent,
  warnUser,
} from "@/lib/actions/moderation";
import { useSession } from "next-auth/react";

interface ModerationActionProps {
  contentId: string;
  userId: string;
}

const ModerationAction = ({ contentId }: ModerationActionProps) => {
  //useTransition to prevent UI blocking by handling server action states
  //at the same time without a manual loading spinner state
  const [isPending, startTransition] = useTransition();

  //useSession to manage the adminId's session
  const { data: session } = useSession();

  const adminId = session?.user.id ?? "";

  //function to trigger async actions form the server(approveContent, removeContent, warnUser)
  const executeAction = (
    actionName: string,
    actionFn: () => Promise<{ success: boolean; message: string }>,
  ) => {
    //wrap the execution inside react's transition engine,
    //component automatically pending, panel buttons disabled until db update is done
    startTransition(async () => {
      const res = await actionFn();
      alert(res.message);
    });
  };

  //function to handle content approval
  const handleApprove = () => {
    executeAction("Approving Content", () =>
      approveContent(adminId, contentId, "ADMIN"),
    );
  };

  //function to handle content removal
  const handleRemove = () => {
    const reason = prompt("Reason for removal:");

    if (!reason) return;

    executeAction("Removing Content", () =>
      removeContent(adminId, contentId, "ADMIN", reason),
    );
  };

  //function to handle warning of users
  const handleWarnUser = () => {
    const notes = prompt("Warning message to user");

    if (!notes) return;

    const isSevere = confirm(
      "Is this violation severe enough to trigger an automatic 7-day account suspension?",
    );

    executeAction("Issuing User Warning", () =>
      warnUser({
        adminId,
        contentId,
        notes,
        isSevere,
        suspensionDurationDays: 7,
      }),
    );
  };
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="rounded bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900/30 transition disabled:opacity-40"
      >
        Approve
      </button>

      <button
        onClick={handleRemove}
        disabled={isPending}
        className="rounded bg-red-950/40 border border-red-900/60 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/30 transition disabled:opacity-40"
      >
        Remove Content
      </button>

      <button
        onClick={handleWarnUser}
        disabled={isPending}
        className="rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 text-xs font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white transition disabled:opacity-40"
      >
        ⚠️ Warn User
      </button>
    </div>
  );
};

export default ModerationAction;
