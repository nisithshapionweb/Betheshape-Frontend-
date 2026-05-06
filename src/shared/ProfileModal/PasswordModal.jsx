import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { VscError } from "react-icons/vsc";

const PasswordModal = ({ onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isValidPassword = newPassword.length >= 6;

  const handleSave = () => {
    if (!isValidPassword) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setError("");
    onSave({ currentPassword, newPassword })
      .then(() => {
        // On successful password update
        onClose();
      })
      .catch((err) => {
        // If there's an error from backend (e.g., incorrect current password)
        setError(err.message);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative">
        <div className="flex justify-between items-center pb-2 mb-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GrUpdate className="text-green-600" /> পাসওয়ার্ড পরিবর্তন
          </h2>

          <button onClick={onClose} className="text-red-700 text-xl font-bold">
            <VscError size={25} />
          </button>
        </div>
        <div className="mt-2 mb-2 border-t border-gray-300"></div>
        {/* Current Password Field */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="currentPassword">
            <span className="label-text text-lg font-bold text-black">
              বর্তমান পাসওয়ার্ড:
            </span>
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="******"
            />
            {/* Show/Hide Password Icon */}
            <span
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {showCurrentPassword ? (
                <AiFillEyeInvisible size={20} className="text-green-950" />
              ) : (
                <AiFillEye size={20} className="text-green-600" />
              )}
            </span>
          </div>
        </div>

        {/* New Password Field */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="newPassword">
            <span className="label-text text-lg font-bold text-black">
              নতুন পাসওয়ার্ড:
            </span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                !isValidPassword && newPassword ? "border-red-500" : ""
              }`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="******"
            />
            {/* Show/Hide Password Icon */}
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {showNewPassword ? (
                <AiFillEyeInvisible size={20} className="text-green-950" />
              ) : (
                <AiFillEye size={20} className="text-green-600" />
              )}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="mt-4  mb-2 border-t border-gray-300"></div>
        {/* Save/Cancel Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-red-700 text-white px-4 py-2 rounded"
          >
            ✖ বাতিল
          </button>
          <button
            onClick={handleSave}
            className={`bg-green-900 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 ${
              !isValidPassword ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isValidPassword}
          >
            <GrUpdate size={15} /> আপডেট
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
