"use client";

import React, { useState, useTransition } from "react";
import { approveUser, rejectUser } from "@/lib/actions/verification";
import VerificationCard from "./VerificationCard";

interface VerifyUserModalProps {
  user: {
    id: string;
    email: string;
    userType: "ATHLETE" | "SCOUT";
    joinedAt: Date;
    tid?: string | null;
  };
  adminId: string;
  onClose: () => void;
}

const VerifyUserModal: React.FC<VerifyUserModalProps> = ({
  user,
  adminId,
  onClose,
}) => {
  //useTransition to keep the UI responsive while rendering heavy states in the background
  const [isPending, startTransition] = useTransition();

  //state to manage the rejection form
  const [showRejectForm, setShowRejectForm] = useState(false);

  //state to manage the rejection notes
  const [rejectionNotes, setRejectionNotes] = useState("");

  //function for verification approval
  const handleApproveAction = () => {
    startTransition(async () => {
      //fetch data from the approveUser file
      const response = await approveUser(user.id, adminId, user.userType);

      if (response.success) {
        alert("User Approved Successfully");
        onClose();
      } else {
        alert(`Approval failed: ${response.message}`);
      }
    });
  };

  //function for the verification rejection
  const handleRejectAction = (e: React.FormEvent) => {
    e.preventDefault();

    //if no rejection note is provided, provide it
    if (!rejectionNotes.trim()) {
      alert("Please provide a reason for the rejection");
      return;
    }

    startTransition(async () => {
      //fetch data from the rejectUser file
      const response = await rejectUser(user.id, adminId, rejectionNotes);

      if (response.success) {
        alert("User Rejected Successfully");
        onClose();
      } else {
        alert(`Rejection failed: ${response.message}`);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl animate-scale-up">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-900 pb-3">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Review Profile
          </h2>
          <button
            onClick={onClose}
            disabled={isPending}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 transition disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        <div className="mb-5">
          <VerificationCard user={user} />
        </div>

        {showRejectForm ? (
          <form
            onSubmit={handleRejectAction}
            className="space-y-4 animate-slide-down"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Reason for Rejection
              </label>
              <textarea
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                placeholder="Provide reasoning (e.g., missing credentials, invalid profile data...)"
                rows={3}
                disabled={isPending}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                disabled={isPending}
                className="flex-1 rounded-lg border border-zinc-800 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-900 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-500 shadow-lg shadow-red-950/20 transition disabled:opacity-50"
              >
                {isPending ? "Processing..." : "Confirm Rejection"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setShowRejectForm(true)}
              disabled={isPending}
              className="flex-1 rounded-lg border border-zinc-800 py-2.5 text-xs font-bold tracking-wide text-red-400 hover:bg-red-950/20 hover:border-red-900/50 transition disabled:opacity-50"
            >
              Reject Profile
            </button>
            <button
              onClick={handleApproveAction}
              disabled={isPending}
              className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/20 transition disabled:opacity-50"
            >
              {isPending ? "Approving..." : "Approve & Issue ID"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyUserModal;
