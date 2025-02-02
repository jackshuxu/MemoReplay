"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Mocked questions data
const mockQuestions = [
  {
    imageID: 1,
    questionText: "Did you go skiing in this memory?",
    optionA: "Yes",
    optionB: "No",
    correctAnswer: "Yes",
  },
  {
    imageID: 1,
    questionText: "What type of ski did you use?",
    optionA: "Alpine",
    optionB: "Nordic",
    optionC: "Freestyle",
    optionD: "Touring",
    correctAnswer: "Alpine",
  },
  {
    imageID: 2,
    questionText: "What activity did you do in this memory?",
    optionA: "Hiking",
    optionB: "Swimming",
    optionC: "Shopping",
    optionD: "Eating",
    correctAnswer: "Hiking",
  },
  {
    imageID: 2,
    questionText: "Did you take any breaks while hiking?",
    optionA: "Yes",
    optionB: "No",
    correctAnswer: "Yes",
  },
];

const MemoryQuestion = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageID, setImageID] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedMemoryImage");

    if (storedImage) {
      setSelectedImage(storedImage);

      // Mock imageID selection (in real app, get it dynamically)
      const assignedImageID = Math.floor(Math.random() * 2) + 1;
      setImageID(assignedImageID);

      // Filter questions for the selected image
      const filteredQuestions = mockQuestions.filter(
        (q) => q.imageID === assignedImageID
      );
      setQuestions(filteredQuestions);
      setQuestionIndex(0); // Reset question index
    }
  }, []);

  const handleContinue = () => {
    if (selectedAnswer === questions[questionIndex]?.correctAnswer) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null); // Reset answer for next question
      } else {
        router.push("/memoryCompletion");
      }
    } else {
      alert("Incorrect! Try again.");
    }
  };

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 flex flex-col items-center">
      {/* Display Selected Memory */}
      {selectedImage ? (
        <div className="h-64 w-64 border-4 border-[#1DB0F7] rounded-xl overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected Memory"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <p className="text-lg text-gray-500">No memory selected.</p>
      )}

      {/* Display Question */}
      {questions.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-4 text-center">
            {questions[questionIndex].questionText}
          </h2>

          {/* Display answer options */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
            {[
              questions[questionIndex].optionA,
              questions[questionIndex].optionB,
              questions[questionIndex].optionC,
              questions[questionIndex].optionD,
            ]
              .filter(Boolean) // Remove null options for boolean questions
              .map((option: string, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border-2 font-bold ${
                    selectedAnswer === option
                      ? "bg-[#1DB0F7] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        </>
      )}

      {/* Continue Button */}
      <button
        className="mt-6 px-6 py-3 bg-[#1DB0F7] text-white text-lg font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
        disabled={!selectedAnswer}
        onClick={handleContinue}
      >
        Continue →
      </button>
    </div>
  );
};

export default MemoryQuestion;
