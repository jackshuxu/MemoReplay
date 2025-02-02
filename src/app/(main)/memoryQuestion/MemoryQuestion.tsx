"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Rive } from "@rive-app/canvas";

const mockQuestions = [
  {
    imageID: 1,
    questionText: "Was this memory from the summer or winter?",
    optionA: "Summer",
    optionB: "Winter",
    correctAnswer: "Summer",
  },
  {
    imageID: 1,
    questionText: "Was this memory with a lot of people around?",
    optionA: "Yes",
    optionB: "No",
    correctAnswer: "Yes",
  },
  {
    imageID: 1,
    questionText: "Was this memory during the daytime or nighttime?",
    optionA: "Daytime",
    optionB: "Nighttime",
    correctAnswer: "Daytime",
  },
  {
    imageID: 1,
    questionText: "Were you indoors or outdoors in this memory?",
    optionA: "Indoors",
    optionB: "Outdoors",
    correctAnswer: "Outdoors",
  },
  {
    imageID: 2,
    questionText: "What were you doing in this memory?",
    optionA: "Eating",
    optionB: "Walking",
    optionC: "Shopping",
    optionD: "Resting",
    correctAnswer: "Eating",
  },
  {
    imageID: 2,
    questionText: "Was it a busy time when you were eating?",
    optionA: "Yes",
    optionB: "No",
    correctAnswer: "Yes",
  },
  {
    imageID: 2,
    questionText: "Was this meal homemade or from a restaurant?",
    optionA: "Homemade",
    optionB: "Restaurant",
    correctAnswer: "Restaurant",
  },
  {
    imageID: 2,
    questionText: "Did you enjoy the food you were eating?",
    optionA: "Yes",
    optionB: "No",
    correctAnswer: "Yes",
  },
];

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
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image");

  const [completedMemories, setCompletedMemories] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("completedMemories");
    if (storedCount) setCompletedMemories(parseInt(storedCount, 10));
  }, []);
  useEffect(() => {
    const storedImage = localStorage.getItem("selectedMemoryImage");
    if (storedImage) {
      setSelectedImage(storedImage);
      const assignedImageID = Math.floor(Math.random() * 2) + 1;
      setImageID(assignedImageID);
      setQuestions(mockQuestions.filter((q) => q.imageID === assignedImageID));
      setQuestionIndex(0);
    }

    // Initialize speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
      };
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (incorrectAnswer) {
      const timer = setTimeout(() => {
        setIncorrectAnswer(false);
        if (questionIndex >= questions.length - 1) {
          setShowVoiceMemo(true);
        } else {
          setQuestionIndex((prevIndex) => prevIndex + 1);
        }
        setSelectedAnswer(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [incorrectAnswer]);

  const handleContinue = () => {
    if (showVoiceMemo) {
      const newCount = completedMemories + 1;
      localStorage.setItem("completedMemories", newCount.toString());
      router.push(`/memoryCompletion?image=${encodeURIComponent(image)}`);
      return;
    }
    if (selectedAnswer === questions[questionIndex]?.correctAnswer) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowVoiceMemo(true);
      }
    } else {
      setIncorrectAnswer(true);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      setTranscription("");
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 flex flex-col items-center">
      {selectedImage && !incorrectAnswer && (
        <div className="h-64 w-64 border-4 border-[#1DB0F7] rounded-xl overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected Memory"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {!showVoiceMemo && questions.length > 0 && !incorrectAnswer && (
        <>
          <h2 className="text-2xl font-bold my-4 text-center">
            {questions[questionIndex]?.questionText}
          </h2>
          <div className="my-4">
            <img
              src="/Group 2474.svg"
              alt="Memory Garden Mobile"
              className="w-full h-auto max-h-[60vh] sm:hidden object-contain scale-110 translate-x-[-50%]"
            />

            <img
              src="/Group 2474.svg"
              alt="Bunny Illustration"
              className="hidden sm:flex w-full h-auto max-h-[50vh] object-contain scale-120 translate-x-[-50%]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
            {[
              questions[questionIndex]?.optionA,
              questions[questionIndex]?.optionB,
              questions[questionIndex]?.optionC,
              questions[questionIndex]?.optionD,
            ]
              .filter(Boolean)
              .map((option: string, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border-2 font-bold transition-all duration-200 
    ${
      selectedAnswer === option
        ? "bg-[#1DB0F7] text-white shadow-[0_0_10px_#1DB0F7]"
        : "bg-white text-[#939393]"
    }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        </>
      )}

      {incorrectAnswer && (
        <div className="text-2xl font-bold text-center mt-6">
          We’ll revisit this memory next time!
          <div className="relative w-50% h-[200px] sm:h-[300px]">
            <img src="/Newww.gif" alt="Loading animation" />
          </div>
        </div>
      )}

      {showVoiceMemo && !incorrectAnswer && (
        <>
          <h2 className="text-2xl font-bold text-center mt-6">
            {voiceMemoQuestions[0]}
          </h2>
          <button
            className={`mt-4 w-full py-4 text-lg font-bold rounded-xl border-2 ${isRecording ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={toggleRecording}
          >
            {isRecording ? "🛑 Recording..." : "🎤 Tap to Speak"}
          </button>
          <div className="mt-4 w-full bg-gray-100 rounded-xl p-4 min-h-[100px] text-xl leading-relaxed text-gray-700">
            {transcription || "Your spoken response will appear here..."}
          </div>
        </>
      )}

      <button
        className="mt-6 px-6 py-3 bg-[#1DB0F7] text-white text-lg font-bold rounded-xl shadow-md hover:scale-105 transition-transform bottom-20"
        disabled={showVoiceMemo ? !transcription : !selectedAnswer}
        onClick={handleContinue}
      >
        Continue →
      </button>
    </div>
  );
};

export default MemoryQuestion;
