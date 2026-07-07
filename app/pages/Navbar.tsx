"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outTIde or on a link
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg"
            : "bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">TalentCourt</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                How It Works
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/signin"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition shadow-lg hover:shadow-pink-500/25"
              >
                Sign Up for Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">TalentCourt</span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-400 hover:text-white transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-6">
              <a
                href="#features"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-300 hover:text-white transition py-2"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-300 hover:text-white transition py-2"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-300 hover:text-white transition py-2"
              >
                Pricing
              </a>

              <div className="border-t border-gray-800 pt-6 mt-6 space-y-4">
                <Link
                  href="/signin"
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition font-medium text-center"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition shadow-lg text-white text-center"
                >
                  Sign Up for Free
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="px-6 py-4 border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center">
              © 2025 TalentCourt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
