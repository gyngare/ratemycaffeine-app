"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    title: "Step one",
    description: "This is you. You go to cafe, it's all noise. What do we do?",
  },
  {
    title: "Step two",
    description:
      "Discover laptop-friendly cafes with great WiFi, power outlets, and vibes.",
  },
  {
    title: "Step three",
    description:
      "Rate, review, and help others find the perfect place to work remotely.",
  },
];

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
            {steps.map((step, i) => {
              const start = i / steps.length;
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
                      {i + 1}. {step.title}
                    </div>
                    <div className="text-md text-[#a0a0a0] pt-2">
                      {step.description}
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
