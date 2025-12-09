"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/Navbar";
import { registerUser } from "@/utils";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Globe, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [countryLoading, setCountryLoading] = useState(true);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch countries with currency and dial codes
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies,flags,idd"
        );
        const data = await res.json();

        const formatted = data
          .map((c: any) => ({
            name: c.name.common,
            currency: c.currencies ? Object.keys(c.currencies)[0] : "",
            flag: c.flags?.png,
            dialCode: c.idd?.root
              ? c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")
              : "",
          }))
          .filter((c: any) => c.currency && c.dialCode);

        const sorted = formatted.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sorted);
        setFilteredCountries(sorted);
      } catch (err) {
        toast.error("Failed to load countries");
      } finally {
        setCountryLoading(false);
      }
    }

    fetchCountries();
  }, []);

  // Filter countries
  useEffect(() => {
    const results = countries.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchQuery, countries]);

  // Handle country selection
  const handleSelectCountry = (c: any) => {
    setCountry(c.name);
    setCurrency(c.currency);
    setShowCountryDropdown(false);
    setSearchQuery("");

    // Add country code to phone
    setPhone(c.dialCode);
  };

  // Validate phone number
  const isValidPhone = (number: string, countryCode: string) => {
    try {
      const selectedCountry = countries.find((c) => c.name === countryCode);
      if (!selectedCountry) return false;

      const phoneNumber = parsePhoneNumberFromString(
        number,
        selectedCountry.name as any
      );
      return phoneNumber?.isValid() || false;
    } catch {
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !currency ||
      !phone
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      // Validate phone
      const selectedCountry = countries.find((c) => c.name === country);
      if (!selectedCountry || !isValidPhone(phone, country)) {
        toast.error("Invalid phone number for selected country");
        return;
      }
      toast.error("Invalid phone number for selected country");
      return;
    }

    setLoading(true);

    try {
      const user = await registerUser({
        name,
        username,
        email,
        password,
        country,
        currency,
        phone,
      });

      if (user) toast.success(`Welcome, ${user.name || "Investor"}! 🚀`);

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCountry("");
      setCurrency("");
      setPhone("");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar mode="dark" />
      <Toaster position="top-right" />

      <div className="min-h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1642790106110-34e66e4ae79e?auto=format&fit=crop&w=1350&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-[95%] max-w-3xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-10 text-white"
        >
          <div className="flex items-center justify-center mb-6">
            <Logo mode="dark" />
          </div>

          <h3 className="text-center text-2xl font-semibold mb-6 text-gray-200">
            Create Your Investor Account 🚀
          </h3>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            onSubmit={handleRegister}
          >
            <div className="md:col-span-1">
              <InputField
                icon={<User className="text-yellow-400" />}
                placeholder="Full Name"
                value={name}
                onChange={setName}
              />
            </div>
            <div className="md:col-span-1">
              <InputField
                icon={<User className="text-yellow-400" />}
                placeholder="Username"
                value={username}
                onChange={setUsername}
              />
            </div>
            <div className="md:col-span-1">
              <InputField
                icon={<Mail className="text-yellow-400" />}
                placeholder="Email Address"
                value={email}
                onChange={setEmail}
              />
            </div>
            <div className="md:col-span-1">
              <InputField
                icon={<Phone className="text-yellow-400" />}
                placeholder="Phone Number"
                value={phone}
                onChange={setPhone}
              />
            </div>

            <div className="md:col-span-1 relative">
              <div
                className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20 cursor-pointer"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                <Globe className="text-yellow-400" />
                <input
                  readOnly
                  placeholder="Select Country"
                  value={country}
                  className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 cursor-pointer"
                />
              </div>

              {showCountryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 w-full max-h-72 overflow-auto bg-black/90 border border-white/20 rounded-lg shadow-lg z-20"
                >
                  <div className="flex items-center gap-2 px-3 py-2 bg-black/40 sticky top-0 border-b border-white/10">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search country..."
                      className="bg-transparent text-sm outline-none w-full text-gray-200 placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {countryLoading ? (
                    <p className="text-center py-3 text-gray-400 text-sm">
                      Loading countries...
                    </p>
                  ) : filteredCountries.length === 0 ? (
                    <p className="text-center py-3 text-gray-400 text-sm">
                      No country found
                    </p>
                  ) : (
                    filteredCountries.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectCountry(c)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer"
                      >
                        <img src={c.flag} className="w-6 h-4 rounded-sm" />
                        <p>{c.name}</p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </div>

            <div className="md:col-span-1">
              <InputField
                placeholder="Currency"
                value={currency}
                onChange={setCurrency}
                disabled
              />
            </div>
            <div className="md:col-span-1">
              <InputField
                icon={<Lock className="text-yellow-400" />}
                placeholder="Password"
                type="password"
                value={password}
                onChange={setPassword}
              />
            </div>
            <div className="md:col-span-1">
              <InputField
                icon={<Lock className="text-yellow-400" />}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>
            <div className="md:col-span-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:opacity-90 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </div>
          </form>

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

// InputField Component
function InputField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled = false,
}: any) {
  return (
    <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
