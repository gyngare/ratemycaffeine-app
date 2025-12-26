"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Tooltip } from "../components/tooltip";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Cafe = {
  placeId: string;
  name: string;
  imageUrl: string;
  address: string;
  googleRating: number | null;
  ratingCount: number;
};

const PAGE_SIZE = 6;

export default function Listing() {
  const [city, setCity] = useState("");
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCafes = async (pageNumber = 1) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/cafes?page=${pageNumber}&pageSize=${PAGE_SIZE}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch cafes");
      }

      const data = await res.json();

      setCafes(data.cafes);
      setPage(pageNumber);
      setTotalPages(data.totalPages);
    } catch {
      setError("Something went wrong fetching cafes");
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setCity("");
    setCafes([]);
    setPage(1);
    setTotalPages(0);
  };

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <header className="border-b border-[#3B3B3B]">
        <div className="max-w-[1000px] mx-auto px-8 flex justify-between items-center">
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-[100px] lg:w-full max-w-[125px]"
            />
          </Link>
          <div className="gap-10 hidden md:flex">
            <Tooltip content="Coming soon 👀">
              <span className="cursor-pointer text-sm">Best cafe</span>
            </Tooltip>
            <Tooltip content="Coming soon 👀">
              <span className="cursor-pointer text-sm">Best coffee(s)</span>
            </Tooltip>
            <Tooltip content="Coming soon 👀">
              <span className="cursor-pointer text-sm">Contribute</span>
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

              <SheetContent
                side="right"
                className="w-[280px] z-[100] border-l-0"
              >
                <div className="mt-8 ml-4 flex flex-col gap-6">
                  <Tooltip content="Coming soon 👀">
                    <span className="cursor-pointer text-lg">Best cafe</span>
                  </Tooltip>
                  <Tooltip content="Coming soon 👀">
                    <span className="cursor-pointer text-lg">
                      Best coffee(s)
                    </span>
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
        </div>
      </header>

      <main className="max-w-[650px] mx-auto mt-16">
        <div className="bg-[#2A2A2A] rounded-xl shadow-lg mx-6">
          <div className="text-center flex justify-center py-4">
            <div className="pt-4 pb-2 text-xl lg:text-2xl">
              Let's Find Your Perfect Cafe!
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-2 justify-center mx-auto pb-8 px-4">
            <div className="relative w-full max-w-[400px]">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city (e.g. Jakarta, Bali)"
                className="
                  pr-10
                  py-4
                  bg-[#1f1f1f]
                  border-[#3B3B3B]
                  focus-visible:ring-0
                  focus-visible:border-[#3B3B3B]
                "
              />

              {city && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-white
                    hover:cursor-pointer
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              onClick={() => fetchCafes(1)}
              disabled={!city || loading}
              className="bg-white text-black text-xs hover:bg-gray-200 hover:cursor-pointer"
            >
              Find my cafe!
            </Button>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}
        </div>
      </main>

      {/* Results */}
      <ul className="flex flex-wrap p-4 gap-10 justify-center mt-10 max-w-[1200px] mx-auto">
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading &&
          cafes.map((cafe) => (
            <li
              key={cafe.placeId}
              className="
                border-6 rounded-[40px]
                border-[#5e5e5e]
                bg-[#262626]

                w-[300px]
                overflow-hidden
              "
            >
              {cafe.imageUrl && (
                <div className="relative w-full h-[225px]">
                  <Image
                    src={cafe.imageUrl}
                    alt={cafe.name}
                    fill
                    className="object-cover rounded-t-[30px]"
                    sizes="350px"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="font-title font-medium text-xl">
                  {cafe.name}
                </div>
                <div className="text-md text-[#a0a0a0] pt-2"></div>
                <div className="text-md text-[#a0a0a0] pt-2">
                  Quiet and cozy:{" "}
                  <span className="font-medium text-white">83%</span> <br />
                  Wifi reliability:{" "}
                  <span className="font-medium text-white">83%</span> <br />
                  Recommended cafe:{" "}
                  <span className="font-medium text-white">83%</span> <br />
                  Plugs availability:{" "}
                  <span className="font-medium text-white">83%</span> <br />
                </div>
                <button></button>

                {/* {cafe.googleRating && (
                  <p className="text-sm pt-2">
                    ⭐ {cafe.googleRating} ({cafe.ratingCount})
                  </p>
                )} */}
              </div>
            </li>
          ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchCafes}
        />
      )}
    </div>
  );
}

/* ---------- Skeleton Card ---------- */

function SkeletonCard() {
  return (
    <li
      className="
        border-6 rounded-[40px]
        border-[#5e5e5e]
        bg-[#262626]
        min-w-[350px]
        overflow-hidden
      "
    >
      <Skeleton className="w-full h-[225px] rounded-t-[30px] bg-[#3B3B3B]" />

      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-[#3B3B3B]" />
        <Skeleton className="h-4 w-full bg-[#3B3B3B]" />
        <Skeleton className="h-4 w-1/2 bg-[#3B3B3B]" />
      </div>
    </li>
  );
}

/* ---------- Pagination component ---------- */

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10 mb-20">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded border border-[#3B3B3B] disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-gray-400">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded border border-[#3B3B3B] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
