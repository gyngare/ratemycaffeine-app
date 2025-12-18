"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const wiggles = [
  {
    src: "/assets/wiggle-1.png",
    className: "absolute right-72 top-20",
  },
  {
    src: "/assets/wiggle-2.png",
    className: "absolute right-70 top-20",
  },
  {
    src: "/assets/wiggle-3.png",
    className: "absolute right-66 top-24",
  },
];

export default function WiggleOnScroll() {
  const lastScrollY = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY.current ? "down" : "up";

      const step = 40;

      if (direction === "down" && index < wiggles.length - 1) {
        if (currentY > (index + 1) * step) {
          setIndex(index + 1);
        }
      }

      if (direction === "up" && index > 0) {
        if (currentY < index * step) {
          setIndex(index - 1);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [index]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={wiggles[index].src}
        src={wiggles[index].src}
        className={wiggles[index].className}
        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 5, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </AnimatePresence>
  );
}
