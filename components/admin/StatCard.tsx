import React from "react";

//type def for the stat card props
interface StatCardProps {
  label: string;
  value: string | number;
  trend: {
    value: string | number;
    label: string;
    isPositive: boolean;
  };
  icon: React.ComponentType<{ className: string }>;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
}) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col gap-3 border border-[#252525]">
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-sm">{label}</span>
        <Icon className="text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-white text-3xl font-bold">{value}</h3>

        <p className="mt-1 flex items-center gap-1">
          <span
            className={
              trend.isPositive
                ? "text-green-400 text-sm"
                : "text-red-400 text-sm"
            }
          >
            {trend.value}
          </span>

          <span className="text-slate-500 dark:text-slate-400">
            {trend.label}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;
