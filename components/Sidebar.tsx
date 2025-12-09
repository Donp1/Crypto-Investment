"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, BarChart, CreditCard, User, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <Home />, href: "/dashboard" },
    { name: "Portfolio", icon: <BarChart />, href: "/dashboard/portfolio" },
    { name: "Invest", icon: <CreditCard />, href: "/dashboard" },
    { name: "Profile", icon: <User />, href: "/dashboard" },
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg bg-gray-800 text-yellow-400 shadow-md"
        >
          <Menu />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 min-h-screen p-6 fixed top-0 left-0">
        <div className="mb-5">
          <Logo mode="light" />
        </div>
        {links.map((link) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 p-3 mb-3 rounded-lg hover:bg-gray-700 cursor-pointer"
          >
            {link.icon}
            <Link href={link.href}>{link.name}</Link>
          </motion.div>
        ))}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-yellow-400">
                  CryptoInvest
                </h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-gray-700 text-yellow-400"
                >
                  <X />
                </button>
              </div>

              {links.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-3 mb-3 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  {link.icon}
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
