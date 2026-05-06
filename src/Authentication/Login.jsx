import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import error from "../../lottie-animation/error.json";
import success from "../../lottie-animation/success.json";
import imageLogo from "../assets/logo.png";
import auth from "../firebase/firebase.config";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;

      // ✅ Removed: No call to /auth/jwt or any backend login

      setModalMessage("Login Completed Successfully!");
      setModalType("success");
      setIsModalVisible(true);
    } catch (err) {
      const firebaseErrorMap = {
        "auth/invalid-email": "The email is invalid.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/network-request-failed": "Network error occurred.",
        "auth/too-many-requests": "Too many attempts, please try again later.",
      };

      const friendlyMessage =
        firebaseErrorMap[err?.code] ||
        "There was a problem logging in. Please try again.";
      setModalMessage(friendlyMessage);
      setModalType("error");
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Be The Shape | Sign In</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="text-center mt-8">
            <img
              className="h-16 w-24 cursor-pointer mx-auto "
              src={imageLogo}
              alt="Logo"
            />
           <p className="mt-2 text-gray-600 text-sm">
  Welcome back! Log in to shape your success.
</p>

          </div>

          {/* Form */}
          <div className="p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
              {/* Password */}
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text text-base mb-1  font-medium text-gray-700">
                    Password :
                  </span>
                </label>

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required.",
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
                              ? "border-green-300"
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
                            <AiFillEye size={20} className="text-textPrimary" />
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
                <div className="my-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-textPrimary hover:text-hoverTextPrimary font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-bgButton hover:bg-hoverBgButton text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#1f4e43] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <span className="font-semibold text-base tracking-wider">
                    Sign In
                  </span>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-textPrimary hover:text-hoverTextPrimary font-medium"
                >
                  Create Account
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
                  modalType === "success" ? "text-teal-700" : "text-red-600"
                }`}
              >
                {modalType === "success" ? "Success!" : "Oops!"}
              </h2>
              <p className="text-gray-700 mt-2">{modalMessage}</p>

              {modalType === "success" ? (
                <button
                  className="mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-base font-medium transition-colors shadow-md"
                  onClick={() => navigate(from)}
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

export default Login;
