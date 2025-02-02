"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MemoryCompletion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedImage = searchParams.get("image");

  const [completedMemories, setCompletedMemories] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("completedMemories");
    if (storedCount) setCompletedMemories(parseInt(storedCount, 10));
  }, []);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 flex flex-col items-center text-center">
      {/* Celebration Banner */}
      <div className="bg-[#0BC654] w-full py-6 rounded-lg flex flex-col items-center relative overflow-visible">
        <h1 className="text-3xl font-bold text-white">Memory Lane</h1>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white">{completedMemories}</h1>
          <h1 className="text-lg font-bold text-white">Memories Explored</h1>
        </div>

        {/* Mobile SVG */}
        <img
          src="/Group 2476.svg"
          alt="Memory Garden Mobile"
          className="w-full h-auto max-h-[13vh] sm:hidden object-contain absolute bottom-[-40%] translate-x-[30%] left-0"
        />

        {/* Desktop SVG */}
        <img
          src="/Group 2476.svg"
          alt="Bunny Illustration"
          className="hidden sm:flex w-full h-auto max-h-[20vh] object-contain absolute bottom-[-50%] translate-x-[30%] left-0"
        />
      </div>
      <h1 className="text-2xl font-bold text-black-700">
        Keep Exploring Memories:
      </h1>
      <p className="mb-6 text-center text-lg text-muted-foreground">
        Tap on a memory that you want to replay
      </p>
      {/* Display Selected Memory */}
      {selectedImage && (
        <div className="mt-6">
          <img
            src={selectedImage}
            alt="Selected Memory"
            className="w-40 h-40 rounded-xl"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-4 w-full max-w-[300px]">
        <button
          className="px-6 py-3 bg-[#1DB0F7] text-white text-lg font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
          onClick={() => router.push("/")}
        >
          Return Home
        </button>
        <button
          className="px-6 py-3 bg-gray-200 text-gray-700 text-lg font-bold rounded-xl hover:scale-105 transition-transform"
          onClick={() => router.push("/memories")}
        >
          Explore More Memories
        </button>
      </div>
    </div>
  );
};

export default MemoryCompletion;
