import { motion } from "framer-motion";
import {
  AlertCircle,
  Ban,
  FileText,
  Globe,
  Link2,
  ShieldCheck,
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

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Be The Shape | Terms & Conditions</title>
        <meta
          name="description"
          content="Terms and conditions of Be The Shape including usage rules, content policy, and legal guidelines."
        />
      </Helmet>

      <div className="px-2 py-5 max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Terms & Conditions"
          subtittle="Rules for Using Our Platform"
        />

        {/* INTRO */}
        <motion.h1
          className="text-2xl lg:text-3xl font-bold mb-6 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Welcome to Be The Shape
        </motion.h1>

        <motion.p
          className="mb-6 text-lg leading-relaxed text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          By accessing and using <strong>Be The Shape</strong>, you agree to
          follow the terms and conditions described below. These rules are
          designed to ensure a safe, fair, and structured learning environment
          for all users of our platform.
        </motion.p>

        {/* COOKIES */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={3}
        >
          <ShieldCheck className="text-green-600" />
          Use of Cookies
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={4}
        >
          We use cookies to improve your browsing experience, analyze user
          activity, and optimize platform performance. By continuing to use the
          site, you agree to our cookie usage.
        </motion.p>

        {/* INTELLECTUAL PROPERTY */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={5}
        >
          <FileText className="text-purple-600" />
          Intellectual Property
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={6}
        >
          All content including lessons, quizzes, videos, PDFs, and learning
          materials on <strong>Be The Shape</strong> are protected. You may use
          them only for personal learning purposes. Copying, reselling, or
          redistributing content without permission is strictly prohibited.
        </motion.p>

        {/* LINKING */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={7}
        >
          <Link2 className="text-cyan-600" />
          Hyperlinking Policy
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={8}
        >
          Certain organizations may link to our website without prior approval.
          However, educational, business, or commercial platforms must request
          permission before linking to our content.
        </motion.p>

        {/* IFRAMES */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={9}
        >
          <Ban className="text-red-600" />
          Content Display Restrictions
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={10}
        >
          You are not allowed to frame, embed, or alter the appearance of our
          website without written permission from Be The Shape.
        </motion.p>

        {/* CONTENT LIABILITY */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={11}
        >
          <AlertCircle className="text-orange-500" />
          Content Responsibility
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={12}
        >
          We are not responsible for external websites or third-party content
          linked to or from our platform. Users are responsible for verifying
          external information.
        </motion.p>

        {/* LINK REMOVAL */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={13}
        >
          <Globe className="text-blue-500" />
          Link Removal Requests
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={14}
        >
          If any link on our website is found inappropriate, users may request
          removal. We will review such requests but are not obligated to take
          immediate action.
        </motion.p>

        {/* DISCLAIMER */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          custom={15}
        >
          <ShieldCheck className="text-gray-700" />
          Disclaimer
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          custom={16}
        >
          Be The Shape provides educational content for learning purposes only.
          We do not guarantee complete accuracy or uninterrupted service. Users
          are responsible for how they use the information.
        </motion.p>

        {/* FINAL NOTE */}
        <motion.p
          className="text-xl font-semibold text-emerald-700 mt-10 text-justify"
          variants={fadeUp}
          custom={17}
        >
          📘 Thank you for being part of Be The Shape. Your trust helps us build
          a better learning platform every day.
        </motion.p>
      </div>
    </>
  );
};

export default TermsAndConditions;