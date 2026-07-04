import React from "react";
import { Users, UserCheck, Clock, Search } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

const AdminDashboard = () => {
  const stats = {
    totalUsers: 1240,
    totalAthletes: 980,
    totalScouts: 260,
    pendingVerification: 34,
  };
  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Admin DashBoard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Overview and Analytics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          trend={{ value: "+4.5%", label: "vs last Month", isPositive: true }}
          icon={Users}
        />

        <StatCard
          label="Total Athletes"
          value={stats.totalAthletes}
          trend={{ value: "+12%", label: "vs last week", isPositive: true }}
          icon={UserCheck}
        />

        <StatCard
          label="Total Scouts"
          value={stats.totalScouts}
          trend={{ value: "-2%", label: "vs last week", isPositive: false }}
          icon={Search}
        />

        <StatCard
          label="Pending Verification"
          value={stats.pendingVerification}
          trend={{ value: "8 urgent", label: "review", isPositive: false }}
          icon={Clock}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
