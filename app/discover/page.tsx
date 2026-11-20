import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export const metadata = {
  title: "Discover | TalentCourt",
  description: "Search for verified athletes by sport and skill. Coming soon.",
};

export default function DiscoverPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900/50 p-10 text-center shadow-2xl backdrop-blur-lg">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-orange-500">
          <Search className="h-6 w-6" />
        </span>
        <h1 className="text-3xl font-bold">Discover is coming soon</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          Search by sport and skill is still being built. For now, verified
          scouts can browse the athlete directory from their dashboard.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-gray-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/sign-in"
            className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 text-sm font-bold transition hover:from-orange-600 hover:to-red-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
