import React from "react";
import { requireAdmin } from "@/lib/auth/adminMiddleware";
import {
  getUserMetrics,
  getDailySignUps,
  getContentMetrics,
  getModerationMetrics,
  getTidMetrics,
} from "@/lib/services/analyticsService";
import MetricsCard from "@/components/admin/MetricsCard";
import Charts from "@/components/admin/Charts";

const Page = async () => {
  //halt execution immediately if active session is not a verified administrator
  await requireAdmin();

  //fetch all five analytical services concurrently to minimize system load-time latency
  const [
    userMetrics,
    dailySignups,
    contentMetrics,
    moderationMetrics,
    tidMetrics,
  ] = await Promise.all([
    getUserMetrics(),
    getDailySignUps(30),
    getContentMetrics(),
    getModerationMetrics(),
    getTidMetrics(),
  ]);

  //destructure response data payloads with secure string fallbacks if a service catch-block executes
  const userMetricsData =
    userMetrics.success && userMetrics.data
      ? userMetrics.data
      : {
          totalUsers: 0,
          byUserType: { ATHLETE: 0, SCOUT: 0, ADMIN: 0 },
          byStatus: { PENDING: 0, VERIFIED: 0, REJECTED: 0, SUSPENDED: 0 },
        };

  const dailySignupsData =
    dailySignups.success && dailySignups.data ? dailySignups.data : [];

  const contentMetricsData =
    contentMetrics.success && contentMetrics.data
      ? contentMetrics.data
      : {
          totalContent: 0,
          byType: { VIDEO: 0, MESSAGE: 0, PROFILE: 0 },
          byStatus: { ACTIVE: 0, REMOVED: 0, UNDER_REVIEW: 0 },
        };

  const moderationMetricsData =
    moderationMetrics.success && moderationMetrics.data
      ? moderationMetrics.data
      : {
          totalActionsExecuted: 0,
          byAction: { APPROVED: 0, REMOVED: 0, WARNED: 0 },
        };

  const tidMetricsData =
    tidMetrics.success && tidMetrics.data
      ? tidMetrics.data
      : { totalTids: 0, byPrefix: { ATH: 0, SCT: 0 } };

  //adapting the user distribution for the pie chart
  const pieChartData = [
    { name: "ATHLETE", value: userMetricsData?.byUserType.ATHLETE },
    { name: "SCOUT", value: userMetricsData?.byUserType.SCOUT },
    { name: "ADMIN", value: userMetricsData?.byUserType.ADMIN },
  ];

  return (
    <div className="min-h-screen bg-black p-6 space-y-8 text-white max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          System Analytics
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Real-time status overview of platform users, assets, and operational
          logs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricsCard
          label="Total Registered Users"
          value={userMetricsData.totalUsers}
          description={`${userMetricsData.byStatus.PENDING} pending profiles requiring approval`}
        />
        <MetricsCard
          label="Issued System T.IDs"
          value={tidMetricsData.totalTids}
          description={`ATH: ${tidMetricsData.byPrefix.ATH} | SCT: ${tidMetricsData.byPrefix.SCT}`}
        />
        <MetricsCard
          label="Tracked Media Assets"
          value={contentMetricsData.totalContent}
          description={`${contentMetricsData.byStatus.UNDER_REVIEW} items inside the active moderation loop`}
        />
        <MetricsCard
          label="Enforcement Logs"
          value={moderationMetricsData.totalActionsExecuted}
          description={`Warnings issued: ${moderationMetricsData.byAction.WARNED}`}
        />
      </div>

      <div className="w-full">
        <Charts signupData={dailySignupsData} userTypeData={pieChartData} />
      </div>
    </div>
  );
};

export default Page;
