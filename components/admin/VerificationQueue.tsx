import { prisma } from "@/lib/prisma";
import ActionButtons from "./ActionButtons";

export default async function VerificationQueue() {
  const pendingUsers = await prisma.user.findMany({
    where: {
      status: "PENDING",
      userType: { in: ["ATHLETE", "SCOUT"] },
    },
    select: {
      id: true,
      email: true,
      userType: true,
      joinedAt: true,
    },
    orderBy: { joinedAt: "asc" }, // oldest first
    take: 50,
  });

  return (
    <div className="w-full rounded-xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl">
      <div className="mb-4">
        <h1 className="text-xl font-bold tracking-wide text-white">
          Verification Queue
        </h1>
        <p className="text-xs text-zinc-500">
          Review new accounts. Approving issues a T.id and notifies the member.
        </p>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-zinc-900 bg-zinc-950/40 p-12 text-center text-zinc-500">
          No pending users requiring verification at this time.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-900">
          <table className="min-w-full divide-y divide-zinc-900 text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/50 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">Account Type</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 bg-zinc-950/40">
              {pendingUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-zinc-900/30"
                >
                  <td className="px-6 py-4 font-medium text-zinc-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                        user.userType === "ATHLETE"
                          ? "border-blue-900/50 bg-blue-950/60 text-blue-400"
                          : "border-purple-900/50 bg-purple-950/60 text-purple-400"
                      }`}
                    >
                      {user.userType === "ATHLETE" ? "Athlete" : "Scout"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                    {user.joinedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      userId={user.id}
                      userType={user.userType as "ATHLETE" | "SCOUT"}
                    />
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
