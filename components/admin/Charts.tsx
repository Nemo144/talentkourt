"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ChartTooltipPayloadItem {
  name: string;
  value: number;
  color?: string;
  datakey?: string | number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string | number;
}

interface SignupData {
  date: string;
  count: number;
}

interface UserTypeData {
  name: string;
  value: number;
}

interface ChartsProps {
  signupData: SignupData[];
  userTypeData: UserTypeData[];
}

const COLORS = {
  ATHLETE: "#10b981",
  SCOUT: "#06b6d4",
  ADMIN: "#64748b",
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
        <p className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-sm font-black font-mono text-white">
          {payload[0].name}:{" "}
          <span className="text-emerald-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Main component declaration loop
export default function Charts({ signupData, userTypeData }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg flex flex-col h-[380px]">
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Daily Signups Over Time
          </h3>
          <p className="text-xs text-zinc-500">
            Chronological analysis of registration velocity.
          </p>
        </div>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={signupData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#18181b"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#52525b"
                tickLine={false}
                axisLine={false}
                dy={10}
                tick={{ fontSize: 11 }}
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return isNaN(date.getTime())
                    ? str
                    : date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      });
                }}
              />
              <YAxis
                stroke="#52525b"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fontSize: 11 }}
              />

              <Tooltip content={<CustomTooltip />} />
              <Line
                name="New Users"
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 1, r: 3 }}
                activeDot={{ r: 6, stroke: "#09090b", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg flex flex-col h-[380px]">
        <div className="mb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Account Type Breakdown
          </h3>
          <p className="text-xs text-zinc-500">
            Structural distribution of system roles.
          </p>
        </div>

        <div className="flex-1 w-full min-h-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userTypeData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {userTypeData.map((entry, index) => {
                  const colorKey = entry.name as keyof typeof COLORS;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[colorKey] || "#3f3f46"}
                    />
                  );
                })}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 shadow-xl font-mono text-xs text-zinc-200">
                        {payload[0].name}:{" "}
                        <span className="font-bold text-white">
                          {payload[0].value}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconSize={10}
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }}
                formatter={(value) => (
                  <span className="text-zinc-400 font-bold uppercase tracking-wide">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
