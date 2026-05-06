import { motion } from "framer-motion";
import {
  Cookie,
  FileLock,
  Info,
  LockKeyhole,
  Phone,
  RefreshCcw,
  Share2,
  User,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Be The Shape | Privacy Policy</title>
        <meta
          name="description"
          content="Privacy policy of Be The Shape including data collection, usage, cookies, security, and user rights."
        />
      </Helmet>

      <motion.div
        className="px-2 py-5 max-w-[1400px] mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* TITLE */}
        <motion.div variants={fadeInUp}>
          <TittleAnimation
            tittle="Privacy Policy"
            subtittle="Your Data, Your Trust, Our Responsibility"
          />
        </motion.div>

        {/* INTRO */}
        <motion.p
          className="text-lg mb-6 text-justify leading-relaxed"
          variants={fadeInUp}
        >
          At <strong>Be The Shape</strong>, your privacy is extremely important
          to us. We are committed to protecting your personal data and ensuring
          that your information is handled in a safe, transparent, and secure
          manner.
        </motion.p>

        {/* SECTIONS */}
        {[
          {
            icon: <User className="text-blue-600" />,
            title: "1. Information We Collect",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Name, email address, phone number, and basic profile info</li>
                <li>Account activity and learning progress</li>
                <li>Device and usage data for improving platform experience</li>
              </ul>
            ),
          },
          {
            icon: <Info className="text-yellow-600" />,
            title: "2. How We Use Your Information",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>To provide and improve learning services</li>
                <li>To personalize your learning experience</li>
                <li>To send important updates and notifications</li>
                <li>To maintain platform security and performance</li>
              </ul>
            ),
          },
          {
            icon: <Share2 className="text-orange-600" />,
            title: "3. Information Sharing",
            content: (
              <>
                <p className="mb-4 text-lg text-justify">
                  We respect your privacy and do not sell your data. We only
                  share information in the following cases:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>When required by law or legal authorities</li>
                  <li>With your explicit consent</li>
                  <li>With trusted service providers supporting our platform</li>
                </ul>
              </>
            ),
          },
          {
            icon: <Cookie className="text-pink-600" />,
            title: "4. Cookies & Tracking",
            content: (
              <p className="mb-6 text-lg text-justify">
                We use cookies to improve user experience, analyze traffic, and
                enhance platform performance. You can disable cookies anytime
                from your browser settings.
              </p>
            ),
          },
          {
            icon: <FileLock className="text-red-600" />,
            title: "5. Data Security",
            content: (
              <p className="mb-6 text-lg text-justify">
                We use modern security systems and regular monitoring to protect
                your data. However, no online system is 100% secure, so we
                encourage users to stay cautious while sharing sensitive
                information.
              </p>
            ),
          },
          {
            icon: <LockKeyhole className="text-purple-600" />,
            title: "6. Your Rights",
            content: (
              <>
                <p className="mb-4 text-lg text-justify">
                  As a user, you have full control over your data:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account/data</li>
                  <li>Contact support for privacy concerns</li>
                </ul>
              </>
            ),
          },
          {
            icon: <RefreshCcw className="text-indigo-600" />,
            title: "7. Policy Updates",
            content: (
              <p className="mb-6 text-lg text-justify">
                We may update this Privacy Policy from time to time to reflect
                improvements in our services. We recommend checking this page
                periodically.
              </p>
            ),
          },
          {
            icon: <Phone className="text-green-700" />,
            title: "8. Contact Us",
            content: (
              <>
                <p className="mb-2 text-lg">
                  📧 Email:{" "}
                  <a
                    href="mailto:support@betheshape.com"
                    className="text-blue-600 underline"
                  >
                    support@betheshape.com
                  </a>
                </p>
                <p className="text-lg mb-10">
                  📞 Phone:{" "}
                  <a
                    href="tel:+8801XXXXXXXXX"
                    className="text-blue-600 underline"
                  >
                    +8801XXXXXXXXX
                  </a>
                </p>
              </>
            ),
          },
        ].map((section, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              {section.icon}
              {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        {/* FINAL NOTE */}
        <motion.p
          className="text-xl font-semibold text-blue-700 text-justify"
          variants={fadeInUp}
        >
          🔒 We value your trust. Be The Shape is committed to protecting your
          data and providing a safe learning environment.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;