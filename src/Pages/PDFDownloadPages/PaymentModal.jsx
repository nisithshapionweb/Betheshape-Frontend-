


import { Copy } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const PaymentModal = ({ pdf, paymentMethods, user, onClose, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Copy Function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  // Get receiver number based on selected method
  const getReceiverNumber = () => {
    if (!selectedMethod || selectedMethod === "bank") return "";
    
    // Handle different payment methods structure
    const method = paymentMethods[selectedMethod];
    return method?.number || method?.accountNumber || "";
  };

  // Get payment type
  const getPaymentType = () => {
    if (!selectedMethod || selectedMethod === "bank") return "Bank Transfer";
    
    const method = paymentMethods[selectedMethod];
    return method?.type || method?.accountType || "Mobile Banking";
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedMethod) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a payment method"
      });
    }

    if (!senderNumber) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your mobile number"
      });
    }

    // Bangladeshi mobile number validation
    const mobileRegex = /^(01[3-9]\d{8})$/;
    if (!mobileRegex.test(senderNumber)) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid Bangladeshi number (e.g., 017XXXXXXXX)"
      });
    }

    if (!trxId) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter transaction ID"
      });
    }

    setLoading(true);

    // Show loading
    Swal.fire({
      title: "Processing Payment",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // Prepare data
      const purchaseData = {
        pdfId: pdf._id,
        userEmail: user.email,
        userName: user.displayName || user.email?.split('@')[0] || "User",
        amount: pdf.price,
        paymentMethod: selectedMethod,
        senderNumber: senderNumber,
        transactionId: trxId,
        receiverNumber: getReceiverNumber(),
        paymentType: getPaymentType()
      };


      // API call
      const res = await fetch("http://localhost:5000/pdf/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment submission failed");
      }



      // Success message
      Swal.fire({
        icon: "success",
        title: "Payment Submitted!",
        html: `
          <div style="text-align:left">
            <p class="mb-2">✅ Your payment request has been submitted successfully!</p>
            <p><b>Transaction ID:</b> ${trxId}</p>
            <p><b>Amount:</b> ৳${pdf.price}</p>
            <p><b>Status:</b> <span class="text-yellow-600">Pending Verification</span></p>
            <p class="text-sm text-gray-500 mt-3">
              Admin will verify your payment shortly. 
              You'll be able to download the PDF once approved.
            </p>
          </div>
        `,
        confirmButtonColor: "#0d9488",
        confirmButtonText: "OK",
      }).then(() => {
        // Call success callback to refresh parent data
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        // Close modal
        onClose();
      });

    } catch (err) {
      console.error("Payment Error:", err);
      
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setLoading(false);
    }
  };

  const receiverNumber = getReceiverNumber();
  const paymentType = getPaymentType();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-teal-700">
              Complete Payment
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Amount: ৳{pdf.price}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* PDF Info */}
        <div className="bg-gray-50 p-3 rounded mb-4">
          <p className="font-medium text-gray-700">
            {pdf.tittle || pdf.originalName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Select Payment Method <span className="text-red-500">*</span>
            </label>

            <select
              className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              required
            >
              <option value="">-- Choose a method --</option>

              {paymentMethods?.bkash?.enabled && (
                <option value="bkash">
                  bKash ({paymentMethods.bkash.number})
                </option>
              )}

              {paymentMethods?.nagad?.enabled && (
                <option value="nagad">
                  Nagad ({paymentMethods.nagad.number})
                </option>
              )}

              {paymentMethods?.rocket?.enabled && (
                <option value="rocket">
                  Rocket ({paymentMethods.rocket.number})
                </option>
              )}

              {paymentMethods?.bank?.enabled && (
                <option value="bank">
                  Bank Transfer - {paymentMethods.bank.bankName}
                </option>
              )}
            </select>
          </div>

          {/* Payment Details */}
          {selectedMethod && selectedMethod !== "bank" && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-700 font-medium capitalize">
                    {selectedMethod} {paymentType ? `(${paymentType})` : ''}
                  </p>
                  <p className="text-lg font-bold text-blue-800 mt-1">
                    {receiverNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(receiverNumber)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg text-blue-600 hover:text-blue-800 border border-blue-200"
                >
                  {copied ? (
                    <span className="text-green-600 font-medium">Copied!</span>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Send money to this number and enter the transaction ID below
              </p>
            </div>
          )}

          {/* Bank Details */}
          {selectedMethod === "bank" && paymentMethods?.bank?.enabled && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-blue-700 mb-2">Bank Details:</p>
              <p className="text-sm">Bank: {paymentMethods.bank.bankName}</p>
              <p className="text-sm">Account Name: {paymentMethods.bank.accountName}</p>
              <p className="text-sm">Account Number: {paymentMethods.bank.accountNumber}</p>
              <p className="text-sm">Branch: {paymentMethods.bank.branchName}</p>
              {paymentMethods.bank.routingNumber && (
                <p className="text-sm">Routing: {paymentMethods.bank.routingNumber}</p>
              )}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Your Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g., 01712345678"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-teal-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the number you used for payment
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 8N7A2D4F5G"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-teal-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the transaction ID from your payment
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Submitting..." : `Pay ৳${pdf.price}`}
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-center text-gray-400 mt-4">
            <span className="inline-block mr-1">ⓘ</span>
            Your payment will be verified by admin before download access is granted
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;