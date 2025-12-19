"use client";

import React from "react";
import { Tooltip } from "../components/tooltip";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

const Header: React.FC = () => {
  const { scrollY } = useScroll();

  // Fade / blur after scrolling down a bit
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(20,20,20,0.6)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(111,111,111,1)", "rgba(111,111,111,0.4)"]
  );

  return (
    <motion.div
      style={{
        background,
        borderColor,
      }}
      className="
        fixed top-4 left-1/2
        -translate-x-1/2 
      w-[calc(100%-16px)] max-w-[1200px]
        border
        rounded-[50px]
        px-4
        my-8
        flex
        justify-between
        items-center
        z-50
        backdrop-blur-md
        transition-colors
      "
    >
      <div className="font-title text-3xl font-bold pl-4">
        <Link href="/">
          <img src="/assets/logo.png" alt="" />
        </Link>
      </div>

      <div className="gap-10 hidden md:flex lg:flex">
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

      <div className="mr-10">
        <Tooltip content="Coming soon 👀">
          <button
            className="bg-white text-black py-2 px-8 rounded-[50px]"
            disabled
          >
            Login
          </button>
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default Header;
