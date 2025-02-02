"use client";
import { uploadImageToS3 } from "@/actions/s3-upload";
import { useState } from "react";

interface UploadResult {
  success: boolean;
  imageUrl: string;
  questionsCount: number;
}

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
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

      const result = await uploadImageToS3(formData);
      setResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Choose Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {selectedFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? "Processing..." : "Upload"}
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {result && (
        <div className="mb-6">
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
