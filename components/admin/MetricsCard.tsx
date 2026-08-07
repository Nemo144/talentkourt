import React from "react";

interface MetricsCardProp {
  label: string;
  value: string | number;
  description?: string;
}

const MetricsCard: React.FC<MetricsCardProp> = ({
  label,
  value,
  description,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg transition-all hover:border-zinc-700">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {label}
        </span>

        <span className="font-mono text-3xl font-black tracking-tight text-white">
          {value}
        </span>

        {description && (
          <p className="mt-1 text-xs text-zinc-400 font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
