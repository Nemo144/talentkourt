import { prisma } from "@/lib/prisma";
import {
  UserType,
  VerificationStatus,
  ContentType,
  ContentStatus,
  ModerationAction,
} from "../generated/prisma/enums";

//define the getUserMetrics(), Returns a high-level summary of total users alongside role and status distributions
export const getUserMetrics = async () => {
  try {
    //execute all aggregates at the same time to minimize db trip latency
    const [totalUsers, roleCounts, statusCounts] = await Promise.all([
      //fetch overall user totals
      prisma.user.count(),

      //group and count by usertype enum(ATH, SCT, ADMIN)
      prisma.user.groupBy({
        by: ["userType"],
        _count: { id: true },
      }),

      //group and count by VerificationStatus Enum(PENDING, VERIFIED etc)
      prisma.user.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    //format role counts into easily accessible object mapping
    const byUserType = {
      ATHLETE: roleCounts.find((r) => r.userType === "ATHLETE")?._count.id ?? 0,
      SCOUT: roleCounts.find((r) => r.userType === "SCOUT")?._count.id ?? 0,
      ADMIN: roleCounts.find((r) => r.userType === "ADMIN")?._count.id ?? 0,
    };

    //format status counts into an easily accessible object mapping
    const byStatus = {
      PENDING: statusCounts.find((s) => s.status === "PENDING")?._count.id ?? 0,
      VERIFIED:
        statusCounts.find((s) => s.status === "VERIFIED")?._count.id ?? 0,
      REJECTED:
        statusCounts.find((s) => s.status === "REJECTED")?._count.id ?? 0,
      SUSPENDED:
        statusCounts.find((s) => s.status === "SUSPENDED")?._count.id ?? 0,
    };

    return {
      success: true,
      data: {
        totalUsers,
        byUserType,
        byStatus,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user analytics metrics:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown analytics error occurred",
    };
  }
};

//getDailySignUps: returns registration aggregation trends over the last N days for analytics charting
export const getDailySignUps = async (days: number = 7) => {
  try {
    //calculate the threshold date boundary
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    //fetch user rows created within the targeted calender timebox
    const users = await prisma.user.findMany({
      where: {
        joinedAt: {
          gte: startDate,
        },
      },
      select: {
        joinedAt: true,
      },
      orderBy: {
        joinedAt: "asc",
      },
    });

    // Create a continuous dictionary timeline of all expected calendar days to avoid zero-signup gaps
    const dailyMap: Record<string, number> = {};

    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0]; //extracts "yyyy-mm-dd"
      dailyMap[dateString] = 0;
    }

    //populate the map with db entry frequencies
    users.forEach((user) => {
      const dateString = user.joinedAt.toISOString().split("T")[0];
      if (dateString in dailyMap) {
        dailyMap[dateString]++;
      }
    });

    //map back into orderedlist array
    const timeline = Object.entries(dailyMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)); //oldest to newest date

    return {
      success: true,
      data: timeline,
    };
  } catch (error) {
    console.error(
      `Failed to gather chronological signups for last ${days} days:`,
      error,
    );
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown timeline aggregation error occurred",
    };
  }
};

//getContentMetrics returns a high-performance breakdown of system content by type and moderation status
export const getContentMetrics = async () => {
  try {
    //execute both aggregations at the same time to eliminate sequential waiting delays
    const [typeCounts, statusCounts] = await Promise.all([
      //group and count by content type
      prisma.content.groupBy({
        by: ["type"],
        _count: { id: true },
      }),

      //group and count by content status
      prisma.content.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    //Format content type counts into a clean, predictable object map
    const byType = {
      VIDEO: typeCounts.find((t) => t.type === "VIDEO")?._count.id ?? 0,
      MESSAGE: typeCounts.find((t) => t.type === "MESSAGE")?._count.id ?? 0,
      PROFILE: typeCounts.find((t) => t.type === "PROFILE")?._count.id ?? 0,
    };

    //Format content status counts into a clean, predictable object map
    const byStatus = {
      ACTIVE: statusCounts.find((s) => s.status === "ACTIVE")?._count.id ?? 0,
      REMOVED: statusCounts.find((s) => s.status === "REMOVED")?._count.id ?? 0,
      UNDER_REVIEW:
        statusCounts.find((s) => s.status === "UNDER_REVIEW")?._count.id ?? 0,
    };

    return {
      success: true,
      data: {
        byType,
        byStatus,
        totalContent:
          byStatus.ACTIVE + byStatus.REMOVED + byStatus.UNDER_REVIEW,
      },
    };
  } catch (error) {
    console.error("Failed to fetch system content metrics:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown content analytics error occurred",
    };
  }
};

//getModerationMetrics() returns a breakdown of all historical actions taken by the moderation team
export const getModerationMetrics = async () => {
  try {
    //group and count log rows by moderatio actions enum
    const actionCounts = await prisma.moderationLog.groupBy({
      by: ["action"],
      _count: { id: true },
    });

    //format the group array data into a clean, predictable key-value object map
    const byAction = {
      APPROVED:
        actionCounts.find((a) => a.action === "APPROVED")?._count.id ?? 0,
      REMOVED: actionCounts.find((a) => a.action === "REMOVED")?._count.id ?? 0,
      WARNED: actionCounts.find((a) => a.action === "WARNED")?._count.id ?? 0,
    };

    return {
      success: true,
      data: {
        byAction,
        totalActionsExecuted:
          byAction.APPROVED + byAction.REMOVED + byAction.WARNED,
      },
    };
  } catch (error) {
    console.error("Failed to fetch historical moderation metrics:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown moderation analytics error occurred",
    };
  }
};
