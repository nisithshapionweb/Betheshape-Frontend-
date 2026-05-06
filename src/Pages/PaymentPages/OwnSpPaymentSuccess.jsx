/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const OwnSpPaymentSuccess = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(null);

  const { orderId, customerName, totalAmount } = location.state || {};
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.2}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 md:p-10 rounded-lg shadow-xl w-full max-w-2xl text-center relative z-10 border border-teal-100"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-6xl text-teal-500 drop-shadow-lg" />
        </motion.div>

        {/* {settings?.logo_url && (
          <img
            src={settings.logo_url}
            alt="Company Logo"
            className="h-12 mx-auto mb-6"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )} */}

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-semibold mb-6 text-gray-700"
        >
          Your Quiz Placed Successfully!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg mb-4">
            Thank you for your purchase,{" "}
            <span className="font-semibold text-teal-600">
              {user?.displayName || "Valued Customer"}
            </span>
            !
          </p>
          <p className="text-gray-600 mb-6">
            Your order has been received and is being processed.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 mb-6"
          >
            We'll send you a confirmation email with the order details shortly.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center"
        >
          <Link
            to="/"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium  flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaHome /> Go To Home
          </Link>
         
        </motion.div>
      </motion.div>

      {/* Floating bubbles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: Math.random() * 100 - 50 }}
          animate={{
            y: [0, -100, -200, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [1, 0.8, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute rounded-full bg-teal-200 opacity-30"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: "-50px",
          }}
        />
      ))}
    </div>
  );
};

export default OwnSpPaymentSuccess;
