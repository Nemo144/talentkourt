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

  return <div>jsx</div>;
};
