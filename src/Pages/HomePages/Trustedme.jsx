import {
  FaAward,
  FaChartLine,
  FaClipboardCheck,
  FaEdit,
  FaQuestionCircle,
  FaSearch,
  FaTrophy
} from "react-icons/fa";

const features = [
  {
    icon: <FaQuestionCircle className="text-[#d49c5b] text-2xl" />,
    title: "Smart Grammar Practice",
    description:
      "Practice essential grammar topics like tense, articles, prepositions, and sentence formation with clear and simple guidance.",
  },
  {
    icon: <FaEdit className="text-[#d49c5b] text-2xl" />,
    title: "Step-by-Step Learning Path",
    description:
      "Follow a structured learning system that improves your English writing, reading, and understanding step by step.",
  },
  {
    icon: <FaClipboardCheck className="text-[#d49c5b] text-2xl" />,
    title: "Instant Feedback System",
    description:
      "Get instant corrections and explanations to understand your mistakes and improve faster.",
  },
  {
    icon: <FaSearch className="text-[#d49c5b] text-2xl" />,
    title: "Topic-Based Practice",
    description:
      "Practice vocabulary, idioms, verbs, and grammar topics through organized and focused exercises.",
  },
  {
    icon: <FaTrophy className="text-[#d49c5b] text-2xl" />,
    title: "Skill Growth Tracking",
    description:
      "Track your learning progress and see your improvement clearly over time.",
  },
  {
    icon: <FaAward className="text-[#d49c5b] text-2xl" />,
    title: "Structured Learning System",
    description:
      "A well-organized system that helps you build strong English skills step by step.",
  },
  {
    icon: <FaChartLine className="text-[#d49c5b] text-2xl" />,
    title: "Progressive Practice",
    description:
      "Improve continuously with exercises designed to strengthen vocabulary and grammar.",
  },

  {
    icon: <FaQuestionCircle className="text-[#d49c5b] text-2xl" />,
    title: "Interactive Quiz Practice",
    description:
      "Test your English skills through interactive quizzes and real-life usage questions.",
  },

  
  {
    icon: <FaTrophy className="text-[#d49c5b] text-2xl" />,
    title: "Top University Insights",
    description:
      "Explore top universities and prepare for global education opportunities.",
  },
  

  




];
const WhyJoinQuizPlatform = () => {
  return (
    <div className="relative w-full rounded-md overflow-hidden bg-[#d49c5b]">
      <div className="max-w-[1400px] mx-auto px-4 py-16 relative z-10">
        <div className="">
          
          {/* Left Section */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Learn With Be The Shape?
            </h2>

            {/* ✨ YOUR TEXT (REFINED, NOT CHANGED) */}
            <p className="mb-8 text-lg text-white/90 leading-relaxed text-justify">
              Be The Shape is a platform where we aim to gently enhance English
              proficiency. At the same time, we are trying to build a space that
              reflects a passionate lifestyle, positivity, and a logical thought
              process.
              <br /><br />
              It is a thoughtful blend of modern trends and nostalgic values,
              combined with a continuous learning journey that feels meaningful
              and personal.
              <br /><br />
              Hopefully, this platform will support mental growth in an abstract
              way and help even during moments of absence of mind, bringing a
              sense of clarity and direction.
              <br /><br />
              So, if you feel the need for a little guidance to organize your
              thoughts, shape your mindset, and build a strong direction for your
              career path and lifestyle — Be The Shape will always try to connect
              with you.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm text-justify">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default WhyJoinQuizPlatform;