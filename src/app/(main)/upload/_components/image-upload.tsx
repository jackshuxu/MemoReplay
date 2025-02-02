"use client";
import { useRef, useState } from "react";
import { uploadImageToS3 } from "@/actions/s3-upload";

interface UploadResult {
  success: boolean;
  imageUrl: string;
  questionsCount: number;
}

export const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [memories, setMemories] = useState<UploadResult[]>([]);

  // This function uploads the file immediately upon selection.
  const uploadFile = async (file: File): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImageToS3(formData);
      // Append the new upload result to the memories list.
      setMemories((prev) => [...prev, result]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // When a file is selected, immediately trigger the upload.
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadFile(file);
      // Clear the input so the same file can be re-selected if needed.
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Clicking the icon simply triggers the file input.
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  // Loading overlay while the upload is in progress.
  const renderLoadingOverlay = (): JSX.Element => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <p>Uploading and generating questions...</p>
        <div className="loader"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Memories</h1>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Single Upload Icon Button */}
      <div className="flex flex-col items-center mb-8">
        <button
          type="button"
          onClick={handleIconClick}
          disabled={loading}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
        >
          {/* SVG icon representing upload */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4-4 4M12 16V8"
            />
          </svg>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Memories You’ve Explored Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Your Memories</h2>
        {memories.length === 0 ? (
          <p className="text-gray-600">No memories uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {memories.map((memory, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded overflow-hidden"
              >
                <img
                  src={memory.imageUrl}
                  alt={`Memory ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {loading && renderLoadingOverlay()}
    </div>
  );
};
