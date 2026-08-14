import React from "react";

export interface TIdBadgeProps {
  tid?: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
  joinedAt: Date;
  onActionClick?: () => void; //optional callback for rejected state
}

const TidBadge: React.FC<TIdBadgeProps> = ({
  tid,
  status,
  joinedAt,
  onActionClick,
}) => {
  const memberSince = new Date(joinedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  if (status === "VERIFIED" && tid) {
    return (
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-500/30 bg-zinc-950 p-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/15 transition-all" />
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
              Verified Member
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1 border border-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">
                Active Node
              </span>
            </div>
          </div>

          <div className="my-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              TalentCourt Ident
            </span>
            <span className="font-mono text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
              {tid}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-900 pt-3 text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
            <span>Member Since</span>
            <span className="font-mono text-zinc-300">{memberSince}</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "PENDING") {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 border-dashed bg-zinc-950/40 p-6 text-left">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              System T.ID Badge
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-950/40 border border-amber-900/40 px-2 py-0.5 text-[10px] font-bold text-amber-400">
              <span className="h-1 w-1 rounded-full bg-amber-500 animate-ping" />
              Review Pending
            </span>
          </div>

          <div className="py-2">
            <span className="font-mono text-xl font-bold text-zinc-600 tracking-wide block select-none">
              XXX-XXXXX
            </span>
            <p className="text-xs text-zinc-500 mt-1">
              Your profile verification queue check is running. An administrator
              will assign your unique identifier shortly.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 text-[11px] text-zinc-600 font-medium uppercase tracking-wider">
            <span>Registered</span>
            <span className="font-mono text-zinc-500">{memberSince}</span>
          </div>
        </div>
      </div>
    );
  }

  //for the rejected or suspended state
  return (
    <div className="w-full max-w-sm rounded-2xl border border-red-950 bg-zinc-950 p-6 text-left shadow-[0_0_30px_rgba(239,68,68,0.02)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            System T.ID Badge
          </span>
          <span className="rounded-full bg-red-950/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-400 border border-red-900/40">
            {status === "SUSPENDED" ? "Suspended" : "Action Required"}
          </span>
        </div>

        <div>
          <span className="font-mono text-lg font-black text-red-500 uppercase tracking-tight">
            {status === "SUSPENDED"
              ? "Access Restricted"
              : "Verification Rejected"}
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            {status === "SUSPENDED"
              ? "This account parameter has been temporarily locked due to a system policy enforcement violation."
              : "Your identity verification token was declined. Please update your details to request access again."}
          </p>
        </div>

        {status === "REJECTED" && onActionClick && (
          <button
            onClick={onActionClick}
            className="w-full rounded-lg bg-red-600 py-2 text-center text-xs font-bold text-white shadow-lg shadow-red-950/30 hover:bg-red-500 transition-colors"
          >
            Re-submit Verification Credentials
          </button>
        )}
      </div>
    </div>
  );
};

export default TidBadge;
