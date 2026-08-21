"use client";

import React, { useState } from "react";
import {
  Eye,
  Mail,
  Star,
  Shield,
  Search,
  Home,
  Compass,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Bell,
  CheckCircle,
  MapPin,
  Heart,
  TrendingUp,
  Send,
  Sparkles,
  Target,
  Award,
  Clock,
} from "lucide-react";

const ScoutDashboard = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null);

  const scoutData = {
    name: "Mark Thompson",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    verified: true,
    isPremium: true,
    organization: "Westwood Basketball Academy",
    renewalDate: "Nov 15, 2024",
  };

  const stats = [
    {
      icon: Eye,
      title: "Profile Views",
      value: "3,427 views",
      subtitle: "+15% this month",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: Mail,
      title: "New Messages",
      value: "7 messages",
      subtitle: "2 unread",
      badge: 1,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: Star,
      title: "Shortlist Size",
      value: "23 athletes",
      subtitle: "Soccer: 8 | Basketball: 9 | Tennis: 6",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-900/20",
    },
    {
      icon: Shield,
      title: "Subscription Status",
      value: "Premium Member",
      subtitle: "Until Nov 15, 2024",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-900/20",
    },
  ];

  const newMatches = [
    {
      id: 1,
      name: "Athlete Name",
      sport: "Basketball",
      position: "SG",
      age: 17,
      location: "Dallas, TX",
      height: "5'11\"",
      weight: "170 lbs",
      level: "Collegiate",
      matchScore: "92%",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      status: "online",
      price: "50px",
    },
    {
      id: 2,
      name: "Athlete Pentee",
      sport: "Basketball",
      position: "SG",
      age: 17,
      location: "Dallas, TX",
      height: "5'11\"",
      weight: "170 lbs",
      level: "Collegiate",
      matchScore: "88%",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      status: "busy",
      price: "50px",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      name: "Mark Torns",
      sport: "Basketball",
      message: "Looking to schedule trial",
      time: "2 hours ago",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Mark Some",
      sport: "Basketball",
      message: "Looking to schedule trial",
      time: "2 hours ago",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Mark Same",
      sport: "Basketball",
      message: "Looking to schedule trial",
      time: "2 hours ago",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  ];

  const aiRecommendations = [
    {
      id: 1,
      name: "Alex Johnson",
      sport: "Basketball",
      position: "PG",
      age: 18,
      location: "Dallas, TX",
      matchScore: "92%",
      height: "5'10\"",
      weight: "165 lbs",
      team: "AAU Team",
      price: "100px",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      badges: ["🏀", "⚡"],
    },
    {
      id: 2,
      name: "Alex Johnson",
      sport: "Basketball",
      position: "PG",
      age: 18,
      location: "Dallas, TX",
      matchScore: "92%",
      height: "5'10\"",
      weight: "165 lbs",
      team: "AAU Team",
      price: "100px",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      badges: ["⚽", "🟢"],
    },
    {
      id: 3,
      name: "Alex Johnson",
      sport: "Basketball",
      position: "PG",
      age: 18,
      location: "Dallas, TX",
      matchScore: "92%",
      height: "5'10\"",
      weight: "165 lbs",
      team: "AAU Team",
      price: "100px",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      badges: ["🎾", "🔴"],
    },
  ];

  const myShortlist = [
    {
      name: "Mark Thom...",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      status: "busy",
    },
    {
      name: "Name Dioec...",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      status: "busy",
    },
    {
      name: "Mentation...",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    },
    {
      name: "Konclimna...",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop",
    },
    {
      name: "Mark Thom...",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
      status: "busy",
    },
    {
      name: "Mark Danie...",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop",
    },
  ];

  const teamStats = {
    members: 5,
    activeScouts: 4,
    pendingInvites: 2,
  };

  const analytics = {
    athletesViewed: 156,
    messagesSent: 45,
    responseRate: "68%",
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30">
      {/* Top Navigation Layer (Sticky + Backdrop Blur Effect) */}
      <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* A. Brand Logo Panel */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
              <span className="text-lg">🏆</span>
            </div>
            <span className="text-xl font-black tracking-tight hidden sm:block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                TalentCourt
              </span>
            </span>
          </div>

          {/* Central Interactive Search Box Container */}
          <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search athletes by passport name, position, or high school organization..."
              className="w-full h-10 rounded-xl bg-zinc-900/60 pl-10 pr-4 text-xs font-mono text-zinc-200 placeholder-zinc-500 border border-zinc-800 focus:border-orange-500/50 focus:bg-zinc-900 focus:outline-none focus:ring-0 transition-all duration-200"
            />
          </div>

          {/* Right Menu Control & Scout Profile Area */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Notifications Alert Bell Trigger */}
            <button className="relative w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white transition group">
              <Bell className="w-4 h-4 transition-transform group-hover:rotate-12" />
              {/* Notification Pulse Active Dot */}
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-500 ring-4 ring-zinc-950 animate-pulse" />
            </button>

            {/* Divider Separation Bar */}
            <div className="h-6 w-px bg-zinc-800 hidden sm:block" />

            {/* Scout Avatar Identity Panel */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-xs font-bold text-zinc-200">
                    {scoutData.name}
                  </span>
                  {scoutData.verified && (
                    <CheckCircle
                      className="w-3.5 h-3.5 text-orange-500"
                      fill="currentColor"
                    />
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-tight truncate max-w-[160px]">
                  {scoutData.organization}
                </p>
              </div>

              <div className="relative group cursor-pointer">
                <img
                  src={scoutData.profileImage}
                  alt={scoutData.name}
                  className="w-10 h-10 rounded-xl object-cover border border-zinc-800 group-hover:border-orange-500/60 transition-colors duration-200"
                />
                {scoutData.isPremium && (
                  <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-500 to-red-600 text-[8px] font-black uppercase tracking-wider px-1 rounded border border-black shadow">
                    PRO
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/*  Main Split-Grid Content Box Layer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR SLOT CONTAINER PANEL (3/12 Columns) */}

          <aside className="lg:col-span-3 space-y-5">
            {/* STRUCTURAL NAVIGATION LINKS GROUP */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4 space-y-1">
              <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-2 mb-3">
                Navigation Menu
              </span>
              {[
                { label: "Dashboard", icon: Home, active: true },
                { label: "Discover Talent", icon: Compass, active: false },
                { label: "My Shortlist", icon: Star, active: false },
                {
                  label: "Messages",
                  icon: MessageSquare,
                  active: false,
                  count: 2,
                },
                { label: "Team Management", icon: Users, active: false },
                { label: "Analytics", icon: BarChart3, active: false },
                { label: "Settings", icon: Settings, active: false },
              ].map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={idx}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition group border border-transparent ${
                      link.active
                        ? "bg-zinc-900 text-white border-zinc-800 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 transition ${link.active ? "text-orange-500" : "text-zinc-500 group-hover:text-zinc-400"}`}
                      />
                      <span>{link.label}</span>
                    </div>
                    {/* Inline alert numeric count bubble badge */}
                    {link.count && (
                      <span className="bg-orange-500 text-black text-[10px] font-mono font-black h-4 px-1.5 rounded-md flex items-center justify-center">
                        {link.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TEAM MANAGEMENT METRIC OVERVIEW */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
              <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1 mb-3">
                Team Infrastructure
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/20 border border-zinc-900/60">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Users className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Total Members</span>
                  </div>
                  <span className="font-bold text-white">
                    {teamStats.members}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/20 border border-zinc-900/60">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Scouts</span>
                  </div>
                  <span className="font-bold text-emerald-400">
                    {teamStats.activeScouts}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/20 border border-zinc-900/60">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pending Invites</span>
                  </div>
                  <span className="font-bold text-amber-400">
                    {teamStats.pendingInvites}
                  </span>
                </div>
              </div>
            </div>

            {/* SUBSCRIPTION TIERS ACCENT CARD */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 shadow-xl group">
              {/* Corner ambient styling orb gradient overlay */}
              <div className="absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/15 transition duration-500" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Account Status
                  </span>
                  {scoutData.isPremium && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-600 text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow">
                      Premium Partner
                    </span>
                  )}
                </div>

                <div className="py-1">
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Your institutional scout license access resets
                    chronologically on:
                  </p>
                  <span className="block mt-1 font-mono text-xs font-bold text-zinc-200">
                    {scoutData.renewalDate}
                  </span>
                </div>

                <button className="w-full h-9 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 font-mono text-[10px] font-bold uppercase tracking-wider transition active:scale-98">
                  Manage Subscription
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT VIEW PORT AREA PANEL (9/12 Columns)*/}
          <section className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-5 transition-all duration-200 hover:border-zinc-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                          {stat.title}
                        </span>
                        <h4 className="text-xl font-mono font-black tracking-tight text-white">
                          {stat.value}
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          {stat.subtitle}
                        </p>
                      </div>
                      <div
                        className={`p-2.5 rounded-xl ${stat.bgColor} border border-zinc-800 text-transparent bg-clip-text bg-gradient-to-br ${stat.color} shrink-0`}
                      >
                        <IconComponent
                          className="w-4 h-4 stroke-[2.5]"
                          style={{ color: "unset" }}
                        />
                      </div>
                    </div>
                    {stat.badge && (
                      <span className="absolute top-3 right-3 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: New Matches (7/12 Layout Space) */}
              <div className="md:col-span-7 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                      New System Matches
                    </h3>
                    <p className="text-[10px] text-zinc-500">
                      Active algorithmic athlete alignment queues.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-orange-500 bg-orange-950/30 border border-orange-900/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Live Fit
                  </span>
                </div>

                <div className="space-y-3">
                  {newMatches.map((match) => (
                    <div
                      key={match.id}
                      className="group flex items-center justify-between p-3 rounded-xl border border-zinc-900/60 bg-zinc-950/80 hover:border-zinc-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={match.avatar}
                            alt={match.name}
                            className="w-11 h-11 rounded-xl object-cover border border-zinc-800"
                          />
                          <span
                            className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-black ${match.status === "online" ? "bg-emerald-500" : "bg-zinc-600"}`}
                          />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-zinc-200 group-hover:text-white transition">
                            {match.name}
                          </h5>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                            {match.sport} • {match.position} • {match.age}y/o •{" "}
                            {match.location}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="block font-mono text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                          {match.matchScore}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tight block">
                          Match Score
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Messages (5/12 Layout Space) */}
              <div className="md:col-span-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                      Recent Inbound
                    </h3>
                    <p className="text-[10px] text-zinc-500">
                      Communication threads with player nodes.
                    </p>
                  </div>
                  <MessageSquare className="w-4 h-4 text-zinc-600" />
                </div>

                <div className="space-y-3">
                  {recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-zinc-900/40 bg-zinc-900/10 hover:bg-zinc-900/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={msg.avatar}
                          alt={msg.name}
                          className="w-9 h-9 rounded-xl object-cover border border-zinc-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-zinc-300 truncate">
                              {msg.name}
                            </h5>
                            {msg.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-zinc-600 shrink-0 self-start mt-0.5">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Row Title */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  AI Verified Insights Recommendations
                </h3>
              </div>

              {/* 3-Column Athlete Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-4 shadow-xl transition-all duration-300 hover:border-zinc-800 group"
                  >
                    {/* Top: Avatar & Base Information */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
                        className="w-14 h-14 rounded-xl object-cover border border-zinc-800"
                      />
                      <div>
                        <h4 className="text-xs font-black text-white group-hover:text-orange-400 transition">
                          {rec.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] font-bold text-zinc-400">
                            {rec.sport} • {rec.position}
                          </span>
                          <span className="text-zinc-700">•</span>
                          <span className="font-mono text-[10px] text-zinc-500">
                            {rec.location}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {rec.team}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Key Dimensions & Match Score */}
                    <div className="grid grid-cols-2 gap-2 border-t border-b border-zinc-900/60 py-2.5 my-3 font-mono text-[10px]">
                      <div>
                        <span className="text-zinc-600 block uppercase tracking-tight">
                          Dimensions
                        </span>
                        <span className="text-zinc-300 font-bold">
                          {rec.height} / {rec.weight}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block uppercase tracking-tight">
                          Match Quality
                        </span>
                        <span className="text-emerald-400 font-black">
                          {rec.matchScore}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Sport Badges & Action Trigger */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex gap-1">
                        {rec.badges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-xs"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <button className="h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 text-[10px] font-mono font-bold uppercase tracking-wider px-3 text-zinc-300 hover:text-white transition">
                        View Film
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Split Card: My Shortlist Circles Matrix */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    My Monitored Shortlist
                  </h3>
                  <p className="text-[10px] text-zinc-500">
                    Pinned player profiles for performance monitoring.
                  </p>
                </div>

                {/* Avatars Inline Grid Layout */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {myShortlist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1.5 text-center group cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border border-zinc-800 group-hover:border-zinc-700 transition"
                        />
                        {item.status === "busy" && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-black bg-amber-500" />
                        )}
                      </div>
                      <span className="font-mono text-[9px] text-zinc-500 group-hover:text-zinc-300 truncate max-w-full block">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Split Card: Pipeline Performance Logs */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Pipeline Performance Log
                  </h3>
                  <p className="text-[10px] text-zinc-500">
                    Conversion velocities for active recruitment.
                  </p>
                </div>

                {/* Numeric Analytics Containers */}
                <div className="grid grid-cols-3 gap-3 font-mono text-center">
                  <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-xl">
                    <span className="text-xl font-black text-white block">
                      {analytics.athletesViewed}
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-1">
                      Reviewed
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-xl">
                    <span className="text-xl font-black text-white block">
                      {analytics.messagesSent}
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-1">
                      Outbound
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-xl">
                    <span className="text-xl font-black text-emerald-400 block">
                      {analytics.responseRate}
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-1">
                      Reply Velocity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScoutDashboard;
