"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import the router hook
import { approveUser, rejectUser } from "@/lib/actions/verification";

export default function ActionButtons({
  userId,
  userType,
}: {
  userId: string;
  userType: "ATHLETE" | "SCOUT";
}) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter(); // 2. Initialize the router instance

  const handleApprove = () => {
    setFeedback("Processing...");
    startTransition(async () => {
      const res = await approveUser(userId, userType);
      setFeedback(res.message);

      if (res.success) {
        // 3. Force Next.js to update the queue view data instantly
        router.refresh();
      }
    });
  };

  const handleReject = () => {
    const reason = prompt("Reason for rejection:");
    if (!reason) return;

    setFeedback("Processing...");
    startTransition(async () => {
      const res = await rejectUser(userId, reason);
      setFeedback(res.message);

      if (res.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {feedback && (
        <span className="text-xs font-mono text-orange-600 mr-2">
          {feedback}
        </span>
      )}
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={handleReject}
        disabled={isPending}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
