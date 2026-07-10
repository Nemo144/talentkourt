import React from "react";

interface VerificationCardProps {
  user: {
    id: string;
    email: string;
    userType: "ATHLETE" | "SCOUT";
    joinedAt: Date;
    tid?: string | null;
  };
}

const VerificationCard: React.FC<VerificationCardProps> = ({ user }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl transition-all hover:border-zinc-700">
      <div
        className={`absolute top-0 left-0 h-1 w-full ${user.userType === "ATHLETE" ? "bg-emerald-500" : "bg-cyan-500"}`}
      />

      <div className="flex flex-col gap-4">
        {/* Card Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Account Identifier
            </span>
            <span
              className="font-mono text-sm font-semibold text-zinc-200 truncate max-w-[200px]"
              title={user.email}
            >
              {user.email}
            </span>
          </div>

          {/* Badge Wrapper mapping structural strings cleanly */}
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${
              user.userType === "ATHLETE"
                ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                : "bg-cyan-950/60 text-cyan-400 border border-cyan-800/50"
            }`}
          >
            {user.userType === "ATHLETE" ? "⭐ Athlete" : "🔍 Scout"}
          </span>
        </div>

        {user.tid ? (
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              System T.ID
            </span>
            <span className="font-mono text-base font-black tracking-wider text-white">
              {user.tid}
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-zinc-950 px-2.5 py-1 border border-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                Issued
              </span>
            </div>
          </div>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Pending Verification
          </span>
        )}

        <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="font-medium uppercase tracking-wider">
            Registration Date
          </span>
          <span className="font-mono text-zinc-400">
            {user.joinedAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
