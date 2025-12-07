"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";

export default function Footer({ mode = "dark" }: { mode?: "dark" | "light" }) {
  const isDark = mode === "dark";

  return (
    <footer
      className={`w-full ${
        isDark ? "bg-[#0b0f19] text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 — Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo mode={mode} />
          <p className="mt-4 text-sm leading-relaxed">
            Smart cryptocurrency investments made simple. Secure, reliable, and
            designed for growth.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-6 text-xl">
            <FaFacebook className="hover:text-yellow-400 cursor-pointer transition" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer transition" />
            <FaInstagram className="hover:text-yellow-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-yellow-400 cursor-pointer transition" />
          </div>
        </motion.div>

        {/* Column 2 — Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              About Us
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Investment Plans
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Contact
            </li>
          </ul>
        </motion.div>

        {/* Column 3 — Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-400 transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Security
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </motion.div>

        {/* Column 4 — Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-sm">
            Subscribe to our newsletter for market updates.
          </p>

          <div className="mt-4 flex items-center">
            <input
              type="email"
              placeholder="Enter email"
              className={`px-3 py-2 rounded-l-md w-full outline-none text-sm ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border`}
            />
            <button className="px-4 py-2 bg-yellow-500 rounded-r-md text-black font-semibold hover:bg-yellow-600 transition">
              Join
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div
        className={`py-5 text-center text-sm ${
          isDark ? "bg-[#080c14]" : "bg-gray-200"
        }`}
      >
        © {new Date().getFullYear()} CypotInvest — All Rights Reserved.
      </div>
    </footer>
  );
}
