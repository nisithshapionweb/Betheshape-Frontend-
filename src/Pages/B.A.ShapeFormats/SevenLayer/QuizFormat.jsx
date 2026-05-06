import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from "react-confetti";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const QuizFormat = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Step 1: State গুলো
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  // 🆕 নতুন স্টেট: এটি নির্ধারণ করবে ইউজার রিভিউ মোডে আছে নাকি রেজাল্ট স্ক্রিনে
  const [isReviewing, setIsReviewing] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { data: mcqFields = [] } = useQuery({
    queryKey: ["mcqFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/mcqField");
      
      return res.data?.data || [];
    },
  });

  // ✅ Step 2: TanStack Query (অপরিবর্তিত)
  const {
    data: questions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizQuestions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/mcq");
      return res.data;
    },
    onError: (err) => {
      toast.error("Failed to load quiz questions!");
      console.error("Fetch Error:", err);
    },
  });

  // 🆕 Step 3: স্কোরিং গ্রেড ফাংশন
  const getScoreGrade = (correctCount, totalQuestions) => {
    if (totalQuestions === 0) return { text: "N/A", color: "text-gray-500" };

    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage >= 80) {
      return { text: "Good", color: "text-green-600" };
    } else if (percentage >= 50) {
      return { text: "Normal", color: "text-yellow-600" };
    } else {
      return { text: "Very Poor", color: "text-red-600" };
    }
  };

  // ✅ Step 4: হ্যান্ডেলার
  const handleAnswerChange = (questionId, selectedAnswer) => {
    if (submitted) return; // সাবমিট হয়ে গেলে আর উত্তর পরিবর্তন করা যাবে না

    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const wrongCount = questions.length - correctCount;
    setResult({ correct: correctCount, wrong: wrongCount });
    setSubmitted(true);
    // সাবমিটের পর রিভিউ মোড ডিজেবল থাকবে, রেজাল্ট স্ক্রিন দেখাবে
    setIsReviewing(false);
  };

  // 🆕 রিভিউ শুরু করার জন্য বাটন হ্যান্ডেলার
  const handleStartReview = () => {
    setIsReviewing(true);
    setCurrentQuestionIndex(0); // প্রথম প্রশ্নে চলে যাবে
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setResult({ correct: 0, wrong: 0 });
    setIsReviewing(false); // রিসেটের পর রিভিউ মোড অফ
    setCurrentQuestionIndex(0);
  };

  // ✅ Step 5: সহায়ক ভ্যারিয়েবল
  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerSelected = currentQuestion && answers[currentQuestion._id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const { text: gradeText, color: gradeColor } = getScoreGrade(
    result.correct,
    questions.length,
  );

  // 🆕 Step 6: অপশন কালার নির্ধারণের ফাংশন (পরিবর্তন নেই, শুধু submitted এর বদলে isReviewing দিয়ে নিয়ন্ত্রণ হবে)
  const getOptionClasses = (option) => {
    const isCorrect = option === currentQuestion.correctAnswer;
    const isUserSelected = answers[currentQuestion._id] === option;
    const isUserAnswerCorrect =
      answers[currentQuestion._id] === currentQuestion.correctAnswer;

    // যদি কুইজ সাবমিট না হয় (উত্তর দেওয়ার মোড)
    if (!submitted) {
      return isUserSelected
        ? "bg-teal-100 border-teal-500"
        : "border-gray-300 hover:bg-gray-100";
    }

    // যদি রিভিউ মোডে থাকে
    if (isReviewing) {
      if (isCorrect) {
        // সবুজ: সঠিক উত্তর (সবসময় দেখানো হবে)
        return "bg-green-200 border-green-600 font-bold";
      }
      if (isUserSelected && !isUserAnswerCorrect) {
        // লাল: ব্যবহারকারী ভুল উত্তর সিলেক্ট করেছে
        return "bg-red-200 border-red-600 font-bold";
      }
      // অন্য উত্তরগুলো স্বাভাবিক থাকবে
      return "border-gray-300";
    }

    // যখন submitted true কিন্তু isReviewing false (অর্থাৎ রেজাল্ট স্ক্রিন)
    return "border-gray-300";
  };

  // ✅ Step 7: লোডিং/এরর স্ক্রিন (অপরিবর্তিত)
  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-600 text-center font-semibold">
        Error: {error.message || "Failed to load questions."}
      </div>
    );
  }

  if (isLoading || questions.length === 0) {
    // ... (Loading UI অপরিবর্তিত)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-teal-500 animate-pulse">
          Loading Quiz Questions... ⏳
        </h2>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-600 text-center font-semibold">
        No quiz questions available.
      </div>
    );
  }

  // ----------------------------------------------------
  // ✅ Step 8: মূল কুইজ UI রেন্ডার করা
  // ----------------------------------------------------

  return (
    <div className="max-w-[1400px] mx-auto bg-white shadow-lg rounded-2xl p-6 my-10">
      {mcqFields.map((mcqField, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-6 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8"
        >
              {/* Background Decorative Shape */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
          <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
            {mcqField.title}
          </h2>
          <p className="text-base text-justify text-gray-700 mb-8">
            {mcqField.description}
          </p>
        </div>
      ))}

      {/* 🆕 রেজাল্ট স্ক্রিন: শুধুমাত্র সাবমিট হওয়ার পর দেখাবে, যদি রিভিউ মোডে না থাকে */}
      {submitted && !isReviewing && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center p-5 mb-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-xl border border-teal-100 overflow-hidden min-h-[70vh]"
        >
          {/* 🎉 Confetti Animation */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={2000}
            gravity={0.25}
          />

          {/* ✅ Animated Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <FaCheckCircle className="text-7xl text-teal-500 drop-shadow-lg" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-extrabold text-teal-700 mb-4"
          >
            🎯 Quiz Completed Successfully!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl font-semibold mb-2"
          >
            Your Grade:{" "}
            <span className={`text-3xl ${gradeColor}`}>{gradeText}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center flex-wrap gap-4 mt-4"
          >
            <p className="text-lg text-green-600 font-semibold">
              ✅ Correct: {result.correct}
            </p>
            <p className="text-lg text-red-500 font-semibold">
              ❌ Wrong: {result.wrong}
            </p>
            <p className="text-lg text-gray-600 font-semibold">
              Total: {questions.length}
            </p>
          </motion.div>

          {/* 🎈 Floating Bubbles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, x: Math.random() * 100 - 50 }}
              animate={{
                y: [0, -100, -200, -300],
                x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [1, 0.8, 0.5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute rounded-full bg-teal-200 opacity-30"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                bottom: "-40px",
              }}
            />
          ))}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-4 mt-28 relative z-10"
          >
            <button
              onClick={handleStartReview}
              type="button"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition shadow-md"
            >
              👀 Review Answers
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition shadow-md"
            >
              🔁 Try Again
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* কুইজ ফর্ম/রিভিউ মোড: সাবমিট না হওয়া পর্যন্ত অথবা রিভিউ মোডে থাকা পর্যন্ত দেখাবে */}
      {(!submitted || isReviewing) && (
        <form
          onSubmit={submitted ? (e) => e.preventDefault() : handleSubmit}
          className="space-y-8"
        >
          {/* প্রশ্ন প্রদর্শন */}
          <div
            key={currentQuestion._id}
            className={`border p-5 rounded-xl ${
              isReviewing ? "border-gray-300" : "bg-gray-50"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h3>

            <div className="space-y-2">
              {[
                currentQuestion.answer1,
                currentQuestion.answer2,
                currentQuestion.answer3,
                currentQuestion.answer4,
              ]
                .filter(Boolean)
                .map((option, i) => (
                  <label
                    key={i}
                    className={`block p-3 rounded-md border transition-colors ${getOptionClasses(
                      option,
                    )} ${isReviewing ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      value={option}
                      checked={answers[currentQuestion._id] === option}
                      onChange={() =>
                        !isReviewing &&
                        handleAnswerChange(currentQuestion._id, option)
                      }
                      className="mr-2"
                      disabled={isReviewing || submitted} // রিভিউ মোডে এবং সাবমিটেড অবস্থায় ডিজেবল থাকবে
                    />
                    {option}
                  </label>
                ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* নেভিগেশন বাটন */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
              }
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Previous
            </button>

            {/* Submit Button: শুধুমাত্র যখন submitted নয় তখনই দেখাবে */}
            {!submitted && isLastQuestion && (
              <button
                type="submit"
                disabled={!isAnswerSelected}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isAnswerSelected
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Submit Quiz
              </button>
            )}

            {/* Next বাটন */}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={!isReviewing && !isAnswerSelected}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  !isReviewing && !isAnswerSelected
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                Next
              </button>
            )}

            {/* 🆕 Review Finish/Try Again বাটন: শুধুমাত্র রিভিউ মোডে শেষ প্রশ্নে দেখা যেতে পারে */}
            {isReviewing && isLastQuestion && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsReviewing(false)} // রেজাল্ট স্ক্রিনে ফিরে যান
                  type="button"
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  Go to Results
                </button>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  🔁 Try Again
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizFormat;
