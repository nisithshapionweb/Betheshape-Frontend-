import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "Betheshape দিয়ে English শেখা কেন আলাদা?",
    answer:
      "Betheshape একটি thoughtfully designed learning platform যেখানে আপনি step-by-step একটি clear learning path অনুসরণ করতে পারেন। Grammar, vocabulary, reading এবং quiz-based practice এর মাধ্যমে আপনি ধীরে ধীরে নিজের skill build করতে পারবেন। এখানে learning random না — structured, focused এবং real-life usability ভিত্তিক।",
  },
  {
    question: "Basic plan নিলে কী extra সুবিধা পাবো?",
    answer:
      "Basic plan আপনাকে সম্পূর্ণ learning experience দেয়। আপনি পাবেন unlimited quiz access, advanced grammar lessons, mock tests এবং একটি detailed progress tracking system। এতে আপনি নিজের দুর্বলতা বুঝে দ্রুত improve করতে পারবেন।",
  },
  {
    question: "Free plan vs Basic plan — পার্থক্য কী?",
    answer:
      "Free plan হলো শুরু করার জন্য একটি simple entry point — limited access সহ। আর Basic plan হলো full experience — যেখানে আপনি unlimited practice, complete course access এবং performance tracking পাবেন যা দ্রুত improvement নিশ্চিত করে।",
  },
  {
    question: "কত দিনে improvement দেখা যাবে?",
    answer:
      "আপনি যদি প্রতিদিন ২০–৩০ মিনিট নিয়মিত practice করেন, তাহলে সাধারণত ৩০–৬০ দিনের মধ্যে noticeable improvement দেখতে পাবেন। Consistency এখানে সবচেয়ে বড় factor।",
  },
  {
    question: "Quiz কি exam preparation-এ help করবে?",
    answer:
      "হ্যাঁ। আমাদের quizzes এবং mock tests এমনভাবে design করা হয়েছে যাতে job পরীক্ষা, university admission এবং competitive exams-এর English section-এর জন্য প্রস্তুতি নেওয়া সহজ হয়।",
  },
  {
    question: "Mobile দিয়ে কি ব্যবহার করা যাবে?",
    answer:
      "অবশ্যই। Betheshape fully responsive — আপনি mobile, tablet বা desktop যেকোনো device থেকেই smooth experience পাবেন।",
  },
  {
    question: "Payment করার পর access কবে পাবো?",
    answer:
      "Payment successful হওয়ার সাথে সাথেই আপনার account-এ Basic plan activate হয়ে যাবে। কোনো delay নেই — instant access।",
  },
  {
    question: "Progress track করা যাবে?",
    answer:
      "হ্যাঁ, আপনার জন্য একটি smart dashboard থাকবে যেখানে quiz score, lesson completion এবং overall performance clearly দেখা যাবে — যাতে আপনি নিজের growth বুঝতে পারেন।",
  },
  {
    question: "Problem হলে কী করবো?",
    answer:
      "যেকোনো সমস্যা হলে আপনি আমাদের support team-এ যোগাযোগ করতে পারেন। আমরা যত দ্রুত সম্ভব আপনাকে সাহায্য করার চেষ্টা করবো। Email: support@betheshape.com",
  },
  {
    question: "এখনই শুরু করা কেন গুরুত্বপূর্ণ?",
    answer:
      "English skill আপনার career এবং confidence দুটোই বদলে দিতে পারে। আপনি যত তাড়াতাড়ি শুরু করবেন, তত দ্রুত improvement পাবেন — আর Betheshape সেই journey-টা সহজ করে দেয়।",
  },
];

const BetheshapeFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white via-teal-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* 🔥 Premium Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-teal-700">
           Discover Everything You Need to Know
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Betheshape নিয়ে আপনার যেসব প্রশ্ন থাকতে পারে, সেগুলোর সহজ ও পরিষ্কার উত্তর এখানে দেওয়া হয়েছে।
            তারপরও যদি কিছু জানতে চান — আমরা আছি আপনার পাশে।
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border backdrop-blur-md transition-all duration-300
                ${
                  isActive
                    ? "bg-white border-teal-400 shadow-xl"
                    : "bg-white/80 border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-3 text-left"
                >
                  <span className="font-semibold text-gray-800 text-base md:text-lg">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300
                    ${isActive ? "rotate-180 text-teal-600" : "text-gray-400"}`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BetheshapeFAQ;