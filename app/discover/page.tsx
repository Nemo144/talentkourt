"use client";

import React, { useState } from "react";
import {
  Search,
  Play,
  TrendingUp,
  Filter,
  Grid3x3,
  List,
  CheckCircle,
} from "lucide-react";

const VideoDiscoveryPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSport, setSelectedSport] = useState<string>("all");

  const videos = [
    {
      id: 1,
      title: "Midfielder Highlight Reel",
      sport: "Soccer",
      thumbnail:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop",
      views: "12K",
      uploadedAt: "2 days ago",
      verified: true,
      sportColor: "from-red-500 to-orange-600",
      athlete: "Marcus Johnson",
      athleteAvatar: "MJ",
    },
    {
      id: 2,
      title: "Point Guard Skills Challenge",
      sport: "Basketball",
      thumbnail:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop",
      views: "8.4K",
      uploadedAt: "1 week ago",
      verified: true,
      sportColor: "from-orange-500 to-amber-600",
      athlete: "Sarah Chen",
      athleteAvatar: "SC",
    },
    {
      id: 3,
      title: "Serve & Volley Drill",
      sport: "Tennis",
      thumbnail:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
      views: "6.7K",
      uploadedAt: "3 days ago",
      verified: true,
      sportColor: "from-green-500 to-emerald-600",
      athlete: "Emily Rodriguez",
      athleteAvatar: "ER",
    },
    {
      id: 4,
      title: "Pitching Highlight",
      sport: "Baseball",
      thumbnail:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=450&fit=crop",
      views: "5.2K",
      uploadedAt: "5 days ago",
      verified: true,
      sportColor: "from-blue-500 to-cyan-600",
      athlete: "David Martinez",
      athleteAvatar: "DM",
    },
    {
      id: 5,
      title: "Defenseman Reel",
      sport: "Hockey",
      thumbnail:
        "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800&h=450&fit=crop",
      views: "4.1K",
      uploadedAt: "4 days ago",
      verified: true,
      sportColor: "from-red-600 to-rose-700",
      athlete: "Alex Thompson",
      athleteAvatar: "AT",
    },
    {
      id: 6,
      title: "Setter Skills",
      sport: "Volleyball",
      thumbnail:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=450&fit=crop",
      views: "3.8K",
      uploadedAt: "2 days ago",
      verified: true,
      sportColor: "from-orange-500 to-red-600",
      athlete: "Nina Patel",
      athleteAvatar: "NP",
    },
    {
      id: 7,
      title: "Floor Routine",
      sport: "Gymnastics",
      thumbnail:
        "https://images.unsplash.com/photo-1532534551549-b3e8c515163b?w=800&h=450&fit=crop",
      views: "7.9K",
      uploadedAt: "1 week ago",
      verified: true,
      sportColor: "from-red-500 to-pink-600",
      athlete: "Sophia Lee",
      athleteAvatar: "SL",
    },
    {
      id: 8,
      title: "Sprint 100m",
      sport: "Track & Field",
      thumbnail:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop",
      views: "6.5K",
      uploadedAt: "3 days ago",
      verified: true,
      sportColor: "from-orange-600 to-amber-700",
      athlete: "James Wilson",
      athleteAvatar: "JW",
    },
    {
      id: 9,
      title: "Takedown Drill",
      sport: "Wrestling",
      thumbnail:
        "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=450&fit=crop",
      views: "5.4K",
      uploadedAt: "4 days ago",
      verified: true,
      sportColor: "from-red-600 to-orange-700",
      athlete: "Ryan Foster",
      athleteAvatar: "RF",
    },
  ];

  const sports = [
    "All",
    "Soccer",
    "Basketball",
    "Tennis",
    "Baseball",
    "Hockey",
    "Volleyball",
    "Gymnastics",
    "Track & Field",
    "Wrestling",
  ];

  const filteredVideos =
    selectedSport === "all"
      ? videos
      : videos.filter((v) => v.sport.toLowerCase() === selectedSport);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-xl">🏆</span>
              </div>
              <span className="text-2xl font-bold hidden sm:block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  TalentCourt
                </span>
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search athletes, sports, or skills..."
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                } transition`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                } transition`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Discover Talent</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">
                Trending Now
              </span>
            </div>
          </div>

          {/* Sport Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport.toLowerCase())}
                className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedSport === sport.toLowerCase()
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25"
                    : "bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                }`}
              >
                {sport}
              </button>
            ))}
            <button className="px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1 text-white" fill="white" />
                  </div>
                </div>

                {/* Sport Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-1.5 bg-gradient-to-r ${video.sportColor} rounded-full text-white text-sm font-semibold shadow-lg backdrop-blur-sm`}
                  >
                    {video.sport}
                  </span>
                </div>

                {/* Verified Badge */}
                {video.verified && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-500 transition line-clamp-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Athlete Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {video.athleteAvatar}
                  </div>
                  <span className="text-sm text-gray-400">{video.athlete}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition shadow-lg hover:shadow-orange-500/25">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDiscoveryPage;
