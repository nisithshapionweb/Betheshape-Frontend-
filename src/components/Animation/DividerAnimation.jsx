import { motion } from "framer-motion";

const DividerAnimation = ({ titte }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };
  return (
    <div>
      <motion.h1
        className="text-3xl font-bold text-center text-indigo-600 uppercase"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {titte}
      </motion.h1>
      <motion.div
        className="w-full my-5 rounded-full"
        style={{
          height: "2px",
          backgroundImage:
            "radial-gradient(circle at center, rgba(22,163,74,1) 0%, rgba(234,88,12,0.8) 25%, rgba(234,88,12,0.4) 45%, transparent 70%)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default DividerAnimation;
