import React from "react";
import { requireAdmin } from "@/lib/auth/adminMiddleware";
import { auth } from "@/auth";
import { getAllConfigs } from "@/lib/actions/settings";
import SettingsForm from "@/components/admin/SettingsForm";
import { redirect } from "next/navigation";
import { Sliders } from "lucide-react";

export default async function AdminSettingsPage() {
  //Terminate execution instantly if the active session is not a verified admin role
  await requireAdmin();

  //Fetch the current active admin's authentication session context safely
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  //Compile all configuration records out of the database registry pipeline [INDEX]
  const configResponse = await getAllConfigs();

  if (!configResponse.success || !configResponse.data) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-mono text-xs">
        <div className="text-red-500 font-bold mb-2">
          ❌ Registry Execution Error
        </div>
        <p className="text-zinc-500 max-w-md text-center leading-relaxed">
          {configResponse.message ||
            "Failed to assemble system configuration catalog properties."}
        </p>
      </div>
    );
  }

  //Clean structural date objects down into iso parameters to protect hydration bounds if necessary
  const normalizedConfigs = configResponse.data.map((config) => ({
    ...config,
    // Safely cast or explicitly transform date bounds to support static tree comparisons
    updatedAt:
      config.updatedAt instanceof Date
        ? config.updatedAt.toISOString()
        : config.updatedAt,
  }));

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Institutional Settings
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Global system engine settings controls panel targeting runtime flag
            overrides and platform constraints.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-1.5 w-max font-mono text-[10px] text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Session Secure: {session.user.email}</span>
        </div>
      </div>

      <div className="w-full">
        <SettingsForm
          configs={normalizedConfigs}
          currentAdminId={session.user.id}
        />
      </div>
    </div>
  );
}
