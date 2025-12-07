"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";

interface AboutSectionProps {
  theme?: "light" | "dark";
}

const aboutFeatures = [
  {
    icon: <FaRocket className="text-white text-3xl" />,
    title: "Fast Growth",
    description:
      "Invest in carefully curated crypto plans designed to maximize your profits and grow your wealth safely and efficiently.",
    bg: "bg-blue-500",
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: "Secure & Reliable",
    description:
      "We use bank-grade security and cold storage wallets to ensure your investments are safe at all times.",
    bg: "bg-indigo-500",
  },
  {
    icon: <FaUsers className="text-white text-3xl" />,
    title: "Trusted by Thousands",
    description:
      "Over 5,000 investors trust us to manage and grow their crypto portfolios successfully.",
    bg: "bg-teal-500",
  },
];

const AboutSection = ({ theme = "light" }: AboutSectionProps) => {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <section className={`${bgColor} py-20`} id="about">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.h2
          className={`text-4xl lg:text-5xl font-bold text-center mb-6 ${textColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className={`text-center max-w-2xl mx-auto mb-16 ${subTextColor}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are committed to helping our investors achieve financial freedom by
          providing secure, reliable, and high-yield cryptocurrency investment
          opportunities.
        </motion.p>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-3 gap-8">
          {aboutFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div
                className={`p-6 rounded-full mb-6 ${feature.bg} flex items-center justify-center`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className={`${subTextColor}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission / Vision */}
        <div className="mt-20 flex flex-col lg:flex-row items-center gap-12">
          <motion.img
            src="/images/about-image.jpg"
            alt="About Crypto"
            className="w-full lg:w-1/3 rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={`text-3xl font-bold ${textColor}`}>Our Mission</h3>
            <p className={`${subTextColor} text-lg`}>
              To provide safe and profitable cryptocurrency investment
              opportunities while educating investors about the crypto market.
            </p>

            <h3 className={`text-3xl font-bold ${textColor}`}>Our Vision</h3>
            <p className={`${subTextColor} text-lg`}>
              To become the most trusted crypto investment platform globally,
              empowering people to achieve financial independence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
