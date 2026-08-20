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
            <div className="h-96 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-xs text-zinc-600 font-mono">
              [Main Content Feed Stream Section]
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScoutDashboard;
