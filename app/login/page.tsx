"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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

        {/* Login Card */}
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
            Welcome Back, Investor 👋
          </h3>

          {/* Form */}
          <form className="flex flex-col gap-5">
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

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 mt-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Login
            </motion.button>
          </form>

          {/* Links */}
          <div className="text-center mt-6 text-gray-300 text-sm">
            <Link href="#" className="hover:text-yellow-400">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center mt-2 text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link href="/register" className="text-yellow-400 font-semibold">
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
