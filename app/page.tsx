"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Header from "./shared/Header";
import MessageCard from "./components/message-card";
import WiggleOnScroll from "./components/wiggle-ons-scroll";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Adjust these numbers based on image width
  const topX = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const bottomX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <div className="relative">
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <div className="mt-6 p-10">
          <div className="text-6xl font-medium mt-6 ml-6 leading-normal relative">
            Find Your Perfect,
            <br />
            Laptop Friendly Workspace
            <WiggleOnScroll />
          </div>
          <button
            className="bg-white text-black py-2 px-8 rounded-[50px] ml-6 mt-6 text-xl"
            disabled
          >
            Find Now!
          </button>
        </div>
      </div>

      <section ref={ref} className="relative overflow-hidden">
        {/* STICKY VIEWPORT */}
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-16">
          {/* TOP SCROLL RIGHT */}
          <motion.img
            src="/assets/scroll-1.png"
            alt=""
            style={{ x: topX }}
            className="w-[100%] max-w-none"
          />

          {/* BOTTOM SCROLL LEFT */}
          <motion.img
            src="/assets/scroll-2.png"
            alt=""
            style={{ x: bottomX }}
            className="w-[100%] max-w-none"
          />
        </div>
      </section>

      <div className="max-w-[1300px] mx-auto mt-20 flex gap-20 flex justify-center">
        <div className="border-6 rounded-[40px] border-[#5e5e5e] bg-[#262626] max-w-[300px]">
          <img src="/assets/card-img-sample.png" alt="" />
          <div className="p-6">
            <div className="font-title font-medium text-xl">
              1. This is the thing
            </div>
            <div className="text-md text-[#a0a0a0] pt-2">
              You'll see beautiful web analytics in 1 minute. Oh, and the script
              loads super fast (4kb).
            </div>
          </div>
        </div>
        <div className="border-6 rounded-[40px] border-[#5e5e5e] bg-[#262626] max-w-[300px]">
          <img src="/assets/card-img-sample.png" alt="" />
          <div className="p-6">
            <div className="font-title font-medium text-xl">
              1. This is the thing
            </div>
            <div className="text-md text-[#a0a0a0] pt-2">
              You'll see beautiful web analytics in 1 minute. Oh, and the script
              loads super fast (4kb).
            </div>
          </div>
        </div>
        <div className="border-6 rounded-[40px] border-[#5e5e5e] bg-[#262626] max-w-[300px]">
          <img src="/assets/card-img-sample.png" alt="" />
          <div className="p-6">
            <div className="font-title font-medium text-xl">
              1. This is the thing
            </div>
            <div className="text-md text-[#a0a0a0] pt-2">
              You'll see beautiful web analytics in 1 minute. Oh, and the script
              loads super fast (4kb).
            </div>
          </div>
        </div>
      </div>
      <div className="my-40">
        <MessageCard />
      </div>

      <div>
        <div className="rounded-[48px] bg-[#343434] max-w-[1300px] mx-auto flex items-center justify-center py-8 mb-16">
          <div>
            <div className="font-title text-3xl font-bold text-center">
              Caff
            </div>
            <div className="flex gap-12 pt-8">
              <div>Pricing</div>
              <div>Pricing</div>
              <div>Pricing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
