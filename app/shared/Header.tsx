"use client";

import React from "react";
import { Tooltip } from "../components/tooltip";
import Link from "next/link";
/**
 * A reusable Next.js functional component.
 * @param {ComponentNameProps} props The component props.
 */
const Header: React.FC = () => {
  return (
    <div className="border-1 border-[#6F6F6F] rounded-[50px] px-4 my-8 flex justify-between items-center sticky">
      <div className="font-title text-3xl font-bold pl-4">
        <Link href="/">
          <img src="/assets/logo.png" alt="" />
        </Link>
      </div>
      <div className="flex gap-10">
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
    </div>
  );
};

export default Header;
