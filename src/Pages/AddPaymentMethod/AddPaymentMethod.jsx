import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// Payment options categorized
const paymentOptions = {
  mobile: ["bkash", "nagad", "rocket"],
  bank: ["brac_bank", "dutch_bangla", "islami_bank", "ab_bank", "agrani_bank"],
};

const fetchPaymentMethods = async () => {
  const res = await axios.get("http://localhost:5000/payment");
  return res.data;
};

const AddPaymentMethod = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const { data: methods = [], isLoading: isFetching } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
  });

  const filteredMethods =
    filter === "all"
      ? methods
      : methods.filter((m) => m.paymentType === filter);

  const accountTypeOptions = {
    mobile: ["personal", "agent"],
    bank: ["savings", "current", "student"],
  };

  const onSubmit = async (data) => {
    const duplicate = methods.find(
      (method) =>
        method.paymentType === data.paymentType &&
        method.accountType === data.accountType,
    );

    if (duplicate) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Entry",
        text: `${data.paymentType?.toUpperCase() || ""} (${
          data.accountType
        }) already exists.`,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/payment", {
        ...data,
        methodCategory: category,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Payment Method Added Successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      setCategory("");
      queryClient.invalidateQueries(["paymentMethods"]);
    } catch (error) {
      console.error("Error adding payment method", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add payment method.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/payment/${id}`);
      queryClient.invalidateQueries(["paymentMethods"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Payment method has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Delete failed", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete payment method.",
      });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Add Payment Method
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Payment Category */}
        {/* Payment Amount */}
      

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="mobile">Mobile Wallet</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        {/* Payment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Type
          </label>
          <select
            {...register("paymentType", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            disabled={!category}
          >
            <option value="">Select Payment Type</option>
            {category &&
              paymentOptions[category].map((opt) => (
                <option key={opt} value={opt}>
                  {opt
                    ?.replace(/_/g, " ")
                    ?.replace(/\b\w/g, (l) => l.toUpperCase()) || opt}
                </option>
              ))}
          </select>
          {errors.paymentType && (
            <p className="text-red-500 text-sm">Payment type is required</p>
          )}
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <select
            {...register("accountType", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            disabled={!category}
          >
            <option value="">Select Account Type</option>
            {category &&
              accountTypeOptions[category].map((type) => (
                <option key={type} value={type}>
                  {type?.charAt(0).toUpperCase() + type?.slice(1) || type}
                </option>
              ))}
          </select>
          {errors.accountType && (
            <p className="text-red-500 text-sm">Account type is required</p>
          )}
        </div>
  <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount
          </label>
          <input
            type="number"
            placeholder="Enter Payment Amount"
            {...register("amount", {
              required: "Payment amount is required",
              min: {
                value: 1,
                message: "Amount must be at least 1 taka",
              },
              validate: (value) =>
                !isNaN(value) || "Please enter a valid numeric amount",
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>
        {/* Phone/Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {category === "bank" ? "Bank Account Number" : "Phone Number"}
          </label>
          <input
            type="text"
            placeholder={
              category === "bank" ? "Enter Bank Account Number" : "01XXXXXXXXX"
            }
            {...register("number", {
              required: true,
              pattern: category === "bank" ? /^[0-9]{5,30}$/ : /^01[0-9]{9}$/,
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.number && (
            <p className="text-red-500 text-sm">
              {category === "bank"
                ? "Please enter a valid bank account number (at least 5 digits)"
                : "Please enter a valid 11-digit Bangladeshi phone number"}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full  bg-teal-600 text-white py-2 rounded-lg hover:bg-hoverPrimary transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Payment Method"}
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {["all", ...paymentOptions.mobile, ...paymentOptions.bank].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1 rounded ${
                filter === type
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {type === "all"
                ? "All"
                : type
                    ?.replace(/_/g, " ")
                    ?.replace(/\b\w/g, (l) => l.toUpperCase()) || type}
            </button>
          ),
        )}
      </div>

      {/* Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Payment Method History
        </h3>
        {isFetching ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredMethods.length === 0 ? (
          <p className="text-gray-500">No payment methods found.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 border">#</th>
                <th className="py-2 px-3 border">Type</th>
                <th className="py-2 px-3 border">Amount</th>
                <th className="py-2 px-3 border">Account</th>
                <th className="py-2 px-3 border">Number</th>
                <th className="py-2 px-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMethods.map((method, index) => (
                <tr key={method._id || index} className="text-center">
                  <td className="py-2 px-3 border">{index + 1}</td>
                  <td className="py-2 px-3 border capitalize">
                    {method.paymentType
                      ?.replace(/_/g, " ")
                      ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "-"}
                  </td>
                  <td className="py-2 px-3 border capitalize">
                    {method.amount || "-"}
                  </td>
                  <td className="py-2 px-3 border capitalize">
                    {method.accountType || "-"}
                  </td>
                  <td className="py-2 px-3 border">{method.number || "-"}</td>
                  <td className="py-2 px-3 border">
                    <button
                      onClick={() => handleDelete(method._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddPaymentMethod;
