"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  Layers,
  LineChart,
  Shield,
  HelpCircle,
  LogIn,
  UserPlus,
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

type Mode = "light" | "dark";

export default function NavBar({ mode = "light" }: { mode?: Mode }) {
  const [open, setOpen] = useState(false);

  const isDark = mode === "dark";

  const navBg = isDark ? "bg-[#0b0f19]" : "bg-white";
  const navText = isDark ? "text-white" : "text-gray-900";
  const navSubText = isDark ? "text-gray-300" : "text-gray-600";
  const btnBg = isDark ? "bg-yellow-500" : "bg-yellow-600";

  return (
    <nav className={`${navBg} ${navText} w-full shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo mode={mode} />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavItem
            link="/"
            icon={<Home size={18} />}
            label="Home"
            sub={navSubText}
          />
          <NavItem
            link="/#about"
            icon={<Info size={18} />}
            label="About"
            sub={navSubText}
          />
          <NavItem
            link="/#plans"
            icon={<Layers size={18} />}
            label="Plans"
            sub={navSubText}
          />
          <NavItem
            link="/#market"
            icon={<LineChart size={18} />}
            label="Market"
            sub={navSubText}
          />
          <NavItem
            link="/#security"
            icon={<Shield size={18} />}
            label="Security"
            sub={navSubText}
          />
          <NavItem
            link="/#faq"
            icon={<HelpCircle size={18} />}
            label="FAQ"
            sub={navSubText}
          />
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className={`px-4 py-2 rounded-md border ${navSubText} border-gray-500 flex items-center gap-2`}
          >
            <LogIn size={18} /> Login
          </Link>
          <Link
            href="/register"
            className={`px-4 py-2 rounded-md text-white ${btnBg} flex items-center gap-2`}
          >
            <UserPlus size={18} /> Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className={`${navBg} md:hidden overflow-hidden`}
          >
            <div className="flex flex-col px-6 pb-6 gap-4">
              <MobileItem href="/" icon={<Home />} label="Home" />
              <MobileItem href="/#about" icon={<Info />} label="About" />
              <MobileItem href="/#plans" icon={<Layers />} label="Plans" />
              <MobileItem href="/#market" icon={<LineChart />} label="Market" />
              <MobileItem
                href="/#security"
                icon={<Shield />}
                label="Security"
              />
              <MobileItem href="/#faq" icon={<HelpCircle />} label="FAQ" />

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className={`w-full py-3 border rounded-md flex items-center justify-center gap-2 ${navSubText}`}
                >
                  <LogIn size={18} /> Login
                </Link>

                <Link
                  href="/register"
                  className={`w-full py-3 rounded-md text-white flex items-center justify-center gap-2 ${btnBg}`}
                >
                  <UserPlus size={18} /> Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* --- Desktop Navigation Item --- */
function NavItem({
  icon,
  label,
  sub,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-2 cursor-pointer transition hover:text-yellow-500 ${sub}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

/* --- Mobile Navigation Item --- */
function MobileItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-2 border-b border-gray-700/20"
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
}
