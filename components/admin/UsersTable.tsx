import { prisma } from "@/lib/prisma";

export default async function UsersTable() {
  //fetch all system users directly from the db on the server
  const users = await prisma.user.findMany({
    orderBy: {
      joinedAt: "desc", //newest accounts display first
    },
    select: {
      id: true,
      email: true,
      userType: true,
      status: true,
      tid: true,
      joinedAt: true,
    },
  });

  return (
    <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-900 shadow-2xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">
          User Directory
        </h2>
        <p className="text-xs text-zinc-500">
          Manage global system accounts, verification status, and credentials.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-900">
        <table className="min-w-full divide-y divide-zinc-900 text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900/50 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-6 py-4.5">Email Address</th>
              <th className="px-6 py-4.5">Account Type</th>
              <th className="px-6 py-4.5">Verification Status</th>
              <th className="px-6 py-4.5">System T.ID</th>
              <th className="px-6 py-4.5">Join Date</th>
              <th className="px-6 py-4.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 bg-zinc-950/40">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-zinc-500 font-medium"
                >
                  No accounts found in the database.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-900/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-zinc-200 group-hover:text-white transition">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${
                        user.userType === "ATHLETE"
                          ? "bg-blue-950/60 text-blue-400 border border-blue-900/50"
                          : user.userType === "SCOUT"
                            ? "bg-purple-950/60 text-purple-400 border border-purple-900/50"
                            : "bg-zinc-800/60 text-zinc-400 border border-zinc-700/50"
                      }`}
                    >
                      {user.userType === "ATHLETE"
                        ? "⭐ Athlete"
                        : user.userType === "SCOUT"
                          ? "🔍 Scout"
                          : "🛡️ Admin"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.status === "VERIFIED"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900/30"
                          : user.status === "PENDING"
                            ? "bg-amber-950 text-amber-400 border border-amber-900/30"
                            : user.status === "SUSPENDED"
                              ? "bg-rose-950 text-rose-400 border border-rose-900/30"
                              : "bg-zinc-900 text-zinc-500"
                      } border`}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          user.status === "VERIFIED"
                            ? "bg-emerald-400"
                            : user.status === "PENDING"
                              ? "bg-amber-400"
                              : user.status === "SUSPENDED" // ✅ FIX: Added explicit conditional match
                                ? "bg-rose-400"
                                : "bg-zinc-500" // Fallback option
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-zinc-400">
                    {user.tid ? (
                      <span className="text-zinc-200 bg-zinc-900 px-2 py-1 rounded text-xs font-black tracking-wider">
                        {user.tid}
                      </span>
                    ) : (
                      <span className="text-zinc-600 text-xs italic">
                        — Unassigned
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                    {user.joinedAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
