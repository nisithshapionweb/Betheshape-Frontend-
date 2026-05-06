import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router

const Modal = ({ isSuccess, message, onClose, onSuccessRedirect, onErrorRedirect }) => {
  const navigate = useNavigate();

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Handle button click (redirect)
  const handleAction = () => {
    if (isSuccess) {
      onSuccessRedirect ? onSuccessRedirect() : navigate("/dashboard"); // Default: /dashboard
    } else {
      onErrorRedirect ? onErrorRedirect() : navigate(-1); // Default: back
    }
    onClose(); // Modal বন্ধ করবে
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center w-80 transition-transform transform scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex flex-col items-center">
          <div className={`${isSuccess ? "text-green-500" : "text-red-500"} text-4xl mb-2`}>
            {isSuccess ? "✔" : "❌"}
          </div>
          <h2 className={`text-xl font-bold ${isSuccess ? "text-green-500" : "text-red-500"}`}>
            {isSuccess ? "🎉 সফল!" : "দুঃখিত!"}
          </h2>
          <p className="text-gray-700 mt-2">{message}</p>
          <button
            className={`${
              isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } text-white px-4 py-2 rounded-md mt-4 transition-all`}
            onClick={handleAction} // Button click করলে redirect হবে
          >
            {isSuccess ? "ঠিক আছে" : "পিছনে ফিরুন"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
