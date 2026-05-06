import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center bg-gradient-to-br from-red-100 via-white to-red-100">
      
      {/* Animated 404 */}
      <motion.h1
        className="text-8xl md:text-9xl font-extrabold text-red-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        404
      </motion.h1>

      {/* Animated title */}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mt-4 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Animated description */}
      <motion.p
        className="mt-2 text-gray-600 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        The page you are looking for doesn’t exist or has been moved. But don’t worry—you can get back on track!
      </motion.p>

      {/* Animated button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-300"
        >
           ⬅ Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
