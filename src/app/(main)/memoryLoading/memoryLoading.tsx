"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const MemoryLoading = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image");

  useEffect(() => {
    if (image) {
      setTimeout(() => {
        router.push(`/memoryQuestion?image=${encodeURIComponent(image)}`);
      }, 5000);
    }
  }, [image, router]);

  return (
    <div className="mx-auto h-screen max-w-[912px] px-3 flex flex-col items-center text-center relative">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-3 px-4">
        <button className="text-gray-500 text-xl sm:text-2xl">✕</button>
      </div>

      {/* Content Box (Larger on Mobile) */}
      <div className="bg-white w-full sm:max-w-[90%] md:max-w-[400px] p-6 sm:p-8 rounded-lg ">
        <h1 className="text-2xl sm:text-3xl font-bold text-black-700 text-left ">
          Hi!
        </h1>
        <p className="text-lg sm:text-xl font-bold text-black-700 mt-4 text-left ">
          Pull from your magical garden of memories. I will show you a photo and
          you answer!
        </p>

        <div className="flex flex-col items-left">
          <div className="loader size w-full h-full"></div>
          <button
            className="mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-[#1DB0F7] text-white text-lg sm:text-xl font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
            onClick={() => router.push("/memoryQuestion")}
          >
            Continue →
          </button>
        </div>

        {/* Continue Button (Larger on Mobile) */}
      </div>

      {/* Bunny & Garden SVG - Switch for Mobile */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        {/* Show on Mobile (sm and below) */}
        <img
          src="/Group 2475.svg"
          alt="Memory Garden Mobile"
          className="w-full h-auto max-h-[60vh] sm:hidden object-contain"
        />

        {/* Show on Larger Screens (md and up) */}
        <img
          src="/Group 2473.svg"
          alt="Memory Garden Desktop"
          className="hidden sm:flex w-full h-auto max-h-[50vh] object-contain"
        />
      </div>
    </div>
  );
};

export default MemoryLoading;
