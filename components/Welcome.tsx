"use client";
import { ArrowRight, Bike, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeProps {
  nextStep: (step: number) => void;
}

function Welcome({ nextStep }: WelcomeProps) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-center p-6 gap-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2"
      >
        <Bike className="w-9 h-9 md:w-12 md:h-12 text-green-700" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-green-700">
          DeliverX
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-sm md:max-w-xl text-gray-600 text-base md:text-lg leading-relaxed px-2"
      >
        Fast delivery that brings essentials to your door in minutes — with
        real-time tracking.
      </motion.p>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex gap-8 md:gap-14"
      >
        <PackageOpen
          className="w-12 h-12 md:w-20 md:h-20 text-green-700 drop-shadow-md"
          strokeWidth={2}
        />
        <Bike
          className="w-12 h-12 md:w-20 md:h-20 text-orange-500 drop-shadow-md"
          strokeWidth={2}
        />
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3"
      >
        {["⚡ 10-min delivery", "📍 Live tracking", "🛡️ Safe & secure"].map(
          (b) => (
            <span
              key={b}
              className="text-xs md:text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-medium border border-green-200"
            >
              {b}
            </span>
          ),
        )}
      </motion.div>

      {/* Steps — mobile তে hidden, md তে দেখাবে */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="hidden md:grid grid-cols-3 gap-3 w-full max-w-sm"
      >
        {[
          { label: "Browse", sub: "Pick items" },
          { label: "Order", sub: "Place & pay" },
          { label: "Track", sub: "Live updates" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-green-100 rounded-xl p-3 text-center"
          >
            <div className="text-sm font-semibold text-green-700">
              {s.label}
            </div>
            <div className="text-xs text-gray-400">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => nextStep(2)}
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 py-3 px-8 md:py-4 md:px-10 text-white rounded-2xl shadow-lg transition-all duration-200 font-semibold text-base md:text-lg"
      >
        Get Started <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

export default Welcome;
