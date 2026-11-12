import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import logo from "../public/tc.png";

const REPO_URL = "https://github.com/Nemo144/talentkourt";
const BLOG_URL = "https://nnamdisblog.hashnode.dev";
const LINKEDIN_URL = "https://www.linkedin.com/in/nnamdi144";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Reviewed before verified",
    text: "Nobody receives a badge until an admin has looked at their profile and approved it.",
  },
  {
    icon: BadgeCheck,
    title: "A unique T.id",
    text: "Approved athletes get an ID like ATH-00123, and scouts get one like SCT-00123, shown on their profile.",
  },
  {
    icon: ScrollText,
    title: "Every decision on record",
    text: "Verifications, warnings, removals and suspensions are logged with who made the call and why.",
  },
];

const steps = [
  {
    title: "Create a profile",
    text: "Athletes and scouts set up an account and enter the verification queue.",
  },
  {
    title: "Get reviewed",
    text: "An admin reviews each profile and approves or rejects it, with a reason.",
  },
  {
    title: "Get verified",
    text: "Approved members receive a T.id, and scouts can filter for verified athletes.",
  },
];

const builtSoFar = [
  "Admin verification queue with T.id issuance",
  "Content moderation: flags, warnings, removals and suspensions",
  "User management and system settings",
  "Analytics dashboard with charts",
  "Notifications triggered by verification decisions",
  "Athlete and scout dashboards showing real verification status, T.ids and notifications",
];

const stack = [
  "Next.js",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "NextAuth",
  "Tailwind CSS",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="TalentCourt logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                TalentCourt
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#how" className="hidden hover:text-white sm:inline">
              How it works
            </a>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden hover:text-white sm:inline"
            >
              Build log
            </a>
            <Link
              href="/sign-in"
              className="rounded-lg border border-zinc-800 px-4 py-2 font-semibold text-white transition hover:border-zinc-600"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-900/50 bg-orange-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
            In development &middot; built in public
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Where emerging athletes meet scouts,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              with trust built in
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            TalentCourt is a sports talent discovery platform. Every athlete and
            scout is reviewed by an admin before they receive a unique T.id, so
            everyone on the platform knows who they are talking to.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-bold shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-red-700"
            >
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-800 px-6 py-3 font-bold text-zinc-200 transition hover:border-zinc-600 hover:text-white"
            >
              Read the build log
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-3 font-semibold text-zinc-400 transition hover:text-white"
            >
              View the code
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="text-center text-sm font-black uppercase tracking-widest text-zinc-500">
            Trust comes first
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6"
              >
                <div className="mb-4 inline-flex rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-orange-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="border-y border-zinc-900 bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-center text-3xl font-black tracking-tight">
              How it works
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 font-black">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                What is built so far
              </h2>
              <p className="mt-3 text-zinc-400">
                TalentCourt is a work in progress. This is where it stands
                today, and every step is written up in the build log.
              </p>
              <ul className="mt-6 space-y-3">
                {builtSoFar.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">
                Built with
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-zinc-400">
                One developer, writing the code with Claude as a mentor that
                explains and reviews. The design decisions, the mistakes and the
                fixes are all in the open.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
          <p>&copy; 2026 TalentCourt. Built by Nnamdi Okeke.</p>
          <div className="flex gap-6">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Blog
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
