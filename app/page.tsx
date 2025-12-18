"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./shared/Header";
import MessageCard from "./components/message-card";

const images = [
  "/assets/landing-img-1.png",
  "/assets/landing-img-2.png",
  "/assets/landing-img-3.png",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const newIndex = Math.min(images.length - 1, Math.floor(scrollY / vh));

      setIndex(newIndex);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <div className="mt-6 p-10">
          <div className="text-6xl font-medium mt-6 ml-6 leading-normal">
            Find Your Perfect,
            <br />
            Laptop Friendly Workspace
          </div>
          <button
            className="bg-white text-black py-2 px-8 rounded-[50px] ml-6 mt-6 text-xl"
            disabled
          >
            Find Now!
          </button>
        </div>
      </div>

      {/* SCROLL STORY SECTION */}
      <div className="h-[100vh] relative mt-20">
        <div className="sticky top-0 h-screen max-w-[1200px] mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

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
