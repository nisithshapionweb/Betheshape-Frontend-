
import { motion } from "framer-motion";

const TittleAnimation = ({ tittle, subtittle }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="mb-10 max-w-full">
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-center text-[#3B6B53] break-words"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {tittle}
      </motion.h1>

      {/* Subtitle with gradient dividers */}
      <motion.div
        className="flex items-center justify-center mt-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        {/* Left thin gradient line (chokon → halka) */}
        <div
          className="h-[2px] w-16 rounded-full"
          style={{
            background: "linear-gradient(to right, #d3f0e0, #3B6B53)",
          }}
        ></div>

        {/* Text / Subtitle */}
        <span className="mx-4 text-lg md:text-xl font-semibold text-gray-800 break-words text-justify">
          {subtittle}
        </span>

        {/* Right thick gradient line (mota → halka, reverse) */}
        <div
          className="h-[2px] w-16 rounded-full"
          style={{
            background: "linear-gradient(to right, #3B6B53, #d3f0e0)",
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default TittleAnimation;