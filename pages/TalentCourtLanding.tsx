import React, { useState } from "react";
import { Upload, Search, MessageCircle, Shield, Play } from "lucide-react";
import { title } from "process";
import Navbar from "./Navbar";

const TalentCourtLanding = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Your Talent",
      description:
        "Create your profile with showcase video upload platforms. Share highlights from any sport and build your professional portfolio.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Get Discovered",
      description:
        "Our team of scouts, coaches, and team managers actively searching for talent. We showcase aspiring athletes with the right opportunities.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Connect with Pros",
      description:
        "Direct messaging with scouts and agents. Build relationships, ask questions, and negotiate opportunities all in one place.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Stay Safe",
      description:
        "Verified profiles, secure transactions, and athlete protection. We ensure every interaction is legitimate and safe for young athletes.",
    },
  ];

  const sports = [
    { name: "Soccer", icon: "⚽" },
    { name: "Basketball", icon: "🏀" },
    { name: "Baseball", icon: "⚾" },
    { name: "American Football", icon: "🏈" },
    { name: "Hockey", icon: "🏒" },
    { name: "Volleyball", icon: "🏐" },
    { name: "Tennis", icon: "🎾" },
    { name: "Gymnastics", icon: "🤸" },
    { name: "Track & Field", icon: "🏃" },
    { name: "Wrestling", icon: "🤼" },
  ];

  const steps = [
    {
      number: 1,
      title: "Upload Your Best Moments",
      description:
        "Create your profile and upload your best game highlights. Show scouts exactly what you can do.",
    },
    {
      number: 2,
      title: "Scouts Find You",
      description:
        "Our AI algorithm connects you with relevant scouts and experts searching for new skill set.",
    },
    {
      number: 3,
      title: "Get Connected to Opportunities",
      description:
        "Receive direct messages from professionals interested in your talent. Negotiate and secure opportunities.",
    },
  ];

  const testimonials = [
    {
      name: "Marcus Johnson",
      role: "Professional Athlete",
      image: "MJ",
      text: "TalentCourt changed my life, within weeks of uploading my highlights, I was contacted by three college scouts. The platform's verified system made me feel safe.",
    },
    {
      name: "Sarah Chen",
      role: "College Recruit",
      image: "SC",
      text: "The direct connection with coaches was invaluable. I received scholarship offers from universities I never thought would notice me.",
    },
    {
      name: "David Martinez",
      role: "Youth Athlete",
      image: "DM",
      text: "As a young athlete, having a platform where scouts could find me was game-changing. Now I'm training with a professional academy.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <Navbar />
      {/* Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5" fill="white" />
              </div>
              <span className="text-xl font-bold">TalentCourt</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-300 hover:text-white transition">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Connect Emerging Athletes to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
              Professional Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            The first video-first platform for all competitive sports where
            young talent meets scouts, agents, and teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-rose-700 transition flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Start Upload
            </button>
            <button className="px-8 py-4 bg-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 border border-gray-700">
              <Search className="w-5 h-5" />
              Browse Talent
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose TalentCourt */}
      <section id="features" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose TalentCourt?</h2>
            <p className="text-gray-400 text-lg">
              Everything you need to succeed as an emerging athlete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-pink-500/30 transition group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Sports */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Supported Sports</h2>
            <p className="text-gray-400 text-lg">
              We support athletes from all competitive sports
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sports.map((sport, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 p-6 rounded-2xl border border-gray-800 hover:border-pink-500/30 hover:bg-gray-800 transition text-center group cursor-pointer"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">
                  {sport.icon}
                </div>
                <div className="font-semibold text-gray-300">{sport.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">+ More sports coming soon</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Get started in three simple steps and begin your journey to
              professional opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-6xl mb-6">🎬</div>
              <p className="text-gray-400 text-center">
                Your highlight reel is your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Athletes Say</h2>
            <p className="text-gray-400 text-lg">
              Real stories from athletes who found their opportunities
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-10 rounded-2xl border border-gray-800">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {testimonials[activeTestimonial].image}
                </div>
                <div>
                  <h4 className="text-xl font-bold">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                &quot;{testimonials[activeTestimonial].text}&quot;
              </p>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === activeTestimonial
                      ? "bg-gradient-to-r from-pink-500 to-rose-600 w-8"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-pink-500 to-rose-600 p-12 rounded-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of athletes already connecting with professional
            opportunities
          </p>
          <button className="px-10 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Create Your Free Profile
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5" fill="white" />
                </div>
                <span className="text-xl font-bold">TalentCourt</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting emerging athletes to professional opportunities
                worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Safety Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 TalentCourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentCourtLanding;
