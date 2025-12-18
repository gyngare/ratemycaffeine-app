"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function MessageCard() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={ref} className="my-32 max-w-[1200px] mx-auto flex justify-center">
      <motion.div
        style={{ rotate, x, opacity }}
        className="
          relative
          w-full max-w-[720px]
          rounded-[28px]
          bg-[#1e1e1e]
          p-10
          text-white
          shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.6)]
          will-change-transform
        "
      >
        <h2 className="text-3xl font-medium mb-4">Hi,</h2>

        <p className="text-lg text-white/80 leading-relaxed">
          I’m Geary Audie. A software engineer working remotely.
          <br />I built ratemycaffeine.com to solve an issue I saw firsthand,
          how to find work friendly cafe(s) around the world.
        </p>

        <p className="mt-6 text-lg font-medium">
          If I can do it, you can do it too. Start building stuff now!
        </p>
      </motion.div>
    </div>
  );
}
