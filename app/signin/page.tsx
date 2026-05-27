"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const stats = [
    { number: "5,000+", label: "SCOUTS", color: "from-orange-500 to-red-600" },
    {
      number: "10,000+",
      label: "ATHLETES",
      color: "from-orange-500 to-red-600",
    },
    { number: "25+", label: "SPORTS", color: "from-orange-500 to-red-600" },
    { number: "500+", label: "TEAMS", color: "from-orange-500 to-red-600" },
  ];

  const sportsIcons = ["⚽", "⚾", "🏀", "🏈", "🏐", "🎾", "🏒", "🥊"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", formData);
    // TODO: Add your authentication API call here
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Stats & Testimonial (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center"> */}
              <Link
                href="/"
                className="flex items-center gap-2 mb-3 hover:opacity-80 transition"
              >
                <span className="text-2xl">🏆</span>
                {/* </div> */}
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  TalentCourt
                </span>
              </Link>
            </div>

            <div className="text-gray-400 text-sm mb-8">
              Connect with professional opportunities across all sports
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-white mb-12 leading-tight">
              Join thousands of athletes
              <br />
              who found opportunities
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-red-950/30 to-orange-950/30 backdrop-blur border border-red-900/30 rounded-2xl p-6"
                >
                  <div
                    className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-semibold tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border-l-4 border-orange-500 pl-6 py-4 bg-gradient-to-r from-orange-950/20 to-transparent rounded-r-lg">
              <p className="text-gray-300 italic mb-4 leading-relaxed">
                &quot;TalentCourt connected me with scouts from top
                universities. Within months, I received offers from programs
                I&apos;d always dreamed about.&quot;
              </p>
              <p className="text-gray-400 text-sm">
                — Marcus Johnson, Professional Basketball Player
              </p>
            </div>
          </div>

          {/* Sports Icons */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {sportsIcons.map((icon, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gradient-to-br from-red-950/30 to-orange-950/30 border border-red-900/30 rounded-xl flex items-center justify-center text-3xl hover:scale-105 transition cursor-pointer"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <Link
                href="/"
                className="flex items-center gap-2 mb-3 hover:opacity-80 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  TalentCourt
                </span>
              </Link>
              <p className="text-gray-400 text-sm text-center">
                Connect with professional opportunities across all sports
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 lg:mb-6 hover:text-orange-500 transition cursor-pointer">
                <Link href="/">Welcome Back</Link>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider"
                  >
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      id="email"
                      type="text"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberMe: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900 bg-gray-800 cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-400 text-sm cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-orange-500 hover:text-orange-400 text-sm font-semibold transition"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition shadow-lg hover:shadow-orange-500/25 uppercase tracking-wider"
                >
                  Sign In
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/50 text-gray-400">
                      OR
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl py-3 hover:bg-gray-700/50 transition flex items-center justify-center"
                  >
                    <span className="text-xl">G</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Apple")}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl py-3 hover:bg-gray-700/50 transition flex items-center justify-center"
                  >
                    <span className="text-xl"></span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Facebook")}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl py-3 hover:bg-gray-700/50 transition flex items-center justify-center"
                  >
                    <span className="text-xl">f</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/signup"
                      className="text-orange-500 hover:text-orange-400 font-semibold transition"
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Footer Links - Mobile Only */}
            <div className="lg:hidden mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <a href="/privacy" className="hover:text-gray-400 transition">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="/terms" className="hover:text-gray-400 transition">
                Terms of Service
              </a>
              <span>|</span>
              <a href="/contact" className="hover:text-gray-400 transition">
                Contact Support
              </a>
            </div>
            <div className="lg:hidden text-center mt-4 text-xs text-gray-600">
              © 2024 TalentCourt. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Desktop Only */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-gray-400 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-400 transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-gray-400 transition">
              Contact Support
            </a>
          </div>
          <div className="text-gray-600">
            © 2024 TalentCourt. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
