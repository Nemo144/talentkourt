"use client";

import { useState } from "react";
import { BadgeCheck, Clock } from "lucide-react";
import VerifiedBadgeFilter, {
  type FilterValue,
} from "@/components/VerifiedBadgeFilter";

type Athlete = {
  tid: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
  joinedAt: Date;
};

export default function AthleteDirectory({
  athletes,
}: {
  athletes: Athlete[];
}) {
  const [filter, setFilter] = useState<FilterValue>("ALL");

  const visible = athletes.filter((athlete) => {
    if (filter === "VERIFIED_ONLY") return athlete.status === "VERIFIED";
    if (filter === "UNVERIFIED_ONLY") return athlete.status !== "VERIFIED";
    return true;
  });

  return (
    <div className="space-y-5">
      <VerifiedBadgeFilter currentFilter={filter} onFilterChange={setFilter} />

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-10 text-center text-sm text-gray-400">
          No athletes match this filter yet.
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {visible.map((athlete, index) => {
            const verified = athlete.status === "VERIFIED";
            return (
              <li
                key={`${athlete.tid ?? "pending"}-${index}`}
                className="rounded-xl border border-gray-800 bg-gray-900/60 p-4"
              >
                <div className="flex items-center gap-2">
                  {verified ? (
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-400" />
                  )}
                  <span
                    className={`font-mono text-sm font-bold ${
                      verified ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {verified ? athlete.tid : "Awaiting verification"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Joined{" "}
                  {athlete.joinedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    timeZone: "UTC",
                  })}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
