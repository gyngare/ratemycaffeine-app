"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const cards = [1, 2, 3];

export default function StepsCard() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="mt-40">
      <div className="h-[200vh]">
        <div className="sticky top-32">
          <div className="max-w-[1300px] mx-auto flex gap-20 justify-center">
            {cards.map((_, i) => {
              const start = i / cards.length;
              const middle = start + 0.15;
              const end = start + 0.3;

              const scale = useTransform(
                scrollYProgress,
                [start, middle, end],
                [1, 1.15, 1]
              );

              const y = useTransform(
                scrollYProgress,
                [start, middle, end],
                [0, -30, 0]
              );

              const opacity = useTransform(
                scrollYProgress,
                [start, middle, end],
                [0.6, 1, 0.6]
              );

              return (
                <motion.div
                  key={i}
                  style={{ scale, y, opacity }}
                  className="
                    border-6 rounded-[40px]
                    border-[#5e5e5e]
                    bg-[#262626]
                    max-w-[300px]
                    will-change-transform
                  "
                >
                  <img src="/assets/card-img-sample.png" alt="" />
                  <div className="p-6">
                    <div className="font-title font-medium text-xl">
                      {i + 1}. This is the thing
                    </div>
                    <div className="text-md text-[#a0a0a0] pt-2">
                      You'll see beautiful web analytics in 1 minute. Oh, and
                      the script loads super fast (4kb).
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
