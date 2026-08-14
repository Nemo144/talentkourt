import React from "react";

//timeline data shape props
export interface TimelineEvent {
  id: string;
  verifiedAt: Date | string;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
  notes?: string | null;
}

export interface VerificationTimelineProps {
  logs: TimelineEvent[];
  joinedAt: Date | string;
}

const VerificationTimeLine: React.FC<VerificationTimelineProps> = ({
  logs,
  joinedAt,
}) => {
  //Format a unified chronological stream sorting oldest to newest
  const timelineEvents = [
    {
      id: "genesis",
      timestamp: new Date(joinedAt),
      title: "Account Created",
      description:
        "Welcome to the Court of Talents. Profile initialization complete.",
      type: "GENESIS",
    },
  ];

  //push mapped logs into the array
  if (Array.isArray(logs)) {
    logs.forEach((log) => {
      timelineEvents.push({
        id: log.id,
        timestamp: new Date(log.verifiedAt),
        title:
          log.verificationStatus === "VERIFIED"
            ? "Verification Approved"
            : log.verificationStatus === "REJECTED"
              ? "Submission Declined"
              : log.verificationStatus === "SUSPENDED"
                ? "Account Suspended"
                : "Submitted for Review",
        description: log.notes || "System evaluation status updated.",
        type: log.verificationStatus,
      });
    });
  }

  //chronological sorting execution
  timelineEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
          Verification History
        </h3>
        <p className="text-xs text-zinc-500">
          Chronological timeline of system identification checkpoints.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 pl-6 space-y-6">
        {timelineEvents.map((event) => {
          const isVerified = event.type === "VERIFIED";
          const isRejected = event.type === "REJECTED";
          const isSuspended = event.type === "SUSPENDED";

          return (
            <div key={event.id} className="relative group">
              <span
                className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border bg-zinc-950 transition-all duration-300 ${
                  isVerified
                    ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] bg-emerald-500/20"
                    : isRejected
                      ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                      : isSuspended
                        ? "border-rose-600 animate-pulse bg-rose-950"
                        : event.type === "GENESIS"
                          ? "border-blue-500"
                          : "border-zinc-700"
                }`}
              />

              <div className="flex flex-col gap-1 rounded-lg border border-zinc-900 bg-zinc-900/10 p-3.5 hover:border-zinc-800 transition">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span
                    className={`font-bold tracking-wide uppercase ${
                      isVerified
                        ? "text-emerald-400"
                        : isRejected
                          ? "text-red-400"
                          : isSuspended
                            ? "text-rose-500"
                            : "text-zinc-200"
                    }`}
                  >
                    {event.title}
                  </span>

                  <span className="font-mono text-[10px] text-zinc-500 shrink-0">
                    {event.timestamp.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                  {event.description}
                </p>

                {isVerified && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 w-max text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
                    ✨ Unique System T.ID Online
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationTimeLine;
