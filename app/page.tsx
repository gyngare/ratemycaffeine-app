"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Header from "./shared/Header";
import MessageCard from "./components/message-card";
import WiggleOnScroll from "./components/wiggle-ons-scroll";
import { Tooltip } from "./components/tooltip";
import StepsCard from "./components/steps-card";
import AnimatedWord from "./components/animated-word";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const topX = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const bottomX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <div className="relative">
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <div className="mt-32 p-10 flex flex-col justify-center">
          <div className="text-4xl lg:text-6xl font-medium mt-6 text-center leading-normal relative">
            Find Your Own,
            <br />
            <span className="inline-flex items-baseline">
              <AnimatedWord />
              Workspace
            </span>
            <span className="hidden md:block lg:block">
              <WiggleOnScroll />
            </span>
          </div>
          <Tooltip content="Coming soon 👀">
            <button
              className="bg-white text-black py-2 px-8 rounded-[50px] mx-auto mt-14 text-xl text-center"
              disabled
            >
              Find Now!
            </button>
          </Tooltip>
        </div>
      </div>

      <section ref={ref} className="relative overflow-hidden">
        <div className="flex flex-col my-0 gap-4 lg:my-16 lg:gap-16">
          <motion.img
            src="/assets/scroll-1.png"
            alt=""
            style={{ x: topX }}
            className="w-[100%] max-w-none"
          />

          <motion.img
            src="/assets/scroll-2.png"
            alt=""
            style={{ x: bottomX }}
            className="w-[100%] max-w-none"
          />
        </div>
      </section>

      <StepsCard />
      <div className="my-40 mx-4">
        <MessageCard />
      </div>

      <div className="mx-4">
        <div className="rounded-[48px] bg-[#343434] max-w-[1300px] mx-auto flex items-center justify-center py-8 mb-16">
          <div>
            <div className="font-title text-3xl font-bold text-center">
              <img src="/assets/logo.png" alt="" className="mx-auto" />
            </div>
            <div className="flex gap-12 pt-8">
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer">Best cafe</span>
              </Tooltip>
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer">Best coffee(s)</span>
              </Tooltip>
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer">Contribute</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
