import React, { useState } from "react";
import { Upload, Search, MessageCircle, Shield, Play } from "lucide-react";
import { title } from "process";

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
  return <div>TalentCourtLanding</div>;
};

export default TalentCourtLanding;
