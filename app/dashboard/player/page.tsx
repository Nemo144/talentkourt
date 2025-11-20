"use client";

import React, { useState } from "react";
import {
  Play,
  Upload,
  BarChart3,
  Edit3,
  Dribbble,
  MapPin,
  User,
  TrendingUp,
  Mail,
  Eye,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";

const PlayerDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Mock data - to be replaced with real data from API
  const playerData = {
    name: "Marcus Johnson",
    role: "Professional Player",
    age: 26,
    profileImage: "MJ", // In real app, image URL will be used
    profileCompletion: 85,
    sport: "Football",
    position: "Forward",
    location: "Los Angeles, CA",
    height: "6'2\"",
    weight: "185 lbs",
    preferredFoot: "Right",
    experience: "8 Years",
  };

  const stats = [
    {
      title: "Total Views",
      value: "52.4K",
      change: "+12% this month",
      trend: "up",
      chartData: [70, 85, 75, 90, 85, 95],
    },
    {
      title: "New Followers",
      value: "1.8K",
      change: "+28% this month",
      trend: "up",
    },
    {
      title: "Agent Interest",
      value: "15",
      change: "+5 new inquiries",
      trend: "up",
    },
    {
      title: "Engagement Rate",
      value: "8.4%",
      change: "+2.1% vs last week",
      trend: "up",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Championship Finals Highlights 2024",
      views: "12.5K",
      uploadedAt: "2 weeks ago",
      tags: ["Football", "Highlights"],
    },
    {
      id: 2,
      title: "Training Session - Skill Development",
      views: "8.3K",
      uploadedAt: "1 month ago",
      tags: ["Football", "Training"],
    },
    {
      id: 3,
      title: "Season Review - Top Goals 2024",
      views: "24.7K",
      uploadedAt: "3 weeks ago",
      tags: ["Football", "Goals"],
    },
    {
      id: 4,
      title: "One-on-One Interview - Career Goals",
      views: "5.2K",
      uploadedAt: "1 week ago",
      tags: ["Interview", "Personal"],
    },
  ];

  const recentActivity = [
    {
      icon: Mail,
      title: "3 New Messages from Scouts",
      description: "Professional teams interested in your profile",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Eye,
      title: "2 Profile Views This Week",
      description: "Coaches and scouts visited your profile",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">🏆</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              TalentCourt
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400 mb-1">
                Profile Completion
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all"
                    style={{ width: `${playerData.profileCompletion}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-orange-500">
                  {playerData.profileCompletion}% Complete
                </span>
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition text-sm">
              Edit Profile
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {playerData.profileImage}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{playerData.name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm">✓ {playerData.role}</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm">{playerData.age} years old</span>
              </div>
            </div>
          </div>

          {/* Player Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Dribbble className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Sport</div>
                  <div className="font-semibold">{playerData.sport}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Location</div>
                  <div className="font-semibold">{playerData.location}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Position</div>
                  <div className="font-semibold">{playerData.position}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center py-3 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Height</div>
              <div className="font-semibold">{playerData.height}</div>
            </div>
            <div className="text-center py-3 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Weight</div>
              <div className="font-semibold">{playerData.weight}</div>
            </div>
            <div className="text-center py-3 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Preferred Foot</div>
              <div className="font-semibold">{playerData.preferredFoot}</div>
            </div>
            <div className="text-center py-3 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Experience</div>
              <div className="font-semibold">{playerData.experience}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Videos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Videos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold">Performance Videos</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition cursor-pointer group"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    {/* Video Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <Play className="w-8 h-8 ml-1" fill="white" />
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>{video.views} views</span>
                        <span>{video.uploadedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        {video.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <activity.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Stats */}
          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
              >
                <div className="text-sm text-gray-400 mb-2">{stat.title}</div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>

                {/* Mini Chart */}
                {stat.chartData && (
                  <div className="flex items-end gap-1 h-16">
                    {stat.chartData.map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-orange-500 to-red-600 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <button className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition">
            <Upload className="w-5 h-5" />
            Upload New Video
          </button>
          <button className="flex items-center justify-center gap-3 py-4 bg-gray-900 border border-gray-800 rounded-xl font-semibold hover:bg-gray-800 transition">
            <BarChart3 className="w-5 h-5" />
            View Analytics
          </button>
          <button className="flex items-center justify-center gap-3 py-4 bg-gray-900 border border-gray-800 rounded-xl font-semibold hover:bg-gray-800 transition">
            <Edit3 className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
