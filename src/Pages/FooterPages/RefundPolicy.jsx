import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Be The Shape | Refund Policy</title>
        <meta
          name="description"
          content="Refund policy for Be The Shape learning platform including course access, eligibility, and support guidelines."
        />
      </Helmet>

      <div className="px-2 py-6 max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Refund Policy"
          subtittle="Transparent & Fair Policy for All Learners"
        />

        {/* INTRO */}
        <motion.p
          className="text-lg text-justify mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          At <strong>Be The Shape</strong>, we aim to provide a reliable,
          high-quality digital learning experience. Since our platform delivers
          instant-access educational content, we maintain a clear and fair
          refund policy to protect both learners and the system.
        </motion.p>

        {/* DIGITAL POLICY */}
        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          📌 Digital Product Policy
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <li>
            All courses, videos, PDFs, and study materials are{" "}
            <strong>digital products</strong>.
          </li>
          <li>
            Once a course is purchased or accessed, it is considered{" "}
            <strong>delivered instantly</strong>.
          </li>
          <li>
            For this reason, we do not support general returns or exchanges.
          </li>
        </motion.ul>

        {/* REFUND ELIGIBILITY */}
        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          💸 Refund Eligibility
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <li>
            Refunds are generally <strong>not applicable</strong> after
            purchase.
          </li>
          <li>
            Refunds may only be considered in cases of:
            <ul className="ml-6 list-disc mt-2 space-y-1">
              <li>Duplicate payment</li>
              <li>Technical issue preventing course access</li>
              <li>Payment failure with successful charge</li>
            </ul>
          </li>
          <li>
            Refund requests must be submitted within{" "}
            <strong>48 hours of purchase</strong>.
          </li>
        </motion.ul>

        {/* PROCESS */}
        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          📨 Refund Request Process
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <li>
            Send your request to{" "}
            <a
              href="mailto:support@betheshape.com"
              className="text-blue-600 underline"
            >
              support@betheshape.com
            </a>
          </li>
          <li>Include your payment details and transaction ID.</li>
          <li>Our team will review your request within a reasonable time.</li>
        </motion.ul>

        {/* IMPORTANT NOTES */}
        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          ⚠️ Important Notes
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={9}
        >
          <li>
            If more than <strong>20% of content is accessed</strong>, refund
            requests may not be approved.
          </li>
          <li>
            Abuse of refund policy or false claims may result in account
            restriction.
          </li>
          <li>
            Be The Shape reserves the right to make final decisions on refund
            approvals.
          </li>
        </motion.ul>

        {/* SUPPORT */}
        <motion.p
          className="text-base text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={10}
        >
          🤝 We always care about your learning experience. If you face any
          issue, our support team is ready to help you solve it quickly.
        </motion.p>
      </div>
    </>
  );
};

export default RefundPolicy;