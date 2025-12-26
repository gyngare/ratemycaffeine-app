"use client";

import React from "react";
import { Tooltip } from "../components/tooltip";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { scrollY } = useScroll();

  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(20,20,20,0.6)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["#3b3b3b", "rgba(111,111,111,0.4)"]
  );

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.div
      style={{ background, borderColor }}
      className="
        fixed top-0 left-1/2
        -translate-x-1/2
        w-[calc(100%-32px)] max-w-[1200px]
        border
        rounded-[50px]
        px-4
        py-0
        my-8
        flex
        justify-between
        items-center
        z-50
        backdrop-blur-md
        transition-colors
        lg:py-2
        lg:top-4
      "
    >
      {/* Logo */}
      <div className="font-title text-3xl font-bold pl-4">
        <Link href="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[100px] lg:w-[150px]"
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="gap-10 hidden md:flex">
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

      {/* Desktop Login */}
      {session?.user ? (
        <div className="mr-10 hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:cursor-pointer bg-white rounded-[50px] text-black">
                {session?.user?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel onClick={() => handleSignOut()}>
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="mr-10 hidden lg:block">
          <Link href="/login">
            <button className="bg-white text-black py-2 px-8 rounded-[50px] hover:cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* Mobile Menu */}
      <div className="mr-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open menu">
              <img src="/assets/menu-icon.png" alt="menu" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] z-[100] border-l-0">
            <SheetHeader>
              {/* <SheetTitle className="text-left">Menu</SheetTitle> */}
            </SheetHeader>

            <div className="mt-8 ml-4 flex flex-col gap-6">
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer text-lg">Best cafe</span>
              </Tooltip>
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer text-lg">Best coffee(s)</span>
              </Tooltip>
              <Tooltip content="Coming soon 👀">
                <span className="cursor-pointer text-lg">Contribute</span>
              </Tooltip>

              <Link href="/login">
                <button className="mt-6 mr-4 bg-white text-black py-2 px-8 rounded-xl hover:cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
};

export default Header;
