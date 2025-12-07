"use client";

import { motion } from "framer-motion";

interface Plan {
  name: string;
  priceRange: string;
  duration: string;
  roi: string;
  description: string;
  features: string[];
}

interface PlansSectionProps {
  theme?: "light" | "dark";
}

const plans: Plan[] = [
  {
    name: "Basic Plan",
    priceRange: "$50 - $499",
    duration: "30 Days",
    roi: "5% - 8%",
    description: "Perfect for beginners who want to start investing in crypto.",
    features: ["Secure investment", "24/7 support", "Daily profit updates"],
  },
  {
    name: "Pro Plan",
    priceRange: "$500 - $4999",
    duration: "60 Days",
    roi: "10% - 15%",
    description: "For experienced investors looking for higher returns.",
    features: ["Higher ROI", "Dedicated account manager", "Faster withdrawals"],
  },
  {
    name: "Premium Plan",
    priceRange: "$5000+",
    duration: "90 Days",
    roi: "20% - 25%",
    description: "Best for professional investors aiming for maximum profits.",
    features: [
      "Highest ROI",
      "Priority support",
      "Exclusive investment insights",
    ],
  },
];

const PlansSection = ({ theme = "light" }: PlansSectionProps) => {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const buttonBg = theme === "dark" ? "bg-indigo-600" : "bg-blue-600";
  const buttonHover =
    theme === "dark" ? "hover:bg-indigo-500" : "hover:bg-blue-500";

  return (
    <section className={`${bgColor} py-20`} id="plans">
      <div className="container mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          className={`text-4xl lg:text-5xl font-bold mb-6 ${textColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Investment Plans
        </motion.h2>
        <motion.p
          className={`max-w-2xl mx-auto mb-16 ${subTextColor}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Choose a plan that suits your investment goals. Whether you're just
          starting or are a professional investor, we have the perfect plan for
          you.
        </motion.p>

        {/* Plans Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>
                  {plan.name}
                </h3>
                <p className={`text-xl font-semibold mb-4 ${subTextColor}`}>
                  {plan.priceRange} • {plan.duration}
                </p>
                <p className={`mb-4 ${subTextColor}`}>{plan.description}</p>

                <ul className="mb-6 text-left space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500 font-bold">✔</span>
                      <span className={`${subTextColor}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#invest"
                className={`${buttonBg} ${buttonHover} text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center`}
              >
                Invest Now
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
