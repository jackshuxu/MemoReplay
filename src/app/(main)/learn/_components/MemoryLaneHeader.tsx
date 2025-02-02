"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const imageNames = [
  "IMG_3887.JPG",
  "IMG_3897.JPG",
  "IMG_3898.JPG",
  "IMG_3899.JPG",
  "IMG_3900.JPG",
  "IMG_3901.JPG",
  "IMG_3902.JPG",
  "IMG_3903.JPG",
];

const mockImages = imageNames
  .slice(0, 4)
  .map((name) => `/hongkongMock/${name}`);

const MemoryLaneHeader = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Load selected image from localStorage (in case of refresh)
  useEffect(() => {
    const storedImage = localStorage.getItem("selectedMemoryImage");
    if (storedImage) setSelectedImage(storedImage);
  }, []);

  // Handle image selection
  const handleSelectImage = (src: string) => {
    setSelectedImage(src);
    localStorage.setItem("selectedMemoryImage", src); // Persist selection
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-neutral-700">Choose a Memory</h1>
      <p className="mb-6 text-center text-lg text-muted-foreground">
        Tap on a photo that you want to relive
      </p>

      {/* Memory Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
        {mockImages.map((src, index) => (
          <div
            key={index}
            className={`group h-48 w-48 border-2 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110 
              ${selectedImage === src ? "border-[#0BC654] border-2" : "border-[#1DB0F7] border-2"}`}
            onClick={() => handleSelectImage(src)}
          >
            <img
              src={src}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover rounded-l"
            />
          </div>
        ))}
      </div>

      {/* Done Button */}
      <button
        onClick={() => router.push("/memoryQuestion")}
        disabled={!selectedImage}
        className={`mt-6 px-6 py-3 text-white text-lg font-semibold rounded-xl shadow-md transition-transform
          ${selectedImage ? "bg-[#1DB0F7] hover:scale-105" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Done →
      </button>
    </div>
  );
};

export default MemoryLaneHeader;
