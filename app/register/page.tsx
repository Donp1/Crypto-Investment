"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <NavBar mode="dark" />
      <div className="min-h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1642790106110-34e66e4ae79e?auto=format&fit=crop&w=1350&q=80')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/60" />

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-[95%] max-w-md rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-8 text-white"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Logo mode="dark" />
          </div>

          <h3 className="text-center text-xl font-semibold mb-6 text-gray-200">
            Create Your Investor Account 🚀
          </h3>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
              <User className="text-yellow-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
              <Mail className="text-yellow-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
              <Lock className="text-yellow-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
              <Lock className="text-yellow-400" size={20} />
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Register Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 mt-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Create Account
            </motion.button>
          </form>

          {/* Links */}
          <div className="text-center mt-6 text-gray-300 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 font-semibold">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
