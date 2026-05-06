import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpenCheck,
  Brain,
  Lightbulb,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <div>
      <Helmet>
        <title>Be The Shape | About</title>
        <meta
          name="description"
          content="Be The Shape is an English learning and self-growth platform with structured learning, quizzes, videos, PDFs, and mindset development."
        />
      </Helmet>

      <div className="py-5 max-w-[1400px] mx-auto px-2">
        <TittleAnimation
          tittle="About"
          subtittle="Learn, Grow & Transform Yourself"
        />

        {/* TITLE */}
        <motion.h1
          className="text-2xl lg:text-3xl font-bold mb-8 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Be The Shape — A Journey of Learning, Mindset, and Self-Growth
        </motion.h1>

        {/* INTRO */}
        <motion.p
          className="mb-6 text-lg leading-relaxed text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Be The Shape is a modern English learning and self-growth platform
          where structured learning, interactive practice, and mindset
          development come together. Our goal is to help learners improve their
          English skills while building confidence and a positive thinking
          mindset.
        </motion.p>

        {/* PARAGRAPH 2 */}
        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          We focus on real learning — not just theory. Through quizzes, PDF
          notes, videos, books, and practical exercises, learners can improve
          grammar, vocabulary, writing, and communication skills step by step.
        </motion.p>

        {/* SECTION TITLE */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <Users className="text-green-600" />
          What You Get From Be The Shape
        </motion.h2>

        {/* FEATURES */}
      {/* FEATURES */}
<motion.ul className="space-y-4 mb-8" initial="hidden" animate="visible">
  {[
    {
      icon: <Brain className="text-purple-600 mt-1" />,
      text: (
        <>
          <strong>Smart Learning System</strong> for structured English
          improvement step by step with clear learning paths.
        </>
      ),
    },
    {
      icon: <BookOpenCheck className="text-indigo-600 mt-1" />,
      text: (
        <>
          <strong>Quizzes, PDFs & Video Lessons</strong> to learn grammar,
          vocabulary, and real-life English usage in an interactive way.
        </>
      ),
    },
    {
      icon: <Lightbulb className="text-yellow-500 mt-1" />,
      text: (
        <>
          <strong>Mindset & Lifestyle Growth</strong> to improve focus,
          positivity, discipline, and self-development.
        </>
      ),
    },
    {
      icon: <BarChart3 className="text-cyan-600 mt-1" />,
      text: (
        <>
          <strong>Progress Tracking System</strong> to monitor your learning
          improvement step by step and stay motivated.
        </>
      ),
    },

    {
      icon: <BookOpenCheck className="text-green-600 mt-1" />,
      text: (
        <>
          <strong>PDF Notes & Study Materials</strong> for structured learning,
          revision, and offline study support.
        </>
      ),
    },
    {
      icon: <Brain className="text-pink-600 mt-1" />,
      text: (
        <>
          <strong>Interactive Quiz Practice</strong> covering grammar,
          vocabulary, sentence structure, and real-world usage.
        </>
      ),
    },
    {
      icon: <Lightbulb className="text-orange-500 mt-1" />,
      text: (
        <>
          <strong>Writing & Expression Practice</strong> to improve sentence
          formation, paragraph writing, and communication skills.
        </>
      ),
    },
    {
      icon: <BarChart3 className="text-blue-600 mt-1" />,
      text: (
        <>
          <strong>Real-Life Conversation Training</strong> to help you speak
          English confidently in daily situations.
        </>
      ),
    },
    {
      icon: <BookOpenCheck className="text-purple-500 mt-1" />,
      text: (
        <>
          <strong>Books & Learning Resources</strong> to expand your knowledge
          and strengthen English skills.
        </>
      ),
    },
    {
      icon: <Brain className="text-indigo-500 mt-1" />,
      text: (
        <>
          <strong>Educational Video Lessons</strong> for easy understanding of
          grammar and communication skills.
        </>
      ),
    },
    {
      icon: <BarChart3 className="text-emerald-600 mt-1" />,
      text: (
        <>
          <strong>Top University Guidance</strong> to explore global academic
          opportunities and career preparation.
        </>
      ),
    },
    {
      icon: <Lightbulb className="text-yellow-600 mt-1" />,
      text: (
        <>
          <strong>Job Interview Preparation</strong> to improve communication
          and confidence for career success.
        </>
      ),
    },
    {
      icon: <Brain className="text-red-500 mt-1" />,
      text: (
        <>
          <strong>History & Old Memories Learning</strong> to connect language
          with culture and knowledge.
        </>
      ),
    },
    {
      icon: <BookOpenCheck className="text-cyan-700 mt-1" />,
      text: (
        <>
          <strong>Songs, Movies & Culture Learning</strong> to improve English
          naturally through entertainment.
        </>
      ),
    },
    {
      icon: <BarChart3 className="text-purple-700 mt-1" />,
      text: (
        <>
          <strong>Nobel & Knowledge Content</strong> to learn inspiring global
          achievements and ideas.
        </>
      ),
    },
    {
      icon: <Lightbulb className="text-green-500 mt-1" />,
      text: (
        <>
          <strong>AI Tools & Useful Websites</strong> to enhance productivity
          and smart learning experience.
        </>
      ),
    },
  ].map((item, index) => (
    <motion.li
      key={index}
      className="flex items-start gap-3 text-justify"
      custom={5 + index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      {item.icon}
      <span>{item.text}</span>
    </motion.li>
  ))}
</motion.ul>

        {/* FINAL PARAGRAPH */}
        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={9}
        >
          At Be The Shape, every learner matters. We don’t just teach English —
          we help you build communication skills, confidence, and a better
          mindset for your future. Everything is designed to make your learning
          journey simple, structured, and effective.
        </motion.p>

        {/* CTA */}
        <motion.p
          className="text-xl font-semibold text-blue-700 mt-10 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={11}
        >
          ✨ Start your journey today — learn English, build confidence, and
          grow your future with Be The Shape.
        </motion.p>
      </div>
    </div>
  );
};

export default About;