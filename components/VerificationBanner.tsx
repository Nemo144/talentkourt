"use client";

import React, { useState } from "react";

export interface VerificationBannerProps {
  status: "PENDING" | "REJECTED" | "UNVERIFIED";
  onCtaClick: () => void;
}

const VerificationBanner: React.FC<VerificationBannerProps> = ({
  status,
  onCtaClick,
}) => {
  //state to manage dismissal
  const [isDismissed, setIsDismissed] = useState(false);

  // If the user manually closed the banner or they are already pending review, return null
  if (isDismissed || status === "PENDING") return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all animate-fade-in group">
      <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all duration-500" />
      <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-emerald-500/80 via-emerald-600/30 to-transparent" />

      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 text-xs font-mono transition p-1 rounded hover:bg-zinc-900"
        title="Dismiss Alert"
      >
        ✕
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pr-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-900/60 px-2 py-0.5 rounded">
              Account Upgrade Available
            </span>
            {status === "REJECTED" && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-red-400 bg-red-950/30 border border-red-900/40 px-2 py-0.5 rounded">
                Action Required
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white tracking-wide">
            {status === "REJECTED"
              ? "Verification Revision Required"
              : "Unlock Your Professional Talent Profile"}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {status === "REJECTED"
              ? "Your previous verification submission could not be completed. Update your credentials now to clear restriction limits and establish system authority."
              : "Unverified accounts face discovery restrictions. Complete your identification passport to claim your permanent system T.ID and unlock premium features."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Scout Messaging</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Leaderboard Entry</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Verified Glow Badge</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto">
          <button
            onClick={onCtaClick}
            className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-950/30 hover:bg-emerald-500 active:scale-98 transition duration-200 tracking-wide uppercase"
          >
            {status === "REJECTED" ? "Update Credentials" : "Get Verified Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner;
