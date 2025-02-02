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

// Voice memo question
const voiceMemoQuestions = [
  "Does the photo remind you of a specific time in your life?",
  "What emotions does this memory bring up?",
  "If you could relive this moment, what would you do differently?",
];

const MemoryQuestion = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageID, setImageID] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showVoiceMemo, setShowVoiceMemo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false); // New state for incorrect answer
  const router = useRouter();
  let recognition: SpeechRecognition | null = null;

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

  useEffect(() => {
    if (incorrectAnswer) {
      const timer = setTimeout(() => {
        setIncorrectAnswer(false);
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null); // Reset answer for next question
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [incorrectAnswer]);

  const handleContinue = () => {
    if (showVoiceMemo) {
      router.push("/memoryCompletion");
      return;
    }

    if (selectedAnswer === questions[questionIndex]?.correctAnswer) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null); // Reset answer for next question
      } else {
        setShowVoiceMemo(true); // Show voice memo question after multiple-choice
      }
    } else {
      setIncorrectAnswer(true); // Show incorrect answer message
    }
  };

  // 🎤 Start Speech Recognition
  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += result + " "; // Append only final results
        }
      }

      setTranscription((prev) => prev + finalTranscript); // Add to previous text
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 flex flex-col items-center">
      {/* Display Selected Memory */}
      {selectedImage && !incorrectAnswer && (
        <div className="h-64 w-64 border-4 border-[#1DB0F7] rounded-xl overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected Memory"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Multiple-Choice Questions */}
      {!showVoiceMemo && questions.length > 0 && !incorrectAnswer && (
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

      {/* Incorrect Answer Message */}
      {incorrectAnswer && (
        <div className="text-2xl font-bold text-center mt-6">
          We’ll revisit this memory next time!
        </div>
      )}

      {/* Voice Memo Question */}
      {showVoiceMemo && (
        <>
          <h2 className="text-2xl font-bold text-center mt-6">
            {voiceMemoQuestions[0]} {/* Always asks one question */}
          </h2>

          {/* 🎤 Tap to Speak Button */}
          <button
            className={`mt-4 w-full py-4 text-lg font-bold rounded-xl border-2 ${
              isRecording
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? "🛑 Recording..." : "🎤 Tap to Speak"}
          </button>

          {/* 📝 Transcription Display */}
          <div className="mt-4 w-full bg-gray-100 rounded-xl p-4 min-h-[100px] text-xl leading-relaxed text-gray-700">
            {transcription || "Your spoken response will appear here..."}
          </div>
        </>
      )}

      {/* Continue Button */}
      <button
        className="mt-6 px-6 py-3 bg-[#1DB0F7] text-white text-lg font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
        disabled={showVoiceMemo ? !transcription : !selectedAnswer}
        onClick={handleContinue}
      >
        Continue →
      </button>
      <button
        className="mt-4 px-6 py-2 bg-gray-300 text-gray-700 text-lg font-bold rounded-xl shadow-md hover:bg-gray-400 transition-transform"
        onClick={() => {
          if (questionIndex < questions.length - 1) {
            setQuestionIndex((prevIndex) => prevIndex + 1);
          } else {
            handleContinue(); // If it's the last question, proceed
          }
        }}
      >
        Skip Question
      </button>
    </div>
  );
};

export default MemoryQuestion;
