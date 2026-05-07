import {
  FaBookOpen,
  FaBuilding,
  FaChartLine,
  FaGlobeAsia,
  FaLayerGroup,
  FaQuestionCircle,
  FaTasks,
  FaUniversity,
  FaUserTie
} from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen className="text-[#d49c5b] text-2xl" />,
    title: "Smart Grammar Practice",
    description:
      "Practice important English grammar topics like tense, articles, prepositions, and sentence structure with simple explanations.",
  },

  {
    icon: <FaUserTie className="text-[#d49c5b] text-2xl" />,
    title: "Professional Lifestyle",
    description:
      "Develop professional communication skills and improve your English for academic and career success.",
  },

  {
    icon: <FaBuilding className="text-[#d49c5b] text-2xl" />,
    title: "Corporate Information",
    description:
      "Learn essential business and corporate communication styles to strengthen your professional English abilities.",
  },

  {
    icon: <FaGlobeAsia className="text-[#d49c5b] text-2xl" />,
    title: "Global University List",
    description:
      "Explore top universities around the world and prepare yourself for international education opportunities.",
  },

  {
    icon: <FaChartLine className="text-[#d49c5b] text-2xl" />,
    title: "Skill Growth Tracking",
    description:
      "Track your learning progress and monitor your improvement step by step with organized performance insights.",
  },

  {
    icon: <FaLayerGroup className="text-[#d49c5b] text-2xl" />,
    title: "Structured Learning System",
    description:
      "Follow a well-planned learning path designed to build strong English skills gradually and effectively.",
  },

  {
    icon: <FaTasks className="text-[#d49c5b] text-2xl" />,
    title: "Progressive Practice",
    description:
      "Improve continuously with structured exercises focused on vocabulary, grammar, reading, and writing skills.",
  },

  {
    icon: <FaQuestionCircle className="text-[#d49c5b] text-2xl" />,
    title: "Interactive Quiz Practice",
    description:
      "Test your English skills through interactive quizzes, exercises, and real-life communication scenarios.",
  },

  {
    icon: <FaUniversity className="text-[#d49c5b] text-2xl" />,
    title: "Top University Insights",
    description:
      "Get valuable insights about top-ranked universities, admission preparation, and global study opportunities.",
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