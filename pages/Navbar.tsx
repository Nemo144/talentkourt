"use client";

import React, { useState, useEffect } from "react";
import { Play, Menu, X } from "lucide-react";

const Navigation = () => {
  //states for the menu and scroll effects
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //close menu when clicking outside or on a link
  const closeMenu = () => setIsMenuOpen(false);

  //prevent body scroll when the body is open
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
};
