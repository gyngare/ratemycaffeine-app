"use client";

import React from "react";
/**
 * A reusable Next.js functional component.
 * @param {ComponentNameProps} props The component props.
 */
const Header: React.FC = () => {
  return (
    <div className="border-1 border-[#6F6F6F] rounded-[50px] p-4 my-8 flex justify-between items-center">
      <div className="font-title text-3xl font-bold pl-4">Caff</div>
      <div className="flex gap-10">
        <div>pricing</div>
        <div>pricing</div>
        <div>pricing</div>
      </div>
      <div>
        <button
          className="bg-white text-black py-2 px-8 rounded-[50px]"
          disabled
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
