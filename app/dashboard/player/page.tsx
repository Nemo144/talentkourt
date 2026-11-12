import { redirect } from "next/navigation";
import { Play } from "lucide-react";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import TIdBadge from "@/components/TIdBadge";
import VerificationTimeline from "@/components/VerificationTimeline";
import NotificationCenter from "@/components/NotificationCenter";

const statusStyles: Record<
  "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED",
  string
> = {
  VERIFIED: "border-emerald-900/50 bg-emerald-950/40 text-emerald-400",
  PENDING: "border-amber-900/50 bg-amber-950/40 text-amber-400",
  REJECTED: "border-red-900/50 bg-red-950/40 text-red-400",
  SUSPENDED: "border-rose-900/50 bg-rose-950/40 text-rose-400",
};

export default async function PlayerDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      userType: true,
      status: true,
      tid: true,
      joinedAt: true,
      verificationsReceived: {
        orderBy: { verifiedAt: "asc" },
        select: {
          id: true,
          verifiedAt: true,
          verificationStatus: true,
          notes: true,
        },
      },
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          content: true,
          type: true,
          isRead: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) redirect("/sign-in");
  if (user.userType === "ADMIN") redirect("/admin");
  if (user.userType === "SCOUT") redirect("/dashboard/scout");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  const memberSince = user.joinedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-xl">
              🏆
            </span>
            <span className="hidden bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-2xl font-bold text-transparent sm:block">
              TalentCourt
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.email}</p>
              <span
                className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${statusStyles[user.status]}`}
              >
                {user.status}
              </span>
            </div>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-gray-500 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-4">
            <h2 className="text-lg font-bold">Your T.id</h2>
            <TIdBadge
              tid={user.tid}
              status={user.status}
              joinedAt={user.joinedAt}
            />

            <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5 text-sm">
              <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-gray-500">
                Account
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Email</dt>
                  <dd className="truncate font-mono text-gray-200">
                    {user.email}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Account type</dt>
                  <dd className="font-mono text-gray-200">Athlete</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Member since</dt>
                  <dd className="font-mono text-gray-200">{memberSince}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="space-y-6 lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Play className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">My Videos</h2>
              </div>
              <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-10 text-center text-sm text-gray-400">
                Video uploads are coming soon. TalentCourt is still in
                development.
              </div>
            </div>

            <VerificationTimeline
              logs={user.verificationsReceived}
              joinedAt={user.joinedAt}
            />
          </section>

          <section className="lg:col-span-3">
            <h2 className="mb-4 text-lg font-bold">Notifications</h2>
            <NotificationCenter notifications={user.notifications} />
          </section>
        </div>
      </main>
    </div>
  );
}
