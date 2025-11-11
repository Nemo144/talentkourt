"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Calendar,
  Dribbble,
  User,
  MapPin,
  ChevronDown,
  Play,
} from "lucide-react";
import Link from "next/link";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    sport: "",
    position: "",
    location: "",
    agreeToTerms: false,
  });

  //sports list
  const sports = [
    "Soccer",
    "Basketball",
    "Baseball",
    "American Football",
    "Hockey",
    "Volleyball",
    "Tennis",
    "Gymnastics",
    "Track & Field",
    "Wrestling",
    "Swimming",
    "Boxing",
    "MMA",
  ];

  const ageRanges = [
    "Under 13",
    "13-15",
    "16-18",
    "19-21",
    "22-25",
    "26-30",
    "Over 30",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-8 shadow-2xl">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" fill="white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                TalentCourt
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to
              <br />
              TalentCourt
            </h2>
            <p className="text-gray-400 text-sm">
              Connect with professional teams and agents
              <br />
              across all sports
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Age and Sport Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Age Dropdown */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
                >
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4 z-10" />
                  <select
                    id="age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-8 py-3.5 text-gray-300 appearance-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition cursor-pointer text-sm"
                    required
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select Age
                    </option>
                    {ageRanges.map((range) => (
                      <option key={range} value={range} className="bg-gray-900">
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Sport Dropdown */}
              <div>
                <label
                  htmlFor="sport"
                  className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
                >
                  Sport
                </label>
                <div className="relative">
                  <Dribbble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4 z-10" />
                  <select
                    id="sport"
                    value={formData.sport}
                    onChange={(e) =>
                      setFormData({ ...formData, sport: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-8 py-3.5 text-gray-300 appearance-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition cursor-pointer text-sm"
                    required
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select Sport
                    </option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport} className="bg-gray-900">
                        {sport}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Position Input */}
            <div>
              <label
                htmlFor="position"
                className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
              >
                Position
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                <input
                  id="position"
                  type="text"
                  placeholder="e.g., Forward, Guard, Pitcher"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  required
                />
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label
                htmlFor="location"
                className="block text-white text-xs font-bold mb-2 uppercase tracking-wider"
              >
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                <input
                  id="location"
                  type="text"
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900 bg-gray-800 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-gray-400 text-sm cursor-pointer leading-tight"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-orange-500 hover:text-orange-400 underline"
                >
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-orange-500 hover:text-orange-400 underline"
                >
                  privacy policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider mt-6"
            >
              Register Now
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-2">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-orange-500 hover:text-orange-400 font-semibold transition cursor-pointer"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
