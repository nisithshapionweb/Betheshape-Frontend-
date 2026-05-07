
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreditCard, CreditCardIcon, Eye } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const fetchUserPayments = async (email) => {
  const res = await axios.get(`https://api.betheshape.com/own-sp-payment/user/${email}`);

  return res.data;
};

const OwnSpUserPaymentHistory = () => {
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPayments", user?.email],
    queryFn: () => fetchUserPayments(user.email),
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading your payments...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load payments.</p>;
if (!payments.length)
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mt-32">
      <div className="bg-white border rounded-2xl shadow-md p-10 text-center flex flex-col items-center justify-center">
        
        <div className="bg-blue-50 p-6 rounded-full mb-4">
          <CreditCardIcon className="w-12 h-12 text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Payments Yet
        </h2>

        <p className="text-gray-500 max-w-md">
          You haven’t made any payments yet. Once you complete a payment,
          it will appear here in your payment history.
        </p>
      </div>
    </div>
  );

  // Summary Data
  const total = payments.length;
  const accepted = payments.filter((p) => p.status === "accepted").length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const rejected = payments.filter((p) => p.status === "rejected").length;
  const totalPaid = payments
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto  border bg-white mt-32 rounded-md ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Payment History</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center shadow">
          <p className="text-gray-600 text-sm">Total</p>
          <h3 className="text-xl font-bold text-blue-600">{total}</h3>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center shadow">
          <p className="text-gray-600 text-sm">Pending</p>
          <h3 className="text-xl font-bold text-yellow-600">{pending}</h3>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center shadow">
          <p className="text-gray-600 text-sm">Accepted</p>
          <h3 className="text-xl font-bold text-green-600">{accepted}</h3>
        </div>
        <div className="bg-red-50 p-4 rounded-xl text-center shadow">
          <p className="text-gray-600 text-sm">Rejected</p>
          <h3 className="text-xl font-bold text-red-600">{rejected}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
        {payments.map((p) => (
          <div
            key={p._id}
            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="text-blue-600 w-5 h-5" />
                {p.paymentMethod} —{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : p.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.status}
                </span>
              </h3>
              <p className="text-gray-500 text-sm">
                Transaction: <span className="font-medium">{p.transactionId}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Amount: <span className="font-semibold text-green-600">৳{p.amount}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPayment(p)}
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
              >
                <Eye size={15} /> Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg relative p-6 animate-fadeIn">
            <button
              onClick={() => setSelectedPayment(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4">Payment Details</h3>

            {/* Status Info */}
            <div
              className={`p-3 rounded-lg mb-5 ${
                selectedPayment.status === "pending"
                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                  : selectedPayment.status === "accepted"
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <p className="font-semibold capitalize">{selectedPayment.status}</p>
            </div>

            {/* Payment Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p>
                <strong>Amount:</strong> ৳{selectedPayment.amount}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedPayment.paymentMethod}
              </p>
              <p>
                <strong>Your Number:</strong> {selectedPayment.userPaymentMethod || "N/A"}
              </p>
              <p>
                <strong>Transaction ID:</strong> {selectedPayment.transactionId}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedPayment.createdAt).toLocaleString("en-GB", {
                  timeZone: "Asia/Dhaka",
                  hour12: true,
                })}
              </p>
              <p>
                <strong>Expire At:</strong>{" "}
                {selectedPayment.expireAt
                  ? new Date(selectedPayment.expireAt).toLocaleString("en-GB", {
                      timeZone: "Asia/Dhaka",
                      hour12: true,
                    })
                  : "N/A"}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedPayment(null)}
                className="btn bg-orange-500 hover:bg-orange-600 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnSpUserPaymentHistory;
