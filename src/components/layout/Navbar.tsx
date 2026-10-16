"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  ListTodo,
  FileQuestion,
  LineChart,
  Archive,
  Menu,
  X,
  Shield,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<"client" | "tutor">("client");

  const navLinks = [
    { href: "/", label: "Tutors", icon: MapPin },
    { href: "/syllabus", label: "Syllabus", icon: ListTodo },
    { href: "/ai-quiz", label: "Quizzes", icon: FileQuestion },
    { href: "/analytics", label: "Analytics", icon: LineChart },
    { href: "/past-papers", label: "Past Papers", icon: Archive },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-ink-900 rounded flex items-center justify-center text-white font-mono font-bold text-xs relative">
              TB
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red absolute -top-0.5 -right-0.5 ring-2 ring-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-ink-900">TutorBridge</span>
              <span className="font-mono text-[10px] text-accent-blue font-semibold uppercase tracking-wider">
                PK
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-ink-900 text-white font-semibold"
                      : "text-ink-700 hover:text-ink-900 hover:bg-ink-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mode Switcher & User Details */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center p-0.5 bg-ink-100 border border-ink-200 rounded text-[11px] font-mono">
              <button
                onClick={() => setActiveRole("client")}
                className={`px-2 py-0.5 rounded transition-all ${
                  activeRole === "client"
                    ? "bg-white text-ink-900 font-bold shadow-xs border border-ink-200"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                Client
              </button>
              <button
                onClick={() => setActiveRole("tutor")}
                className={`px-2 py-0.5 rounded transition-all ${
                  activeRole === "tutor"
                    ? "bg-accent-blue text-white font-bold"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                Tutor
              </button>
            </div>

            <div className="flex items-center gap-2 pl-3 border-l border-ink-200">
              <div className="w-6 h-6 rounded bg-ink-900 text-white flex items-center justify-center font-mono text-[10px] font-bold">
                {activeRole === "client" ? "C" : "T"}
              </div>
              <span className="text-xs font-medium text-ink-700 font-mono">
                {activeRole === "client" ? "Hamza (Parent/Student)" : "Sir Bilal"}
              </span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-ink-700 hover:text-ink-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-ink-200 bg-white px-4 py-3 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-ink-100 text-xs">
            <span className="text-ink-500 font-mono">Viewing Mode:</span>
            <div className="flex gap-1 font-mono text-[11px]">
              <button
                onClick={() => setActiveRole("client")}
                className={`px-2 py-1 rounded ${activeRole === "client" ? "bg-ink-900 text-white" : "bg-ink-100"}`}
              >
                Client
              </button>
              <button
                onClick={() => setActiveRole("tutor")}
                className={`px-2 py-1 rounded ${activeRole === "tutor" ? "bg-accent-blue text-white" : "bg-ink-100"}`}
              >
                Tutor
              </button>
            </div>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-1.5 rounded text-xs font-medium ${
                pathname === link.href ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
