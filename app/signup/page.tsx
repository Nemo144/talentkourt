"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Play } from "lucide-react";
import { registerUser } from "@/lib/actions/auth";

type UserType = "ATHLETE" | "SCOUT";

const inputClass =
  "w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition";

const SignupPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("ATHLETE");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await registerUser(email, password, userType);
      setMessage({ text: res.message, ok: res.success });
      if (res.success) {
        setTimeout(() => router.push("/sign-in"), 1500);
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition"
            >
              <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" fill="white" />
              </span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                TalentCourt
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create your account
            </h2>
            <p className="text-gray-400 text-sm">
              New accounts are reviewed by an admin before they are verified.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="block text-white text-xs font-bold mb-2 uppercase tracking-wider">
                I am a
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(["ATHLETE", "SCOUT"] as const).map((type) => (
                  <label
                    key={type}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-bold transition ${
                      userType === type
                        ? "border-orange-500 bg-orange-500/10 text-orange-400"
                        : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={userType === type}
                      onChange={() => setUserType(type)}
                      className="sr-only"
                    />
                    {type === "ATHLETE" ? "Athlete" : "Scout"}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 text-orange-500 bg-gray-800 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-gray-400 text-sm cursor-pointer leading-tight"
              >
                I understand this is a demo project and my account may be
                removed.
              </label>
            </div>

            {message && (
              <p
                className={`text-sm ${message.ok ? "text-emerald-400" : "text-red-400"}`}
                role="status"
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={!agreed || isPending}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isPending ? "Creating account..." : "Register Now"}
            </button>

            <p className="text-center text-gray-400 text-sm pt-2">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
