"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const words = ["Perfect", "Cozy", "Comfy", "Quiet"];

export default function AnimatedWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-block text-center"
      style={{ width: "8ch" }} // 👈 controls spacing
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute left-0 right-0"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible spacer to prevent layout shift */}
      <span className="opacity-0 font-semibold">Serendipitous</span>
    </span>
  );
}
