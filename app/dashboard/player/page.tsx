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
  Award,
  Share2,
  Trash2,
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

const PlayerDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Mock data
  const playerData = {
    name: "Alex Johnson",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    verified: true,
    profileCompletion: 85,
    sport: "Basketball",
    position: "Point Guard",
    location: "Dallas, TX",
    age: 16,
    height: "5'10\"",
    weight: "165 lbs",
    preferredFoot: "Right",
    playingHistory: [
      { year: "2023-2024", team: "Collinwood High School", active: true },
      { year: "2022-2023", team: "AAU Team", active: false },
      { year: "2021-2022", team: "Youth League", active: false },
    ],
  };

  const stats = {
    totalViews: { value: "12,456", change: "+15%", trend: "up" },
    newFollowers: { value: "342", change: "+23%", trend: "up" },
    agentInterest: { value: "45", change: "+18%", trend: "up" },
    profileCompletion: { value: "85%", label: "Profile Completions" },
  };

  const quickStats = [
    { label: "Profile Views", value: "2,456", icon: Eye, trend: "up" },
    { label: "New Messages", value: "3", icon: Mail, badge: true },
    {
      label: "Shortlist Additions",
      value: "12",
      subtext: "this month",
      icon: Star,
    },
    { label: "Scout Connections", value: "45", subtext: "total", icon: Users },
  ];

  const videos = [
    {
      id: 1,
      title: "2024 AAU Highlight Reel",
      thumbnail:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
      views: "2.3K",
      uploadedAt: "12 days ago",
      duration: "16:9",
      tags: ["Shooting", "Dribbling", "Plays"],
      verified: true,
    },
    {
      id: 2,
      title: "Free Throw Challenge",
      thumbnail:
        "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=600&h=400&fit=crop",
      views: "1.8K",
      uploadedAt: "3 days ago",
      duration: "16:9",
      tags: ["Shooting", "Accuracy", "Skills"],
      verified: true,
    },
    {
      id: 3,
      title: "Full Game Performance",
      thumbnail:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop",
      views: "987",
      uploadedAt: "2 weeks ago",
      duration: "16:9",
      tags: ["Game Film", "Defense", "Team Play"],
      verified: true,
    },
    {
      id: 4,
      title: "Skills Drill Session",
      thumbnail:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
      views: "1.5K",
      uploadedAt: "1 week ago",
      duration: "16:9",
      tags: ["Dribbling", "Ball Handling", "Speed"],
      verified: true,
    },
  ];

  const recentActivity = [
    {
      icon: MessageSquare,
      title: "New message from Scout:",
      description: '"Looking to schedule a trial"',
      time: "2 hours ago",
      badge: "Unread",
      badgeColor: "bg-orange-500",
    },
    {
      icon: Eye,
      title: "Profile viewed by 2 scouts",
      time: "1 hour ago",
      badge: "New",
      badgeColor: "bg-orange-500",
    },
    {
      icon: Star,
      title: "Added to 3 scout shortlists",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🏆</span>
              </div>
              <span className="text-2xl font-bold hidden sm:block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Sportss
                </span>
              </span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-sm font-semibold">
                    {playerData.name}
                  </span>
                  {playerData.verified && (
                    <CheckCircle
                      className="w-4 h-4 text-orange-500"
                      fill="currentColor"
                    />
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {stats.profileCompletion.value} Complete
                </div>
              </div>
              <img
                src={playerData.profileImage}
                alt={playerData.name}
                className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition text-sm shadow-lg shadow-orange-500/20">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-3 space-y-4">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold">My Profile</h2>
              </div>

              {/* Profile Image */}
              <div className="relative mb-6">
                <img
                  src={playerData.profileImage}
                  alt={playerData.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500/20"
                />
                <button className="absolute bottom-0 right-1/2 translate-x-16 translate-y-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{playerData.name}</h3>
                  {playerData.verified && (
                    <CheckCircle
                      className="w-5 h-5 text-orange-500"
                      fill="currentColor"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Dribbble className="w-4 h-4 text-orange-500" />
                  <span>{playerData.sport}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {playerData.age} years old • {playerData.position}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-400 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{playerData.location}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-sm font-bold">{playerData.height}</div>
                  <div className="text-xs text-gray-400">Height</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-sm font-bold">{playerData.weight}</div>
                  <div className="text-xs text-gray-400">Weight</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-sm font-bold">
                    {playerData.preferredFoot}
                  </div>
                  <div className="text-xs text-gray-400">Pref. Foot</div>
                </div>
              </div>

              {/* Playing History */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Playing history</h4>
                <div className="space-y-2">
                  {playerData.playingHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.active ? "bg-green-500" : "bg-gray-600"
                        }`}
                      />
                      <span className="text-gray-400">{item.year}:</span>
                      <span className="text-white">{item.team}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  {quickStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="relative bg-gray-800/50 rounded-xl p-3"
                    >
                      {stat.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {stat.value}
                        </div>
                      )}
                      <stat.icon className="w-4 h-4 text-orange-500 mb-2" />
                      <div className="text-xs text-gray-400 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold">{stat.value}</div>
                      {stat.subtext && (
                        <div className="text-xs text-gray-500">
                          {stat.subtext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                  <Upload className="w-4 h-4" />
                  Upload Video
                </button>
                <button className="w-full py-3 bg-gray-800/50 border border-gray-700 rounded-xl font-semibold hover:bg-gray-700/50 transition flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </button>
                <button className="w-full py-3 bg-gray-800/50 border border-gray-700 rounded-xl font-semibold hover:bg-gray-700/50 transition flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section - Videos */}
          <div className="lg:col-span-6 space-y-6">
            {/* My Videos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold">My Videos</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                          <Play className="w-6 h-6 ml-1" fill="white" />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-semibold">
                        {video.duration}
                      </div>

                      {/* Verified Badge */}
                      {video.verified && (
                        <div className="absolute top-2 right-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-orange-500 transition">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.uploadedAt}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {video.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button className="flex-1 px-3 py-2 bg-gray-800/50 rounded-lg text-xs font-semibold hover:bg-gray-700/50 transition flex items-center justify-center gap-1.5">
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gray-800/50 rounded-lg text-xs font-semibold hover:bg-gray-700/50 transition flex items-center justify-center gap-1.5">
                          <Share2 className="w-3 h-3" />
                          Share
                        </button>
                        <button className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold mb-0.5">
                            {activity.title}
                          </h3>
                          {activity.description && (
                            <p className="text-sm text-gray-400 italic">
                              {activity.description}
                            </p>
                          )}
                        </div>
                        {activity.badge && (
                          <span
                            className={`px-2 py-1 ${activity.badgeColor} rounded-full text-xs font-semibold whitespace-nowrap`}
                          >
                            {activity.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Analytics */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold">My Analytics</h2>
            </div>

            {/* Total Views */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Total Views</span>
              </div>
              <div className="text-3xl font-bold mb-2">
                {stats.totalViews.value}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.totalViews.change} this month</span>
              </div>
              {/* Mini Chart */}
              <div className="flex items-end gap-1 h-16">
                {[65, 75, 70, 85, 80, 90, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-orange-500 to-red-600 rounded-t transition-all hover:opacity-75"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* New Followers */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">New Followers</span>
              </div>
              <div className="text-3xl font-bold mb-2">
                {stats.newFollowers.value}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.newFollowers.change} this month</span>
              </div>
            </div>

            {/* Agent Interest */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Agent Interest</span>
              </div>
              <div className="text-3xl font-bold mb-2">
                {stats.agentInterest.value}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.agentInterest.change} this month</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">agents interested</p>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {stats.profileCompletion.label}
                </span>
              </div>
              <div className="text-3xl font-bold mb-4">
                {stats.profileCompletion.value}
              </div>
              {/* Progress Bar */}
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all"
                  style={{ width: stats.profileCompletion.value }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
