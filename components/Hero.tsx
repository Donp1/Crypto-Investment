"use client";

import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface HeroSectionProps {
  theme?: "light" | "dark";
}

// Animated counter for investors
const InvestorsCounter = ({ count }: { count: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, count, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayValue(Math.floor(value));
      },
    });

    return () => controls.stop(); // cleanup on unmount
  }, [count]);

  return (
    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
      {displayValue.toLocaleString()}
    </span>
  );
};

const HeroSection = ({ theme = "light" }: HeroSectionProps) => {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const buttonBg = theme === "dark" ? "bg-indigo-600" : "bg-blue-600";
  const buttonHover =
    theme === "dark" ? "hover:bg-indigo-500" : "hover:bg-blue-500";

  return (
    <section
      className={`${bgColor} min-h-screen flex flex-col justify-center`}
      id="hero"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}
          >
            Grow Your Wealth with{" "}
            <span className="text-blue-500">Crypto Investments</span>
          </h1>

          <p className={`text-lg lg:text-xl ${subTextColor}`}>
            Join thousands of investors achieving financial freedom. Start
            small, grow big, and experience safe and reliable cryptocurrency
            investment plans tailored for you.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#invest"
              className={`${buttonBg} ${buttonHover} text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg`}
            >
              Invest Now <FaArrowRight />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#learn-more"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              Learn More <FaArrowRight />
            </motion.a>
          </div>

          {/* Animated Proof / Trust Box */}
          <motion.div
            className="mt-10 p-8 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Badge Icon */}
            <motion.div
              className="bg-blue-500 dark:bg-blue-400 p-4 rounded-full text-white text-2xl flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              💎
            </motion.div>

            {/* Text */}
            <div className="flex-1">
              <p className={`${textColor} text-lg md:text-xl`}>
                Trusted by{" "}
                <span className="font-bold">thousands of investors </span>
                worldwide to grow their crypto portfolios safely.
              </p>
              <p className="mt-2 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                <InvestorsCounter count={5000} />+ Happy Investors
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/hero-image.jpg"
            alt="Crypto Investment"
            className="w-full max-w-lg rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
