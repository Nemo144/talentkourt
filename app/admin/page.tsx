import React from "react";
import { Users, UserCheck, Clock, Search } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { requireAdmin } from "@/lib/auth/adminMiddleware";
import { getUserMetrics } from "@/lib/services/analyticsService";

const AdminDashboard = async () => {
  await requireAdmin();

  const result = await getUserMetrics();
  const data = result.success ? result.data : undefined;

  const total = data?.totalUsers ?? 0;
  const athletes = data?.byUserType.ATHLETE ?? 0;
  const scouts = data?.byUserType.SCOUT ?? 0;
  const pending = data?.byStatus.PENDING ?? 0;

  return (
    <div className="flex-1 p-6 space-y-6 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-400">Overview and Analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={total}
          trend={{
            value: String(total),
            label: "registered accounts",
            isPositive: true,
          }}
          icon={Users}
        />
        <StatCard
          label="Total Athletes"
          value={athletes}
          trend={{
            value: String(athletes),
            label: "athlete accounts",
            isPositive: true,
          }}
          icon={UserCheck}
        />
        <StatCard
          label="Total Scouts"
          value={scouts}
          trend={{
            value: String(scouts),
            label: "scout accounts",
            isPositive: true,
          }}
          icon={Search}
        />
        <StatCard
          label="Pending Verification"
          value={pending}
          trend={{
            value: pending > 0 ? "Needs review" : "All clear",
            label: "",
            isPositive: pending === 0,
          }}
          icon={Clock}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
