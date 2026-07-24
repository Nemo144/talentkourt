import { ContentStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import React from "react";

const FlaggedContent = async () => {
  //fetch the under-review content
  const flaggedContent = await prisma.content.findMany({
    where: { status: "UNDER_REVIEW" as ContentStatus },
    include: {
      flags: true,
      user: {
        select: { email: true, userType: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return (
    <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-wide">
          Moderation Feed
        </h2>
        <p className="text-xs text-zinc-500">
          Review content items flagged by community members for policy
          violations.
        </p>
      </div>

      {flaggedContent.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-zinc-900 rounded-xl text-zinc-600 bg-zinc-950/40">
          No content items are currently flagged or under review.
        </div>
      ) : (
        <div className="space-y-6">
          {flaggedContent.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 transition-all hover:border-zinc-800"
            >
              {/* Header Info Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Posted By
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm font-semibold text-zinc-200">
                      {item.user.email}
                    </span>
                    <span className="rounded bg-zinc-800 border border-zinc-700/60 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-zinc-400">
                      {item.user.userType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-amber-950/50 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-900/40">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {item.flags.length}{" "}
                    {item.flags.length === 1 ? "Flag" : "Flags"}
                  </span>
                  {/* Passes necessary identifiers down to the action triggers component */}
                  {/* <FlaggedRowActions contentId={item.id} userId={item.userId} /> */}
                </div>
              </div>

              {/* Resource Pointer Body Section */}
              <div className="py-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
                  Content Meta Type: {item.type}
                </span>
                {item.referenceUrl ? (
                  <div className="rounded-lg bg-zinc-950 border border-zinc-900 p-3 font-mono text-xs text-zinc-400 truncate">
                    <span className="text-zinc-600 block text-[9px] font-bold uppercase tracking-wider mb-1">
                      Resource URL / Pointer:
                    </span>
                    <a
                      href={item.referenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {item.referenceUrl}
                    </a>
                  </div>
                ) : (
                  <p className="text-sm italic text-zinc-600">
                    No external reference payload saved.
                  </p>
                )}
              </div>

              {/* Flag Breakdown Timelines */}
              <div className="mt-2 rounded-xl bg-zinc-950/80 border border-zinc-900 p-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Flag Activity Log
                </span>
                <div className="space-y-3 divide-y divide-zinc-900">
                  {item.flags.map((flag) => (
                    <div
                      key={flag.id}
                      className="pt-2.5 first:pt-0 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-zinc-500 font-mono">
                          Flag ID Reference: {flag.id}
                        </span>
                        <span className="text-zinc-600 font-mono">
                          {flag.createdAt.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 bg-zinc-900/40 p-2 rounded border border-zinc-900/60 mt-1">
                        {flag.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlaggedContent;
