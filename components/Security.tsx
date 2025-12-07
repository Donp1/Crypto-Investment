"use client";

import { motion } from "framer-motion";
import {
  FaLock,
  FaShieldAlt,
  FaUserShield,
  FaShieldVirus,
} from "react-icons/fa";

interface SecuritySectionProps {
  theme?: "light" | "dark";
}

const securityFeatures = [
  {
    icon: <FaLock className="text-white text-3xl" />,
    title: "End-to-End Encryption",
    description:
      "All transactions and sensitive user data are secured with industry-standard encryption protocols, ensuring complete privacy and security.",
    bg: "bg-blue-500",
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: "Cold Wallet Storage",
    description:
      "The majority of user funds are stored offline in cold wallets to prevent unauthorized access and hacking attempts.",
    bg: "bg-indigo-500",
  },
  {
    icon: <FaUserShield className="text-white text-3xl" />,
    title: "Two-Factor Authentication",
    description:
      "Enhanced account security with 2FA login verification, protecting users from unauthorized access to their accounts.",
    bg: "bg-teal-500",
  },
  {
    icon: <FaShieldVirus className="text-white text-3xl" />,
    title: "Regular Security Audits",
    description:
      "Our systems undergo frequent third-party audits and penetration testing to ensure vulnerabilities are identified and fixed promptly.",
    bg: "bg-purple-500",
  },
];

const SecuritySection = ({ theme = "light" }: SecuritySectionProps) => {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <section className={`${bgColor} py-20`} id="security">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.h2
          className={`text-4xl lg:text-5xl font-bold text-center mb-6 ${textColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Security & Safety
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className={`text-center max-w-2xl mx-auto mb-16 ${subTextColor}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Security is our top priority. We use cutting-edge technology and
          industry best practices to ensure that your investments and personal
          information are always protected.
        </motion.p>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div
                className={`p-6 rounded-full mb-6 ${feature.bg} flex items-center justify-center shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className={`${subTextColor}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Security Illustration / Image */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/security-crypto.png"
            alt="Crypto Security"
            className="w-full max-w-3xl rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#invest"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition"
          >
            Start Investing Securely
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;
