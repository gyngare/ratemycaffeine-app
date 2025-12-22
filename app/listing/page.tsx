"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <div>
      <header className="border-b border-[#3B3B3B]">
        <div className="max-w-[1300px] mx-auto">
          <img src="/assets/logo.png" alt="" />
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto mt-16">
        <div className="bg-[#2A2A2A] rounded-xl shadow-lg">
          <div className="text-center flex justify-center py-4">
            <img src="/assets/logo.png" alt="" />
          </div>

          {/* Search */}
          <div className="flex gap-2 justify-center mx-auto pb-12 px-4">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city (e.g. Jakarta, Bali)"
              className="border border-[#3B3B3B] rounded px-3 py-2 w-full max-w-[700px]"
            />
            <button
              onClick={() => fetchCafes(1)}
              className="bg-white text-black px-4 py-2 rounded hover:cursor-pointer"
            >
              Let's find some cafe!
            </button>
          </div>

          {loading && <p className="text-center">Loading cafes…</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>
      </main>

      {/* Results */}
      <ul className="flex flex-wrap p-4 gap-10 justify-center mt-10 max-w-[1400px] mx-auto">
        {cafes.map((cafe) => (
          <li
            key={cafe.placeId}
            className="
              border-6 rounded-[40px]
              border-[#5e5e5e]
              bg-[#262626]
              max-w-[350px]
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
              <div className="font-title font-medium text-xl">{cafe.name}</div>
              <div className="text-md text-[#a0a0a0] pt-2">{cafe.address}</div>

              {cafe.googleRating && (
                <p className="text-sm pt-2">
                  ⭐ {cafe.googleRating} ({cafe.ratingCount})
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchCafes}
        />
      )}
    </div>
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

      <span className="text-sm text-gray-400 hover:cursor-pointer">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded border border-[#3B3B3B] disabled:opacity-40 hover:cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
