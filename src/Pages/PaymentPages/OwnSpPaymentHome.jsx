/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const OwnSpPaymentHome = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center md:p-6 mt-12 md:mt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-2xl text-center border border-gray-300"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-teal-600 mb-3"
        >
          💳 Confirm Your Payment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-5"
        >
          Complete your secure payment quickly and safely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-teal-700 mb-2">
            🗓 Plan Overview
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Unlock full access to our{" "}
            <span className="font-medium text-teal-600">Premium Plan</span> for{" "}
            <span className="font-bold text-teal-700">30 days</span> from the
            date of activation. Enjoy all exclusive features, priority support,
            and seamless experience. After 30 days, you can easily renew your
            plan anytime to continue uninterrupted access.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* ✅ Link Wrapped Motion Button */}
          <Link to="/own-sp-payment-confirm" onClick={() => setLoading(true)}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 
      ${
        loading
          ? "bg-teal-400 cursor-not-allowed text-white"
          : "bg-teal-600 hover:bg-teal-700 text-white"
      }`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </motion.button>
          </Link>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="w-full sm:w-auto border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-block"
            >
              Go to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnSpPaymentHome;
