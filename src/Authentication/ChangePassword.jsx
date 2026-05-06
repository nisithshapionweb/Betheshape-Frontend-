
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Lottie from "lottie-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// আপনার নিজস্ব Lottie JSON ফাইলের পাথ দিন:
import errorAnimation from "../../lottie-animation/error.json";
import successAnimation from "../../lottie-animation/success.json";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("success"); // success or error
  const [modalMessage, setModalMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const onSubmit = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setModalType("error");
      setModalMessage("No user is logged in.");
      setModalVisible(true);
      setLoading(false);
      return;
    }

    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setModalType("success");
      setModalMessage("Password updated successfully!");
      reset();
    } catch (error) {
      const errorMap = {
        "auth/wrong-password": "Incorrect current password.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/requires-recent-login": "Please log out and log back in, then try again.",
        "auth/network-request-failed": "Network error. Please check your connection.",
      };
      setModalType("error");
      setModalMessage(errorMap[error.code] || "Something went wrong. Please try again.");
    } finally {
      setModalVisible(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-9.5rem)]">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden">
          <div className="bg-teal-600 py-6 px-8 text-white">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <p className="mt-1 text-indigo-200">Enter your current and new password</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <div>
                <label htmlFor="oldPassword" className="block mb-1 font-medium text-gray-700">
                  Current Password
                </label>
                <Controller
                  name="oldPassword"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Current password is required." }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        id="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.oldPassword
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-indigo-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                      >
                        {showOldPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                      </button>
                      {errors.oldPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.oldPassword.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block mb-1 font-medium text-gray-700">
                  New Password
                </label>
                <Controller
                  name="newPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "New password is required.",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      message:
                        "Password must contain uppercase, lowercase, number, and be min 8 chars.",
                    },
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.newPassword
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-indigo-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                      >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                      </button>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Please confirm your new password.",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match.",
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.confirmPassword
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-indigo-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                      >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                      </button>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 hover:bg-hoverteal-800 text-white rounded-lg font-semibold transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg relative animate-fadeIn">
            <div className="flex justify-center mb-4">
              <Lottie
                animationData={modalType === "success" ? successAnimation : errorAnimation}
                loop={false}
                style={{ width: 150, height: 150 }}
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                modalType === "success" ? "text-teal-700" : "text-red-600"
              }`}
            >
              {modalType === "success" ? "Success" : "Error"}
            </h3>
            <p className="mb-6 text-gray-700">{modalMessage}</p>
            <button
              onClick={() => setModalVisible(false)}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
