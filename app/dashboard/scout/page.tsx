import { redirect } from "next/navigation";
import { BadgeCheck, Clock, Lock } from "lucide-react";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import TIdBadge from "@/components/TIdBadge";
import NotificationCenter from "@/components/NotificationCenter";
import AthleteDirectory from "@/components/AthleteDirectory";

const statusStyles: Record<
  "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED",
  string
> = {
  VERIFIED: "border-emerald-900/50 bg-emerald-950/40 text-emerald-400",
  PENDING: "border-amber-900/50 bg-amber-950/40 text-amber-400",
  REJECTED: "border-red-900/50 bg-red-950/40 text-red-400",
  SUSPENDED: "border-rose-900/50 bg-rose-950/40 text-rose-400",
};

export default async function ScoutDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const scout = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      userType: true,
      status: true,
      tid: true,
      joinedAt: true,
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

  if (!scout) redirect("/sign-in");
  if (scout.userType === "ADMIN") redirect("/admin");
  if (scout.userType === "ATHLETE") redirect("/dashboard/player");

  // Only verified scouts can browse the athlete directory
  const canBrowse = scout.status === "VERIFIED";

  const athletes = canBrowse
    ? await prisma.user.findMany({
        where: { userType: "ATHLETE", status: { in: ["PENDING", "VERIFIED"] } },
        orderBy: { joinedAt: "desc" },
        take: 50,
        select: { tid: true, status: true, joinedAt: true },
      })
    : [];

  const [verifiedCount, pendingCount] = canBrowse
    ? await Promise.all([
        prisma.user.count({
          where: { userType: "ATHLETE", status: "VERIFIED" },
        }),
        prisma.user.count({
          where: { userType: "ATHLETE", status: "PENDING" },
        }),
      ])
    : [0, 0];

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

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
              <p className="text-sm font-semibold">{scout.email}</p>
              <span
                className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${statusStyles[scout.status]}`}
              >
                {scout.status}
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
          <section className="space-y-6 lg:col-span-4">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Your T.id</h2>
              <TIdBadge
                tid={scout.tid}
                status={scout.status}
                joinedAt={scout.joinedAt}
              />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-bold">Notifications</h2>
              <NotificationCenter notifications={scout.notifications} />
            </div>
          </section>

          <section className="space-y-6 lg:col-span-8">
            <h2 className="text-xl font-bold">Athlete directory</h2>

            {canBrowse ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BadgeCheck className="h-4 w-4 text-emerald-400" />
                      Verified athletes
                    </div>
                    <p className="mt-2 text-3xl font-bold">{verifiedCount}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4 text-amber-400" />
                      Awaiting verification
                    </div>
                    <p className="mt-2 text-3xl font-bold">{pendingCount}</p>
                  </div>
                </div>

                <AthleteDirectory athletes={athletes} />
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-10 text-center">
                <Lock className="mx-auto h-6 w-6 text-gray-500" />
                <p className="mt-3 text-sm text-gray-300">
                  The athlete directory is available to verified scouts.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Once an admin approves your account, it unlocks here.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
