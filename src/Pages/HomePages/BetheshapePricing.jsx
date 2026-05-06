import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const BetheshapePricing = () => {
  return (
    <section className="bg-white py-10">
      
      {/* Section Header */}
      <div className="text-center mb-12 px-2 md:px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-teal-700">
          Be the Shape Learning Plans <span className="text-lg md:text-2xl">(Upgrade Your English and Elevate Your Knowledge.)</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ইংরেজি শেখা এখন আরও সহজ। আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন এবং আজই শুরু করুন।
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">

        {/* Free Plan */}
        <div className="bg-white border border-teal-100 rounded-2xl shadow-lg p-10 flex flex-col justify-between hover:shadow-xl transition duration-300">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-teal-700">Free Plan</h3>
            <p className="text-gray-500 mb-6">শুরু করার জন্য সেরা</p>

            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              ৳০ <span className="text-lg text-gray-500">/মাস</span>
            </h1>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                প্রতিদিন ৫টি ফ্রি কুইজ
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Basic Grammar Lessons
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Vocabulary Practice
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Leaderboard Access
              </li>
            </ul>
          </div>

          {/* ✅ Free Plan Link */}
          <Link
            to="/pdf-download"
            className="mt-8 w-full inline-block text-center py-3 rounded-xl font-semibold bg-teal-100 text-teal-700 hover:bg-teal-200 transition-all duration-300"
          >
            ফ্রি শুরু করুন →
          </Link>
        </div>

        {/* Basic Plan */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-between border-2 border-teal-200 scale-105">
          
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            ⭐ Most Popular
          </span>

          <div>
            <h3 className="text-2xl font-bold mb-2 text-teal-700">Basic Plan</h3>
            <p className="text-gray-500 mb-6">
              যারা সিরিয়াসভাবে ইংরেজি শিখতে চান
            </p>

            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              ৳ ৫০<span className="text-lg text-gray-500">/মাস</span>
            </h1>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Unlimited Daily Quizzes
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Advanced Grammar Course
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Mock Tests & Exam Preparation
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-teal-600 w-5 h-5" />
                Progress Tracking Dashboard
              </li>
            </ul>
          </div>

          {/* ✅ Basic Plan Link */}
          <Link
            to="/ba-shape-format-payment-confirmed"
            className="mt-8 w-full inline-block text-center py-3 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Basic কিনুন →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BetheshapePricing;