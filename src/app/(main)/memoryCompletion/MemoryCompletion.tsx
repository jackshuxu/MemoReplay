"use client";
import { useRouter } from "next/navigation";

const MemoryCompletion = () => {
  const router = useRouter();

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 flex flex-col items-center text-center">
      {/* Celebration Banner */}
      <div className="bg-[#0BC654] w-full py-6 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white">Memory Lane</h1>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white">11</h1>
          <h1 className="text-lg font-bold text-white">Memories Explored</h1>
        </div>
      </div>

      <div className="mt-6">
        <img
          src="/happy-bunny.png" // Replace with actual image path
          alt="Celebration Bunny"
          className="w-40 h-40"
        />
      </div>

      <h1 className="text-2xl font-bold text-black-700">
        Keep Exploring Memories:
      </h1>
      <p className="mb-6 text-center text-lg text-muted-foreground">
        Tap on a photo that you want to relive
      </p>
      {/* Memory Grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-[200px]">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="group h-16 w-16 border-2 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110"
            // onClick handler can be removed if no selection is needed
          >
            {/* Empty content, just the grey square */}
          </div>
        ))}
      </div>

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
