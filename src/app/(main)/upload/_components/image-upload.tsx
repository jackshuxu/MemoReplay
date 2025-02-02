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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string>("");

  // Function to perform the upload
  const uploadFile = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResult = await uploadImageToS3(formData);
      setResult(uploadResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection from the hidden input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // This function is called when the icon is clicked.
  // If no file is selected, it triggers the file chooser.
  // If a file is already selected, it initiates the upload.
  const handleIconClick = () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
    } else {
      uploadFile();
    }
  };

  const renderLoadingOverlay = (): JSX.Element => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <p>Uploading and generating questions...</p>
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
      <div className="flex flex-col items-center">
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
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Upload Result */}
      {result && (
        <div className="mt-4">
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p>
              Successfully uploaded image and generated {result.questionsCount}{" "}
              questions!
            </p>
            <img
              src={result.imageUrl}
              alt="Uploaded"
              className="mt-4 max-w-md rounded shadow"
            />
          </div>
        </div>
      )}

      {loading && renderLoadingOverlay()}
    </div>
  );
};
