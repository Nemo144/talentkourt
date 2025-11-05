"use client";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, MapPin, ChevronDown } from "lucide-react";

const SignupPage = () => {
  //sign up details
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    position: "",
    location: "",
    agreeToTerms: false,
  });

  //selected positions of the players
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const ageRanges = [
    "Under 13",
    "13-15",
    "16-18",
    "19-21",
    "22-25",
    "26-30",
    "Over 30",
  ];

  const handlePositionToggle = (position: string) => {
    if (selectedPositions.includes(position)) {
      //if position already selected then remove it
      setSelectedPositions(selectedPositions.filter((p) => p !== position));
    } else {
      //if position not selected, add it
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      positions: selectedPositions,
    });
    // Handle registration logic here for when the api for the backend is up and running!!
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-white">Welcome to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                TalentCourt
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Connect with professional clubs and agents
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Details Section */}
            <div>
              <h2 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider">
                Account Details
              </h2>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Player Profile Section */}
            <div>
              <h2 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider">
                Player Profile
              </h2>

              {/* Age Dropdown */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  AGE
                </label>
                <div className="relative">
                  <select
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-gray-300 appearance-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Select your age
                    </option>
                    {ageRanges.map((range) => (
                      <option key={range} value={range} className="bg-gray-900">
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Playing Position */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  PLAYING POSITION
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {positions.map((position) => (
                    <button
                      key={position}
                      type="button"
                      onClick={() => handlePositionToggle(position)}
                      className={`py-3 px-4 rounded-xl font-medium transition ${
                        selectedPositions.includes(position)
                          ? "bg-orange-500 text-white border-2 border-orange-500"
                          : "bg-gray-900/50 text-gray-300 border-2 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {position}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  LOCATION
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Select your location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-12 py-3.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="mt-1 w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800 bg-gray-900 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-gray-400 text-sm cursor-pointer"
              >
                I agree to the terms and privacy policy
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={
                !formData.agreeToTerms || selectedPositions.length === 0
              }
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              Register Now
            </button>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-orange-500 hover:text-orange-400 font-semibold transition"
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
