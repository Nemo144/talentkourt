import React from "react";
import { prisma } from "@/lib/prisma";
// import ActionButtons from "./ActionButtons"

export default async function VerificationQueue() {
  //fetch pending users from db
  const pendingUsers = await prisma.user.findMany({
    where: {
      status: "PENDING",
      userType: {
        in: ["ATHLETE", "SCOUT"],
      },
    },
    select: {
      id: true,
      email: true,
      userType: true,
      joinedAt: true,
    },
    orderBy: {
      joinedAt: "asc", //oldest pending verification bubble to the top
    },
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Verification Queue</h1>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed rounded-lg bg-gray-50 text-gray-400">
          No pending users requiring verification at this time
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">User Type</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingUsers.map((user) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={user.id}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.userType === "ATHLETE"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.joinedAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="mr-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
