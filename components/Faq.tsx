"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  image?: string;
}

interface FAQSectionProps {
  theme?: "light" | "dark";
}

const faqData: FAQItem[] = [
  {
    question: "How do I start investing?",
    answer:
      "Creating an account is easy. Sign up, verify your identity, and choose an investment plan that suits your goals. You can start with as low as $50.",
    // image: "/images/start-investing.png",
  },
  {
    question: "Are my funds safe?",
    answer:
      "Absolutely. We use bank-grade encryption and cold storage wallets to ensure your crypto investments are safe and secure.",
    // image: "/images/security.png",
  },
  {
    question: "Can I withdraw anytime?",
    answer:
      "Yes! Withdrawals are fast and secure. Depending on the plan, it may take 1-3 business days to process your funds.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, bank transfers, and cryptocurrencies. You can manage your preferred payment method in your account dashboard.",
    image: "/images/payment-methods.png",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! Our 24/7 support team is always available via live chat or email to assist you with any queries.",
  },
];

const Faq = ({ theme = "light" }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const headerColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <section className={`w-full mx-auto px-6 py-20 ${bgColor}`} id="faq">
      <motion.h2
        className={`text-4xl font-bold text-center mb-12 ${headerColor}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-6">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className={`border ${borderColor} rounded-xl p-6 shadow-md ${bgColor}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className={`text-xl font-semibold ${textColor}`}>
                {item.question}
              </h3>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openIndex === index && (
              <motion.div
                className={`mt-4 ${textColor}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-4">{item.answer}</p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.question}
                    className="rounded-lg w-full max-w-md mx-auto"
                  />
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
