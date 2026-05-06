import { motion } from "motion/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { VscError } from "react-icons/vsc";

const ProfileModal = ({ value, onChange, onClose, onSave, label, type }) => {
  // Validation function for different fields
  const getValidationMessage = () => {
    if (!value) return "এটি একটি আবশ্যক ক্ষেত্র";

    // Validation for English Name
    if (type === "englishName" && !/^[a-zA-Z\s]+$/.test(value)) {
      return "অবৈধ নাম (শুধুমাত্র ইংরেজি অক্ষর ও স্পেস ব্যবহার করুন)";
    }

    // Validation for Bangla Name
    if (type === "banglaName" && !/^[\u0980-\u09FF\s]+$/.test(value)) {
      return "অবৈধ নাম (শুধু বাংলা অক্ষর ও স্পেস ব্যবহার করুন)";
    }
    // Validation for fatherName
    if (type === "fatherName" && !/^[\u0980-\u09FF\s]+$/.test(value)) {
      return "অবৈধ নাম (শুধু বাংলা অক্ষর ও স্পেস ব্যবহার করুন)";
    }
    // Validation for motherName
    if (type === "motherName" && !/^[\u0980-\u09FF\s]+$/.test(value)) {
      return "অবৈধ নাম (শুধু বাংলা অক্ষর ও স্পেস ব্যবহার করুন)";
    }

    // Validation for Email
    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "একটি বৈধ ই-মেইল প্রদান করুন";
    }

    // Validation for Date of Birth (DOB)
    if (type === "dob" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return "জন্মতারিখ সঠিক ফরম্যাটে লিখুন (YYYY-MM-DD)";
    }

    // Validation for Gender
    if (type === "gender" && !["পুরুষ", "মহিলা", "অন্যান্য"].includes(value)) {
      return "লিঙ্গ নির্বাচন করুন (পুরুষ, মহিলা, বা অন্যান্য)";
    }
    // Validation for permanentAddress
    if (
      type === "permanentAddress" &&
      !/^[\u0980-\u09FF০-৯\s,\/\.\-@]+$/.test(value)
    ) {
      return "স্থায়ী ঠিকানায় শুধুমাত্র বাংলা অক্ষর, সংখ্যা, স্পেস, কমা (,), স্ল্যাশ (/), হাইফেন (-), পিরিওড (.) এবং অ্যাট দ্য রেট (@) ব্যবহার করুন";
    }
    if (
      type === "presentAddress" &&
      !/^[\u0980-\u09FF০-৯\s,\/\.\-@]+$/.test(value)
    ) {
      return "স্থায়ী ঠিকানায় শুধুমাত্র বাংলা অক্ষর, সংখ্যা, স্পেস, কমা (,), স্ল্যাশ (/), হাইফেন (-), পিরিওড (.) এবং অ্যাট দ্য রেট (@) ব্যবহার করুন";
    }

    return null; // No error, valid value
  };

  const errorMessage = getValidationMessage();
  const isValid = !errorMessage; // Validation check (true if no error)

  return (
    <motion.dev
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start pt-20 lg:pt-28 justify-center p-2"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start pt-20 lg:pt-28 justify-center p-2 ">
        <div className="bg-white w-full max-w-md rounded shadow-lg p-4 relative">
          <div className="flex justify-between items-center mt-2">
            <h2 className="text-lg lg:text-xl font-bold flex justify-between items-center gap-2 ">
              <FaPen className="text-green-600 " size={15} /> {label} সম্পাদনা
            </h2>
            <button
              onClick={onClose}
              className="text-red-600 text-xl font-bold"
            >
              <VscError size={25} />
            </button>
          </div>
          <div className="mt-2 mb-2 border-t border-gray-300"></div>

          {/* Input Field */}
          <label className="font-bold text-md lg:text-lg">{label} :</label>
          <div className="relative w-full">
            {type === "dob" ? (
              // For Date of Birth (DOB), use "date" input type to show calendar picker
              <input
                type="date"
                className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  value
                    ? errorMessage
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!errorMessage}
                aria-describedby="dob-feedback"
              />
            ) : type === "gender" ? (
              // For Gender, use select dropdown
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  value
                    ? errorMessage
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!errorMessage}
                aria-describedby="gender-feedback"
              >
                <option value="">লিঙ্গ নির্বাচন করুন</option>
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            ) : (
              // For other fields like English Name, Bangla Name, etc.
              <input
                type="text"
                className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  value
                    ? errorMessage
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!errorMessage}
                aria-describedby="field-feedback"
              />
            )}

            {value && (
              <p
                id="field-feedback"
                className={`text-sm mt-1 ${
                  errorMessage ? "text-red-500" : "text-green-500"
                }`}
              >
                {errorMessage || "তথ্যটি সঠিক!"}
              </p>
            )}
          </div>
          <div className="mt-4 mb-2 border-t border-gray-300"></div>
          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 font-semibold"
            >
              ✖ বাতিল
            </button>
            <button
              onClick={onSave}
              disabled={!isValid} // Disable the button if validation fails
              className={`bg-green-900 text-white px-4 py-2 rounded hover:bg-green-600 flex justify-between items-center gap-2 font-semibold ${
                !isValid ? "opacity-20 cursor-not-allowed" : ""
              }`}
            >
              <GrUpdate size={15} /> আপডেট
            </button>
          </div>
        </div>
      </div>
    </motion.dev>
  );
};

export default ProfileModal;
