"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

// Note: In your actual Next.js project, use: import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);

    // TODO: Add your password reset API call here
    // Example: await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span className="text-sm font-medium">Back to Sign In</span>
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-8 shadow-2xl">
          {!isSubmitted ? (
            <>
              {/* Logo */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Sportss
                </span>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">
                  Forgot Password?
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No worries! Enter your email address and we&apos;ll send you
                  instructions to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Check Your Email
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                We&apos;ve sent password reset instructions to
              </p>
              <p className="text-orange-500 font-semibold mb-8">{email}</p>
              <p className="text-gray-400 text-xs mb-8">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-orange-500 hover:text-orange-400 font-semibold transition underline"
                >
                  try again
                </button>
              </p>

              <Link
                href="/signin"
                className="inline-block w-full bg-gray-800 border border-gray-700 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 transition"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Additional Help */}
        {!isSubmitted && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                Contact Support
              </Link>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600">
          © 2024 Sportss. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
