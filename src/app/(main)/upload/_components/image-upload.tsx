"use client";

import { generateQuestionsForImage } from "@/actions/openai";
import { useState } from "react";

interface GenerateResult {
  success: boolean;
  questionsGenerated: number;
}

export const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // First simulate inserting the image to get an ID
      const imageId = 1; // In real app, this would come from your image upload

      const result = await generateQuestionsForImage(imageId);
      setResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingOverlay = (): JSX.Element => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <p>Generating questions...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Memories</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImageUrl(e.target.value)
            }
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? "Processing memory..." : "Upload"}
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Successfully generated {result.questionsGenerated} questions!
        </div>
      )}

      {loading && renderLoadingOverlay()}
    </div>
  );
};
