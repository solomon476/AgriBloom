"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const backgrounds = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
];

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center -mt-8">
      {/* Background Carousel */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentBg ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto space-y-12 px-8 py-16">
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Manage Your Farm, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
              Grow Your Profit
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            The lightweight, offline-first platform designed for Kenyan farmers. Digitize your crop cycles, automate expense logging, and simplify your operations.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block text-center">
              Get Started
            </Link>
            <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-bold text-lg transition-all backdrop-blur-sm shadow-sm hover:shadow-md inline-block text-center">
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12">
          {[
            { title: "Offline-First", desc: "Log data without internet. Syncs automatically when connected.", icon: "📶" },
            { title: "Smart Tracking", desc: "Track inputs, labor, and harvests from planting to market.", icon: "🌱" },
            { title: "M-Pesa Integrated", desc: "Record payments effortlessly with automated tracking.", icon: "📱" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:bg-white/20 transition-all flex flex-col items-start gap-4 text-white"
            >
              <div className="text-4xl bg-white/20 p-3 rounded-xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
