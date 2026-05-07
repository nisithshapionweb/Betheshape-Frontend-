
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    BookOpen,
    Calendar,
    CheckCircle,
    CreditCard,
    Eye,
    GraduationCap,
    Mail,
    Trash2,
    Users,
    XCircle,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const fetchPayments = async () => {
  const res = await axios.get("https://api.betheshape.com/own-sp-payment/admin");
  return res.data;
};

const OwnSpAllUserPayment = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { user } = useAuth();
  const { role } = useRole();
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: fetchPayments,
    refetchInterval: 5000,
  });

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title:
        status === "accepted"
          ? "Approve this payment?"
          : "Reject this payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: status === "accepted" ? "Approve" : "Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: status === "accepted" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`https://api.betheshape.com/own-sp-payment/status/${id}`, {
        status,
      });
      Swal.fire(
        "Success",
        `Payment has been ${status === "accepted" ? "approved" : "rejected"}.`,
        "success"
      );
      queryClient.invalidateQueries(["allPayments"]);
    } catch {
      Swal.fire("Error", "Failed to update payment status", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this payment?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://api.betheshape.com/own-sp-payment/admin/${id}`);
      Swal.fire("Deleted!", "Payment has been deleted.", "success");
      queryClient.invalidateQueries(["allPayments"]);
    } catch {
      Swal.fire("Error", "Failed to delete payment", "error");
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load data.</p>;

  // Filter logic
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || p.status === statusFilter.toLowerCase();
    const matchesMethod =
      methodFilter === "All" || p.paymentMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Summary Data
  const total = payments.length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const active = payments.filter((p) => p.status === "accepted").length;
  const cancelled = payments.filter((p) => p.status === "rejected").length;
  const totalRevenue = payments
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const formattedRevenue = totalRevenue.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-2 md:p-6  min-h-screen max-w-[1400px] mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Users className="text-blue-600 w-8 h-8" />
          <div>
            <p className="text-gray-600 text-sm">Total Enrollments</p>
            <h3 className="text-xl font-bold">{total}</h3>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl shadow flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <XCircle className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Pending</p>
            <h3 className="text-xl font-bold text-yellow-600">{pending}</h3>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Active</p>
            <h3 className="text-xl font-bold text-green-600">{active}</h3>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl shadow flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <XCircle className="text-red-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Cancelled</p>
            <h3 className="text-xl font-bold text-red-600">{cancelled}</h3>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl shadow flex items-center gap-3">
          <CreditCard className="text-purple-600 w-8 h-8" />
          <div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <h3 className="text-xl font-bold text-purple-600">
              ৳{formattedRevenue}
            </h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by student, course, or transaction ID..."
          className="input input-bordered w-full lg:w-1/2 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Payment cards */}
      {filteredPayments.length === 0 ? (
        <p className="text-center text-gray-500">No matching payments found.</p>
      ) : (
        <div className="space-y-5">
          {filteredPayments.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                {/* Left info */}
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-blue-500">
                      {" "}
                      <Users className="text-blue-600 w-8 h-8" />
                    </span>{" "}
                    {p.userName}
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
                  <p className="text-gray-500 text-sm">{p.userEmail}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="btn btn-sm bg-green-800 hover:bg-green-900 text-white"
                  >
                    <Eye size={16} /> View Details
                  </button>
                  {/* <button
                    onClick={() => handleStatusUpdate(p._id, "accepted")}
                    className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                  >
                    ✓ Approve
                  </button> */}
                  {(p.status === "pending" || p.status === "rejected") && (
                    <button
                      onClick={() => handleStatusUpdate(p._id, "accepted")}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                      ✓ Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleStatusUpdate(p._id, "rejected")}
                    className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white"
                  >
                    ✕ Rejected
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-700">
                <p>
                  <strong>Payment Method:</strong> {p.paymentMethod}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  <span className="bg-green-100 text-green-600 px-2 rounded-md">
                    ৳{p.amount || 0}
                  </span>
                </p>
                <p>
                  <strong>Payment:</strong> {p.paymentMethod}
                </p>

                <p>
                  <strong>Number:</strong> {p.userPaymentMethod || "N/A"}
                </p>
                <p>
                  <strong>Payment Number:</strong> {p.adminNumber || "N/A"}
                </p>
                <p>
                  <strong>Expired Date:</strong>{" "}
                  {p.expireAt
                    ? new Date(p.expireAt)
                        .toLocaleString("en-GB", {
                          timeZone: "Asia/Dhaka",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })
                        .replace("am", "AM")
                        .replace("pm", "PM")
                    : "N/A"}
                </p>

                <p>
                  <strong>Approved Date:</strong>{" "}
                  {p.approvedAt
                    ? new Date(p.approvedAt)
                        .toLocaleString("en-GB", {
                          timeZone: "Asia/Dhaka",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })
                        .replace("am", "AM")
                        .replace("pm", "PM")
                    : "N/A"}
                </p>

                <p>
                  <strong>Transaction ID:</strong>{" "}
                  <span className="text-teal-600 font-bold">
                    {p.transactionId || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-auto p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg relative p-6">
            <button
              onClick={() => setSelectedPayment(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Enrollment Details</h2>

            {/* Enrollment Status */}
            <div
              className={`p-4 rounded-xl mb-5 ${
                selectedPayment.status === "pending"
                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                  : selectedPayment.status === "accepted"
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <p className="font-semibold">
                Enrollment Status:{" "}
                <span className="capitalize">{selectedPayment.status}</span>
              </p>
              <p className="text-gray-600 text-sm">
                {selectedPayment.status === "pending"
                  ? "Waiting for payment verification"
                  : selectedPayment.status === "accepted"
                  ? "Payment verified and enrollment active"
                  : "Payment was rejected"}
              </p>
            </div>

            {/* Student & Course Info */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {/* Student Info */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <GraduationCap className="text-blue-600" /> User Information
                </h3>
                <div className="bg-gray-50 p-3 rounded-xl space-y-2">
                  <p>
                    <strong>Name:</strong> {selectedPayment.userName}
                  </p>
                  <p className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-green-500" />
                    {selectedPayment.userEmail}
                  </p>
                  <p>
                    <strong>ID:</strong> {selectedPayment._id || "N/A"}
                  </p>
                </div>
              </div>

              {/* Course Info */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="text-green-600" /> Plan Information
                </h3>
                <div className="bg-gray-50 p-3 rounded-xl space-y-2">
                  <p>
                    <strong>Price:</strong> ৳{selectedPayment.amount}
                  </p>
                  <p>
                    <strong>Plan ID:</strong> {selectedPayment._id || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <CreditCard className="text-purple-600" /> Payment Information
              </h3>
              <div className="bg-gray-50 p-3 rounded-xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <p>
                  <strong>Amount Paid:</strong> ৳{selectedPayment.amount}
                </p>
                <p>
                  <strong>Method:</strong> {selectedPayment.paymentMethod}
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {selectedPayment.transactionId}
                </p>

                <p className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  {new Date(selectedPayment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
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

export default OwnSpAllUserPayment;
