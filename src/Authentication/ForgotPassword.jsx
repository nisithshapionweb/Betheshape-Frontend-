import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Lottie from "lottie-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import errorAnimation from "../../lottie-animation/error.json";
import successAnimation from "../../lottie-animation/success.json";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const onSubmit = async ({ email }) => {
    setLoading(true);
    const auth = getAuth();
    const trimmedEmail = email.trim().toLowerCase();

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, trimmedEmail);
      setModalType("success");
      setModalMessage(
        "Password reset email sent successfully! Please check your inbox."
      );
    } catch (err) {
      // Firebase error mapping
      const firebaseErrorMap = {
        "auth/invalid-email": "Invalid email address.",
        "auth/user-not-found": "No user found with this email.",
        "auth/network-request-failed":
          "Network error occurred. Please check your connection.",
      };

      // Friendly error message fallback
      const friendlyMessage =
        firebaseErrorMap[err?.code] ||
        "Something went wrong. Please try again.";
      setModalType("error");
      setModalMessage(friendlyMessage);
    } finally {
      setIsModalVisible(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Be The Shape | Forgot-Password</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-[90%] max-w-md bg-white shadow-xl rounded-xl border overflow-hidden border-indigo-100">
          {/* Header */}
          <div className="bg-[#1f4e43]  py-6 px-8 text-white">
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-white mt-1">
              We’ll send you a reset link via email
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-base mb-1 font-medium text-gray-700">
                    Email Address :
                  </span>
                </label>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: "Email address is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => {
                    const { error } = fieldState;
                    return (
                      <>
                        <div className="relative">
                          <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                            <FiMail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            {...field}
                            id="email"
                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                              error
                                ? "border-red-500"
                                : field.value
                                ? "border-green-300"
                                : "border-gray-300"
                            }`}
                            placeholder="example@gmail.com"
                            aria-invalid={!!error}
                            aria-describedby="email-feedback"
                          />
                        </div>

                        {error ? (
                          <p
                            id="email-feedback"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            {error.message}
                          </p>
                        ) : field.value ? (
                          <p
                            id="email-feedback"
                            className="text-green-600 text-sm mt-1 flex items-center"
                          >
                            Email Address Valid
                          </p>
                        ) : null}
                      </>
                    );
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#1f4e43] hover:bg-[#3e7266] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#1f4e43] focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </form>
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-[90%] max-w-md relative animate-fadeIn">
              <div className="flex justify-center">
                <Lottie
                  animationData={
                    modalType === "success" ? successAnimation : errorAnimation
                  }
                  loop={false}
                  style={{ margin: "-60px", width: 200, height: 200 }}
                />
              </div>
              <h2
                className={`text-xl font-bold ${
                  modalType === "success" ? "text-indigo-700" : "text-red-600"
                }`}
              >
                {modalType === "success" ? "Success" : "Error"}
              </h2>
              <p className="mt-2 text-gray-600">{modalMessage}</p>
              <button
                onClick={() => setIsModalVisible(false)}
                className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
