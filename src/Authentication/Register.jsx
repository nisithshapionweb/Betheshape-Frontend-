import Lottie from "lottie-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import error from "../../lottie-animation/error.json";
import success from "../../lottie-animation/success.json";
import imageLogo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { handleSubmit, control, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    let firebaseUser = null;

    try {
      // Step 1: Create Firebase User
      const result = await createUser(data.email, data.password);
      firebaseUser = result.user;

      // Step 2: Prepare user info for MongoDB (exclude password)
      const userInfo = {
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
      };

      // Step 3: Save to MongoDB
      const res = await axiosPublic.post("/users/register", userInfo, {
        withCredentials: true,
      });

      if (res.data?.success) {
        // ✅ Success Modal
        setModalMessage("Registration Successful!");
        setModalType("success");
        setIsModalVisible(true);
      } else {
        if (firebaseUser) {
          await firebaseUser.delete();
        }
        throw new Error("MongoDB insertion failed.");
      }
    } catch (error) {
      // ❌ Firebase fallback deletion
      if (firebaseUser) {
        try {
          await firebaseUser.delete();
        } catch (deleteError) {
          console.error("Failed to delete Firebase user:", deleteError);
        }
      }

      // ❌ Error Modal
      const fallbackMessage = "⚠️ Registration failed!";

      const firebaseErrorMap = {
        "auth/invalid-email": "❌ The email address is invalid.",
        "auth/email-already-in-use": "❌ This email is already in use.",
        "auth/weak-password": "❌ The password is too weak.",
        "auth/network-request-failed":
          "❌ Registration failed due to a network error.",
      };

      const messageFromFirebase = firebaseErrorMap[error.code];

      setModalMessage(
        error?.response?.data?.message ||
          messageFromFirebase ||
          fallbackMessage,
      );
      setModalType("error");
      setIsModalVisible(true);
    } finally {
      setLoading(false);
      setIsSubmitting(false); // Reset submission state
    }
  };

  return (
    <div>
      <Helmet>
        <title>Be The Shape | Sign Up</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-[80vh] py-6">
        <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
          <div className="text-center mt-8">
            <img
              className="h-16 w-24 cursor-pointer mx-auto "
              src={imageLogo}
              alt="Logo"
            />
            <p className="mt-2 text-gray-600 text-sm font-medium">
              Join us and start your journey to success.
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3 md:gap-6 mb-5">
                {/* Full Name */}
                <div className="form-control">
                  <label htmlFor="fullName" className="label">
                    <span className="label-text text-base mb-1 font-medium text-gray-700">
                      Full Name :
                    </span>
                  </label>
                  <Controller
                    name="fullName"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name can be up to 50 characters long.",
                      },
                      pattern: {
                        value: /^[\u0980-\u09FFa-zA-Z\s]+$/u,
                        message: "Invalid name (use only letters and spaces)",
                      },
                    }}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState;
                      return (
                        <>
                          <div className="relative">
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                              <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              {...field}
                              id="fullName"
                              placeholder="Enter your full name"
                              className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                                error
                                  ? "border-red-500"
                                  : field.value
                                    ? "border-green-200"
                                    : "border-gray-300"
                              }`}
                              aria-invalid={!!error}
                              aria-describedby="fullName-feedback"
                            />
                          </div>
                          {error ? (
                            <p
                              id="fullName-feedback"
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              {error.message}
                            </p>
                          ) : field.value ? (
                            <p
                              id="fullName-feedback"
                              className="text-green-600 text-sm mt-1 flex items-center"
                            >
                              Name is Valid
                            </p>
                          ) : null}
                        </>
                      );
                    }}
                  />
                </div>

                {/* Email */}
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
                        value:
                          /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                                    ? "border-green-200"
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
                              {/* <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> */}
                              {error.message}
                            </p>
                          ) : field.value ? (
                            <p
                              id="email-feedback"
                              className="text-green-600 text-sm mt-1 flex items-center"
                            >
                              {/* <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> */}
                              Email Address Valid
                            </p>
                          ) : null}
                        </>
                      );
                    }}
                  />
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text text-base mb-1 font-medium text-gray-700">
                      Phone Number :
                    </span>
                  </label>
                  <Controller
                    name="phoneNumber"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Phone number is required.",
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Invalid phone number",
                      },
                    }}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState;
                      return (
                        <>
                          <div className="relative">
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                              <FiPhone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              {...field}
                              id="phoneNumber"
                              placeholder="01XXXXXXXXX"
                              className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                                error
                                  ? "border-red-500"
                                  : field.value
                                    ? "border-green-200"
                                    : "border-gray-300"
                              }`}
                              value={`+88${field.value}`}
                              onChange={(e) =>
                                field.onChange(e.target.value.slice(3))
                              }
                              aria-invalid={!!error}
                              aria-describedby="phoneNumber-feedback"
                            />
                          </div>
                          {error ? (
                            <p
                              id="phoneNumber-feedback"
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              {error.message}
                            </p>
                          ) : field.value ? (
                            <p
                              id="phoneNumber-feedback"
                              className="text-green-600 text-sm mt-1 flex items-center"
                            >
                              Phone Number is Valid
                            </p>
                          ) : null}
                        </>
                      );
                    }}
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label
                    className="text-base font-medium text-gray-700 mb-1 block"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        message:
                          "Password must be at least 8 characters long, and must contain uppercase, lowercase, and numbers.",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                              error
                                ? "border-red-500"
                                : field.value
                                  ? "border-green-200"
                                  : "border-gray-300"
                            }`}
                            placeholder="••••••••"
                            aria-invalid={!!error}
                            aria-describedby="password-feedback"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible
                                size={20}
                                className="text-textPrimary"
                              />
                            ) : (
                              <AiFillEye
                                size={20}
                                className="text-textPrimary"
                              />
                            )}
                          </button>
                        </div>
                        {error && (
                          <p
                            id="password-feedback"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            {error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label
                    className="text-base font-medium text-gray-700 mb-1 block"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            {...field}
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                              error
                                ? "border-red-500"
                                : field.value
                                  ? "border-green-300"
                                  : "border-gray-300"
                            }`}
                            placeholder="••••••••"
                            aria-invalid={!!error}
                            aria-describedby="confirmPassword-feedback"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible
                                size={20}
                                className="text-textPrimary"
                              />
                            ) : (
                              <AiFillEye
                                size={20}
                                className="text-textPrimary"
                              />
                            )}
                          </button>
                        </div>
                        {error && (
                          <p
                            id="confirmPassword-feedback"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            {error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-bgButton hover:bg-hoverBgButton text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-textPrimary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? (
                  <div className="flex justify-center items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <span className="font-semibold text-base tracking-wider">
                    Create Account
                  </span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-textPrimary hover:text-hoverTextPrimary font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-[90%] max-w-md relative animate-fadeIn">
              <div className="flex justify-center">
                {modalType === "success" ? (
                  <Lottie
                    animationData={success}
                    loop
                    style={{ margin: "-60px", width: 200, height: 200 }}
                  />
                ) : (
                  <Lottie
                    animationData={error}
                    loop
                    style={{
                      margin: "-50px",
                      padding: "10px",
                      width: 150,
                      height: 200,
                    }}
                  />
                )}
              </div>

              <h2
                className={`text-xl font-bold ${
                  modalType === "success" ? "text-indigo-700" : "text-red-600"
                }`}
              >
                {modalType === "success" ? "Success!" : "Oops!"}
              </h2>
              <p className="text-gray-700 mt-2">{modalMessage}</p>

              {modalType === "success" ? (
                <button
                  className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-base font-medium transition-colors shadow-md"
                  onClick={() => navigate("/")}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-base font-medium transition-colors shadow-md"
                  onClick={() => setIsModalVisible(false)}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
