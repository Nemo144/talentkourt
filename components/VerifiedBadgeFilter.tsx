"use client";

import React from "react";
import { CheckCircle, ShieldAlert, Users } from "lucide-react";

//explicit types for filter states
export type FilterValue = "ALL" | "VERIFIED_ONLY" | "UNVERIFIED_ONLY";

interface VerifiedBadgeFilterProps {
  currentFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

const VerifiedBadgeFilter: React.FC<VerifiedBadgeFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  //structural metadata configuration for the button group option options
  const filterOptions = [
    {
      id: "ALL" as FilterValue,
      label: "All Athletes",
      icon: Users,
      activeClass: "bg-zinc-800 text-white border-zinc-700",
    },
    {
      id: "VERIFIED_ONLY" as FilterValue,
      label: "Verified Only",
      icon: CheckCircle,
      activeClass: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    },
    {
      id: "UNVERIFIED_ONLY" as FilterValue,
      label: "Unverified Only",
      icon: ShieldAlert,
      activeClass: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Label context helper descriptor */}
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-1">
        Filter Passport Status
      </span>

      {/* Button Row Toggle Enclosure */}
      <div className="inline-flex flex-wrap items-center gap-2 rounded-xl bg-zinc-950/60 p-1.5 border border-zinc-900 w-max">
        {filterOptions.map((option) => {
          const IconComponent = option.icon;
          const isActive = currentFilter === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-transparent active:scale-95 ${
                isActive
                  ? option.activeClass
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
              }`}
            >
              <IconComponent
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isActive && option.id === "VERIFIED_ONLY"
                    ? "animate-pulse"
                    : ""
                }`}
              />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VerifiedBadgeFilter;
