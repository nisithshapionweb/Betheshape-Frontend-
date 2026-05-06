import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentMethod = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [copied, setCopied] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      transactionId: "",
      paymentMethod: "",
      amount: "",
      userPaymentMethod: "",
      adminNumber: "",
      agreeToTerms: false,
    },
  });

  const selectedPayment = watch("paymentMethod");

  // ✅ TanStack Query দিয়ে payment methods fetch
  const {
    data: paymentNumbers = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/payment");
      const methods = {};
      res.data.forEach((item) => {
        if (
          !item ||
          !item.paymentType ||
          !item.accountType ||
          !item.number ||
          !item.amount
        )
          return;

        const key = `${item.paymentType}_${item.accountType}`;
        methods[key] = {
          label: `${
            item.paymentType.charAt(0).toUpperCase() + item.paymentType.slice(1)
          } (${item.accountType})`,
          adminNumber: item.number,
          amount: item.amount,
        };
      });
      return methods;
    },
  });

  // ✅ Copy Handlers
  const handleCopy = () => {
    if (!selectedPayment) return;
    const number = paymentNumbers[selectedPayment]?.adminNumber;
    if (number) {
      navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleCopyAmount = () => {
    if (!selectedPayment) return;
    const amount = paymentNumbers[selectedPayment]?.amount;
    if (amount) {
      navigator.clipboard.writeText(amount);
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 1500);
    }
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const selectedPaymentInfo = paymentNumbers[selectedPayment];
      const paymentData = {
        userName: data.userName,
        userEmail: user?.email,
        paymentMethod: selectedPaymentInfo?.label,
        adminNumber: selectedPaymentInfo?.adminNumber,
        amount: selectedPaymentInfo?.amount,
        userPaymentMethod: data.userPaymentMethod,
        transactionId: data.transactionId,
      };

      const res = await axiosPublic.post("/payment/user", paymentData);
      if (res.data.id) navigate("/payment-success");
      else setError("Payment submission failed. Please try again.");
    } catch (err) {
      console.error("❌ Payment error:", err);
      setError("Payment submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🕐 Loading & Error States
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold text-gray-600">
        Loading payment methods...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold text-red-500">
        Failed to load payment methods.
      </div>
    );

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-2 md:px-4">
      <div className="w-full max-w-5xl  ">
        <div className="bg-[#f0f1f1] backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-teal-600 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            Member Ship Information
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-black mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="userName"
                {...register("userName", { required: "Full name is required" })}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <input
                disabled
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-2 bg-white rounded-lg text-black focus:outline-none"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Payment Method *
              </label>
              <select
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
                className="w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none rounded-lg text-black"
              >
                <option value="">Select Payment Method</option>
                {Object.entries(paymentNumbers).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Amount */}
            {selectedPayment && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Payment Amount *
                </label>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-black font-bold tracking-wide">
                    {paymentNumbers[selectedPayment]?.amount} ৳
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAmount}
                    className="ml-4 px-3 py-0.5 bg-teal-600 hover:bg-teal-900 text-white text-sm font-semibold rounded-md transition-all"
                  >
                    {copiedAmount ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Admin Number */}
            <div className="md:col-span-2">
              {selectedPayment ? (
                <>
                  <label className="block text-sm font-medium text-black mb-2">
                    {paymentNumbers[selectedPayment]?.label} Number *
                  </label>
                  <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                    <span className="text-black font-bold tracking-wide">
                      {paymentNumbers[selectedPayment]?.adminNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="ml-4 px-3 py-0.5 bg-teal-600 hover:bg-teal-900 text-white text-sm font-semibold rounded-md transition-all"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white border border-dashed border-red-400 text-red-500 text-sm px-4 py-2 rounded-lg">
                  Please select your payment method
                </div>
              )}
            </div>

            {/* User Payment Number */}
            <div>
              <label
                htmlFor="userPaymentMethod"
                className="block text-sm font-medium text-black mb-2"
              >
                Your {paymentNumbers[selectedPayment]?.label?.split(" ")[0]}{" "}
                Number *
              </label>
              <input
                type="text"
                id="userPaymentMethod"
                {...register("userPaymentMethod", {
                  required: "Please enter your payment number",
                })}
                placeholder={`Enter your ${
                  paymentNumbers[selectedPayment]?.label?.split(" ")[0] || ""
                } number`}
                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              {errors.userPaymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userPaymentMethod.message}
                </p>
              )}
            </div>

            {/* Transaction ID */}
            <div>
              <label
                htmlFor="transactionId"
                className="block text-sm font-medium text-black mb-2"
              >
                Transaction ID *
              </label>
              <input
                type="text"
                id="transactionId"
                {...register("transactionId", {
                  required: "Transaction ID is required",
                })}
                placeholder="Enter your transaction ID"
                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              {errors.transactionId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.transactionId.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="md:col-span-2 flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                {...register("agreeToTerms", {
                  required: "You must agree to the terms",
                })}
                className="mt-1 w-4 h-4 text-teal-600 border-gray-600 rounded focus:ring-teal-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-black">
                I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-teal-600 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-teal-600 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-1 md:col-span-2">
                {errors.agreeToTerms.message}
              </p>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-xl font-bold text-lg text-white shadow-xl hover:bg-teal-900 bg-teal-600 transition-all duration-300"
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-3 text-center md:col-span-2">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
