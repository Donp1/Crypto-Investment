"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface MarketSectionProps {
  theme?: "light" | "dark";
}

const COINS = [
  "bitcoin",
  "ethereum",
  "tether",
  "binancecoin",
  "ripple",
  "cardano",
  "solana",
];

const MarketSection = ({ theme = "light" }: MarketSectionProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids: COINS.join(","),
              order: "market_cap_desc",
              per_page: COINS.length,
              page: 1,
              price_change_percentage: "24h",
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Failed to fetch coin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60 * 1000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  // Sort coins for top gainers / losers
  const gainers = [...coins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 3);
  const losers = [...coins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 3);

  return (
    <section className={`${bgColor} py-20`} id="market">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.h2
          className={`text-4xl lg:text-5xl font-bold text-center mb-6 ${textColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Live Crypto Market
        </motion.h2>

        {/* Subheading / Intro */}
        <motion.p
          className={`text-center max-w-2xl mx-auto mb-12 ${subTextColor}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay up-to-date with the latest cryptocurrency prices, top gainers and
          losers, and market trends. All data updates automatically every minute
          so you never miss an opportunity.
        </motion.p>

        {/* Top Gainers */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>
            Top Gainers (24h)
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {gainers.map((coin) => (
              <div
                key={coin.id}
                className="p-6 rounded-xl bg-green-100 dark:bg-green-800 shadow-lg flex flex-col items-center text-center"
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-16 h-16 mb-2"
                />
                <h4 className="font-bold text-lg">
                  {coin.symbol.toUpperCase()}
                </h4>
                <p className="text-green-700 dark:text-green-300 font-semibold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className="mt-1 text-green-600 dark:text-green-200">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Losers */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>
            Top Losers (24h)
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {losers.map((coin) => (
              <div
                key={coin.id}
                className="p-6 rounded-xl bg-red-100 dark:bg-red-800 shadow-lg flex flex-col items-center text-center"
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-16 h-16 mb-2"
                />
                <h4 className="font-bold text-lg">
                  {coin.symbol.toUpperCase()}
                </h4>
                <p className="text-red-700 dark:text-red-300 font-semibold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className="mt-1 text-red-600 dark:text-red-200">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full Market Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className={`text-2xl font-bold mb-6 ${textColor}`}>
            Market Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr
                  className={`border-b border-gray-300 dark:border-gray-700 ${subTextColor}`}
                >
                  <th className="py-2 px-4 text-left">Coin</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">24h Change</th>
                  <th className="py-2 px-4 text-left">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => (
                  <motion.tr
                    key={coin.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      <span className={textColor}>{coin.name}</span>
                    </td>
                    <td className={`py-2 px-4 ${textColor}`}>
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 px-4 ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className={`py-2 px-4 ${textColor}`}>
                      ${coin.market_cap.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call-to-action */}
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
            Start Investing Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketSection;
